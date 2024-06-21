export class PatchError extends Error {
    constructor(message) {
      super(message);
      this.name = 'PatchError';
    }
}


import * as fs from 'fs';
import * as path from 'path';
import * as asar from '@electron/asar'
import {getDiscordAppPath, getDiscordAppPathName} from '../utils/pathUtil.js';
import {makeFolder} from '../utils/fsUtils.js'

const discordAppPath = getDiscordAppPath()
const discordAppPathName = getDiscordAppPathName()
const backupPath = path.resolve("./backup")
const tmpPath = path.resolve("./tmp")
makeFolder(backupPath)
makeFolder(tmpPath, true)

export function copyFileInfo(filePath, resultPath){
    let destPath = path.join(resultPath, discordAppPathName, filePath.replace(discordAppPath, ""))
    let destCreatePath = path.dirname(destPath)
    return {destPath, destCreatePath}
}
export function copyFileMisc(filePath, resPath, logIfExists=false){
    let {destPath, destCreatePath} = copyFileInfo(filePath, resPath)

    if(fs.existsSync(destPath)){
        if(logIfExists==true)console.log(`The following file is already copied to: ${destPath}: ${filePath}`)
        return destPath;
    }
    
    fs.mkdirSync(destCreatePath, {recursive:true})
    fs.cpSync(filePath, destPath)

    return destPath;
}
export function extractAsar(asarPath){
    let dist = path.join(path.dirname(asarPath), path.basename(asarPath, ".asar"))
    fs.mkdirSync(dist)
    asar.extractAll(asarPath, dist)

    return dist;
}
export async function packageAsar(folderPath, asarPath){
    await asar.createPackage(folderPath, asarPath) 
}

export function patchFile(patchJson, contextPath=discordAppPath){
    let fileToPatch = path.join(contextPath, patchJson.file)
    let fileData = fs.readFileSync(fileToPatch, "utf-8")
    switch(patchJson.type){
        case("addition"):
            fileData+=patchJson.text;
            break;
        default:
            throw new PatchError(`Invalid patch type: ${patchJson.type}`)
    }
    fs.writeFileSync(fileToPatch, fileData, "utf-8")
}

const supportedFileTypes = {
    special:[
        ".asar"
    ],
    standard:[
        ".js"
    ]
}
export function jsonPatch(patchJson){
    let fileDiscordPath = path.join(discordAppPath, patchJson.path)
    let tmpFileExt = path.extname(fileDiscordPath)
    if(!supportedFileTypes.special.includes(tmpFileExt)){
        console.warn(`Patch id: '${patchJson.id}' attempted to patch the unsupported file type: ${tmpFileExt}.`)
        return;
    }
    copyFileMisc(fileDiscordPath, backupPath)
    let tmpFile = copyFileMisc(fileDiscordPath, tmpPath)
    switch(tmpFileExt){
        case(".rickAstley"): // This is just here so vscode stops saying that some code is unreachable.
            console.warn("Never gonna give you up, never gonna let you down, never gonna run around and desert you!")
            break;
        case(".asar"):
            let asarDistPath = extractAsar(tmpFile)
            patchFile(patchJson, asarDistPath)
            return async()=>{
                if(!fs.existsSync(asarDistPath))return;
                fs.rmSync(tmpFile)
                await packageAsar(asarDistPath, tmpFile)
                fs.rmSync(asarDistPath, {recursive:true})
            };
        default:
            console.warn(`Patch id: '${patchJson.id}' attempted to patch file type: ${tmpFileExt} but no handler existed to do that.`)
            return false;
    }

    throw new PatchError(`The ${tmpFileExt} handler didn't return a function for finalization!`)
}