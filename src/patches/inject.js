import * as path from 'path';

export default function patch(){
    let patch = {
        "id": "preloadInject",
        "description": "Injects some base code into the front-end thingy",
        "path": "/modules/discord_desktop_core-1/discord_desktop_core/core.asar",
        "file": "app/mainScreenPreload.js",
        "type": "addition",
        "text": `
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const fs = require('fs');
                const script = fs.readFileSync('${path.resolve("./injectedScripts/index.cjs").replaceAll("\\","/")}', 'utf8');
                const injectedScripts = "${path.resolve("./injectedScripts/").replaceAll("\\","/")}"
                eval(script);
            }, 3000);
        });
        `
    }

    return patch;
}
