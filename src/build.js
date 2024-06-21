import * as fs from 'fs';
import * as path from 'path';
import {makeFolder} from './utils/fsUtils.js'
import {jsonPatch, PatchError} from './patcher/patcher.js'
(async()=>{
    // Get all the patch json files.
    console.log("\nGetting patches...")
    let patches = {}
    const patchesDir = path.resolve("./patches")
    for(let e of fs.readdirSync(patchesDir).filter(e=>e.endsWith(".js"))){
        let patch = await (await import("file://"+path.join(patchesDir, e))).default()
        if(patches[patch.id])throw new PatchError("Patch id "+patch.id+" already exists (error caused by patches/"+e+")")
        patches[patch.id] = patch
        console.log("   + Fetched '"+e+"' successfully")
    }
    
    // Use the patches
    console.log("\nEvaluating patches...")
    Object.keys(patches).forEach(patchKey=>{
        const patch = patches[patchKey]
        let patchResolved = jsonPatch(patch)

        patches[patchKey] = patchResolved
        if(typeof(patchResolved)=="function"){
            console.log("   + Patched '"+patch.id+"' successfully")
        }else{
            console.log("   + Patched '"+patch.id+"' unsuccessfully")
        }
    })

    // Finalize the patches (This is mainly for the .asar files)
    console.log("\nFinalizing patches...")
    Object.keys(patches).forEach(async patchKey=>{
        const patch = patches[patchKey]
        if(typeof(patch)=="function"){
            patch()
            console.log("   + Finalization for '"+patchKey+"' was successful")
        }else{
            console.log("   + Finalization for '"+patchKey+"' was unsuccessful")
            return
        }
    })
})()