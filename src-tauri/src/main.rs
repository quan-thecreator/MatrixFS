// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use anyhow::anyhow;
use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use chacha20poly1305::aead::{stream, NewAead};
use chacha20poly1305::XChaCha20Poly1305;
use cipher_crypt::{Caesar, Cipher};
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![test_endpoints])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[tauri::command]
fn test_endpoints() -> bool {
    fn check_web_server(url: &str) -> Result<(), reqwest::Error> {
        let response = reqwest::blocking::get(url)?;

        // Check if the request was successful, ignore the response status code
        if response.status().is_success() {
            //println!("Web server is up!");
            return Ok(());
        } else {
            // println!(
            //    "Web server is not responding normally, status code: {}",
            //    response.status()
            //);
        }

        Ok(())
    }
    let bool_test1;
    let bool_test2;
    match check_web_server("http://127.0.0.1:5001") {
        Ok(_) => {
            //println!("RPC is up");
            bool_test1 = true;
        }
        Err(_) => {
            //println!("Error: {}", e);
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
        return true;
    }
    return false;
}
