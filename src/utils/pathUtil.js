import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process'

export function getDiscordAppPath(){
    let discordPath = path.resolve(process.env.appdata+"/../Local/Discord");
    let appPath = fs.readdirSync(discordPath).find(e=>e.startsWith("app-"));
    return path.join(discordPath, appPath)
}
export function getDiscordAppPathName(){
    return path.basename(getDiscordAppPath())
}