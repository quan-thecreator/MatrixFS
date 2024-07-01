
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const SESSION_MANAGER: string;
	export const WINDOWID: string;
	export const QT_ACCESSIBILITY: string;
	export const QT_SCREEN_SCALE_FACTORS: string;
	export const COLORTERM: string;
	export const XDG_CONFIG_DIRS: string;
	export const XDG_SESSION_PATH: string;
	export const NVM_INC: string;
	export const GTK_IM_MODULE: string;
	export const NVIM: string;
	export const MODULAR_HOME: string;
	export const NODE: string;
	export const MANDATORY_PATH: string;
	export const SSH_AUTH_SOCK: string;
	export const SHELL_SESSION_ID: string;
	export const npm_config_local_prefix: string;
	export const HOMEBREW_PREFIX: string;
	export const XMODIFIERS: string;
	export const NVIM_LOG_FILE: string;
	export const DESKTOP_SESSION: string;
	export const SSH_AGENT_PID: string;
	export const GTK_RC_FILES: string;
	export const XCURSOR_SIZE: string;
	export const GITLAB_HOME: string;
	export const MASON: string;
	export const MACOSX_DEPLOYMENT_TARGET: string;
	export const GTK_MODULES: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const MANPATH: string;
	export const TAURI_PLATFORM: string;
	export const GPG_AGENT_INFO: string;
	export const SYSTEMD_EXEC_PID: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const GTK2_RC_FILES: string;
	export const HOME: string;
	export const LANG: string;
	export const LS_COLORS: string;
	export const CARGO_HOME: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const RUSTUP_TOOLCHAIN: string;
	export const KONSOLE_DBUS_SERVICE: string;
	export const npm_package_version: string;
	export const TAURI_PLATFORM_VERSION: string;
	export const STARSHIP_SHELL: string;
	export const SSL_CERT_DIR: string;
	export const KONSOLE_DBUS_SESSION: string;
	export const XDG_SEAT_PATH: string;
	export const TAURI_TARGET_TRIPLE: string;
	export const PERL5LIB: string;
	export const KONSOLE_VERSION: string;
	export const TAURI_ARCH: string;
	export const CLUTTER_IM_MODULE: string;
	export const STARSHIP_SESSION_KEY: string;
	export const KDE_SESSION_UID: string;
	export const INFOPATH: string;
	export const RUST_RECURSION_COUNT: string;
	export const NVM_DIR: string;
	export const LESSCLOSE: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const DEFAULTS_PATH: string;
	export const RUSTUP_HOME: string;
	export const PERL_MB_OPT: string;
	export const LESSOPEN: string;
	export const USER: string;
	export const HOMEBREW_CELLAR: string;
	export const KDE_SESSION_VERSION: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const PERL_MM_OPT: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const QT_IM_MODULE: string;
	export const HOMEBREW_REPOSITORY: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const LD_LIBRARY_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const SSL_CERT_FILE: string;
	export const MYVIMRC: string;
	export const TAURI_FAMILY: string;
	export const npm_package_json: string;
	export const BUN_INSTALL: string;
	export const TAURI_DEBUG: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const XCURSOR_THEME: string;
	export const XDG_DATA_DIRS: string;
	export const PERL_LOCAL_LIB_ROOT: string;
	export const KDE_FULL_SESSION: string;
	export const PATH: string;
	export const TAURI_PLATFORM_TYPE: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const CARGO: string;
	export const KDE_APPLICATIONS_AS_SCOPE: string;
	export const NVM_BIN: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		SESSION_MANAGER: string;
		WINDOWID: string;
		QT_ACCESSIBILITY: string;
		QT_SCREEN_SCALE_FACTORS: string;
		COLORTERM: string;
		XDG_CONFIG_DIRS: string;
		XDG_SESSION_PATH: string;
		NVM_INC: string;
		GTK_IM_MODULE: string;
		NVIM: string;
		MODULAR_HOME: string;
		NODE: string;
		MANDATORY_PATH: string;
		SSH_AUTH_SOCK: string;
		SHELL_SESSION_ID: string;
		npm_config_local_prefix: string;
		HOMEBREW_PREFIX: string;
		XMODIFIERS: string;
		NVIM_LOG_FILE: string;
		DESKTOP_SESSION: string;
		SSH_AGENT_PID: string;
		GTK_RC_FILES: string;
		XCURSOR_SIZE: string;
		GITLAB_HOME: string;
		MASON: string;
		MACOSX_DEPLOYMENT_TARGET: string;
		GTK_MODULES: string;
		XDG_SEAT: string;
		PWD: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		MANPATH: string;
		TAURI_PLATFORM: string;
		GPG_AGENT_INFO: string;
		SYSTEMD_EXEC_PID: string;
		_: string;
		XAUTHORITY: string;
		GTK2_RC_FILES: string;
		HOME: string;
		LANG: string;
		LS_COLORS: string;
		CARGO_HOME: string;
		XDG_CURRENT_DESKTOP: string;
		RUSTUP_TOOLCHAIN: string;
		KONSOLE_DBUS_SERVICE: string;
		npm_package_version: string;
		TAURI_PLATFORM_VERSION: string;
		STARSHIP_SHELL: string;
		SSL_CERT_DIR: string;
		KONSOLE_DBUS_SESSION: string;
		XDG_SEAT_PATH: string;
		TAURI_TARGET_TRIPLE: string;
		PERL5LIB: string;
		KONSOLE_VERSION: string;
		TAURI_ARCH: string;
		CLUTTER_IM_MODULE: string;
		STARSHIP_SESSION_KEY: string;
		KDE_SESSION_UID: string;
		INFOPATH: string;
		RUST_RECURSION_COUNT: string;
		NVM_DIR: string;
		LESSCLOSE: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		npm_package_name: string;
		DEFAULTS_PATH: string;
		RUSTUP_HOME: string;
		PERL_MB_OPT: string;
		LESSOPEN: string;
		USER: string;
		HOMEBREW_CELLAR: string;
		KDE_SESSION_VERSION: string;
		PAM_KWALLET5_LOGIN: string;
		PERL_MM_OPT: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		QT_IM_MODULE: string;
		HOMEBREW_REPOSITORY: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		LD_LIBRARY_PATH: string;
		XDG_RUNTIME_DIR: string;
		SSL_CERT_FILE: string;
		MYVIMRC: string;
		TAURI_FAMILY: string;
		npm_package_json: string;
		BUN_INSTALL: string;
		TAURI_DEBUG: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		XCURSOR_THEME: string;
		XDG_DATA_DIRS: string;
		PERL_LOCAL_LIB_ROOT: string;
		KDE_FULL_SESSION: string;
		PATH: string;
		TAURI_PLATFORM_TYPE: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		CARGO: string;
		KDE_APPLICATIONS_AS_SCOPE: string;
		NVM_BIN: string;
		npm_node_execpath: string;
		OLDPWD: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
