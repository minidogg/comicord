import * as fs from 'fs';
import * as path from 'path';
import {getDiscordAppPathName, getDiscordAppPath} from './utils/pathUtil.js';

const backupPath = path.resolve("./backup")
const tmpPath = path.resolve("./tmp")

const appDirName = getDiscordAppPathName()
console.log("Unpatching ComiCord...")
fs.cpSync(path.join(backupPath, appDirName), path.resolve(getDiscordAppPath()), {recursive: true})