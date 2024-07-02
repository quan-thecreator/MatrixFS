// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use anyhow::anyhow;
use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use chacha20poly1305::aead::{stream, NewAead};
use chacha20poly1305::XChaCha20Poly1305;
use cipher_crypt::{Caesar, Cipher};
use log::info;
use rand::distributions::Alphanumeric;
use rand::rngs::OsRng;
use rand::{Rng, RngCore};
use rfd::FileDialog;
use serde::{Deserialize, Serialize};
use std::error::Error;
use std::fmt::format;
use std::fs::File;
use std::io::{stdin, stdout, BufReader, BufWriter, Bytes, Cursor, Read, Write};
use std::path::{Path, PathBuf};
use std::thread::sleep;
use std::time::Duration;
use std::{env, fs};

#[derive(Serialize, Deserialize)]
struct MatrixFSHash {
    ipfs_hash: String,
    file_name: String,
    aes_encryption_key: String,
    nonce: String,
}
impl MatrixFSHash {
    pub fn construct_hash(&self) -> String {
        let mut returnable: String = serde_json::to_string(&self).unwrap();
        let c = Caesar::new(6);
        returnable = c.encrypt(returnable.as_str()).unwrap();
        returnable = base64::encode(returnable);
        return returnable;
    }
    pub fn deconstruct_hash(matrix_fs_hash: String) -> MatrixFSHash {
        let mut matrix_fs_hash_processing: String = matrix_fs_hash;
        let c = Caesar::new(6);
        matrix_fs_hash_processing =
            String::from_utf8(base64::decode(&matrix_fs_hash_processing).unwrap()).unwrap();
        matrix_fs_hash_processing = c.decrypt(matrix_fs_hash_processing.as_str()).unwrap();

        return serde_json::from_str(matrix_fs_hash_processing.as_str()).unwrap();
    }
}
fn generate_random_string(length: usize) -> String {
    let mut rng = rand::thread_rng(); // Initialize random number generator
    let random_string: String = rng
        .sample_iter(&Alphanumeric)
        .take(length)
        .map(char::from)
        .collect();
    return random_string;
}

fn main() {
    simple_logger::init_with_level(log::Level::Info).unwrap();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![test_endpoints, log_message])
        //.invoke_handler(tauri::generate_handler![log_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// invoke this command when wanting to get a new file on the network

#[tauri::command]
fn package_existing_file() -> Option<String> {
    let mut path_to_file = String::new();
    let files = FileDialog::new()
        .set_directory(get_current_directory().as_str())
        .pick_file();

    match files {
        None => {
            //typewrite("Select a file next time lil bro.");
            return None;
        }
        Some(path) => {
            path_to_file = path
                .as_path()
                .to_owned()
                .into_os_string()
                .into_string()
                .unwrap()
                .to_string();
        }
    }
    let mut as_ref_path = path_to_file.as_str();
    as_ref_path = as_ref_path.trim();
    let path_check_result: bool = check_file_exists(as_ref_path);
    if !path_check_result {
        //typewrite("The file does not exist");
        return None;
    }
    let key_string: String = generate_random_string(32);

    let mut key_bytes = [0u8; 32];
    key_bytes.copy_from_slice(&key_string.as_bytes()[0..32]);
    let nonce_string: String = generate_random_string(19);

    let mut nonce = [0u8; 19];
    nonce.copy_from_slice(&nonce_string.as_bytes()[0..19]);

    let mut destinatino_file: String = String::from(as_ref_path.clone());
    destinatino_file.push_str(".mfs");

    println!("{}", destinatino_file.clone());
    encrypt_large_file(as_ref_path, destinatino_file.as_str(), &key_bytes, &nonce).unwrap();
    let mut ipfs_hash: String = String::new();
    ipfs_hash = String::from(ipfs_hash.trim());
    let to_construct: MatrixFSHash = MatrixFSHash {
        ipfs_hash,
        file_name: String::from(get_file_name(as_ref_path)),
        aes_encryption_key: key_string,
        nonce: nonce_string,
    };
    return Some(to_construct.construct_hash());
}

