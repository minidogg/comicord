import * as path from 'path';

export default function patch(){
    let patch = {
        "id": "inject",
        "description": "Injects some base code into the front-end thingy",
        "path": "/modules/discord_desktop_core-1/discord_desktop_core/core.asar",
        "file": "app/mainScreenPreload.js",
        "type": "prepend",
        "text": `
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const fs = require('fs');
                const script = fs.readFileSync('${path.resolve("./injectedScripts/index.cjs").replaceAll("\\","/")}', 'utf8');
                eval(script);
            }, 3000);
        });
        `
    }

    return patch;
}
