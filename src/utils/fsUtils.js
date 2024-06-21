import * as fs from 'fs';
import * as path from 'path';

export function makeFolder(folderPath, reset=false){
    if(fs.existsSync(folderPath)&&reset==true)fs.rmSync(folderPath, {recursive: true});
    if(!fs.existsSync(folderPath))fs.mkdirSync(folderPath);
}