#[tauri::command]
fn test_endpoints() -> bool {
    fn check_web_server(url: &str) -> Result<(), ()> {
        let response = reqwest::blocking::get(url);

        // Check if the request was successful, ignore the response status
        if let Ok(response_ok) = response {
            return Ok(());
        }

        return Err(());
    }
    let bool_test1;
    let bool_test2;
    match check_web_server("http://127.0.0.1:5001") {
        Ok(_) => {
            //println!("RPC is up");
            bool_test1 = true;
        }
        Err(_) => {
            //println!("Error: {}", e);:#![warn()]
            bool_test1 = false;
        }
    }
    match check_web_server("http://127.0.0.1:8080") {
        Ok(_) => {
            //println!("gateway is up");
            bool_test2 = true;
        }
        Err(_) => {
            //println!("Error: {}", e);
            bool_test2 = false;
        }
    }
    if bool_test2 && bool_test1 {
        //typewrite("All systems operational.");
        //println!("true");
        return true;
    }
    //println!("false");
    return false;
}
#[tauri::command]
fn log_message(message: String) {
    info!("{}", message);
}
fn get_current_directory() -> String {
    env::current_dir()
        .expect("Failed to get current working directory")
        .to_string_lossy()
        .into_owned()
}
fn encrypt_large_file(
    source_file_path: &str,
    dist_file_path: &str,
    key: &[u8; 32],
    nonce: &[u8; 19],
) -> Result<(), anyhow::Error> {
    let aead = XChaCha20Poly1305::new(key.as_ref().into());
    let mut stream_encryptor = stream::EncryptorBE32::from_aead(aead, nonce.as_ref().into());
    const BUFFER_LEN: usize = 500;
    let mut buffer = [0u8; BUFFER_LEN];

    let mut source_file = File::open(source_file_path)?;
    let mut dist_file = File::create(dist_file_path)?;
    loop {
        let read_count = source_file.read(&mut buffer)?;

        if read_count == BUFFER_LEN {
            let ciphertext = stream_encryptor
                .encrypt_next(buffer.as_slice())
                .map_err(|err| anyhow!("Encrypting large file: {}", err))?;
            dist_file.write(&ciphertext)?;
        } else {
            let ciphertext = stream_encryptor
                .encrypt_last(&buffer[..read_count])
                .map_err(|err| anyhow!("Encrypting large file: {}", err))?;
            dist_file.write(&ciphertext)?;
            break;
        }
    }

    Ok(())
}
fn decrypt_large_file(
    encrypted_file_path: &str,
    dist: &str,
    key: &[u8; 32],
    nonce: &[u8; 19],
) -> Result<(), anyhow::Error> {
    let aead = XChaCha20Poly1305::new(key.as_ref().into());
    let mut stream_decryptor = stream::DecryptorBE32::from_aead(aead, nonce.as_ref().into());
    const BUFFER_LEN: usize = 500 + 16;
    let mut buffer = [0u8; BUFFER_LEN];

    let mut encrypted_file = File::open(encrypted_file_path)?;
    let mut dist_file = File::create(dist)?;
    loop {
        let read_count = encrypted_file.read(&mut buffer)?;

        if read_count == BUFFER_LEN {
            let plaintext = stream_decryptor
                .decrypt_next(buffer.as_slice())
                .map_err(|err| anyhow!("Decrypting large file: {}", err))?;
            dist_file.write(&plaintext)?;
        } else if read_count == 0 {
            break;
        } else {
            let plaintext = stream_decryptor
                .decrypt_last(&buffer[..read_count])
                .map_err(|err| anyhow!("Decrypting large file: {}", err))?;
            dist_file.write(&plaintext)?;
            break;
        }
    }

    Ok(())
}
fn download_file(destination: &str, url: &str) {
    let mut file = BufWriter::new(File::create(destination).unwrap());
    let blocking_client = reqwest::blocking::Client::new();
    let mut response = blocking_client.get(url).send().unwrap();
    response.copy_to(&mut file);
}
fn check_file_exists(path_str: &str) -> bool {
    let b = Path::new(path_str).is_file();
    return b;
}
fn get_file_name(path_str: &str) -> &str {
    let path = Path::new(path_str);
    return path.file_name().unwrap().to_str().unwrap();
}
