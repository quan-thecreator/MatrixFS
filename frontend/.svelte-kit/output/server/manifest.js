export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.B7SV6Mp-.js","app":"_app/immutable/entry/app.C_7zv4Rx.js","imports":["_app/immutable/entry/start.B7SV6Mp-.js","_app/immutable/chunks/entry.DQzotQwH.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.C_7zv4Rx.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.DJpbLVzb.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
