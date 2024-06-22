console.log("%cHello from ComiCord", "font-size:50px;color:yellow;")

let path = require("path") 
let style = document.createElement("style")
style.innerHTML = `
    *{
        font-family:'Comic Sans MS', 'Comic Sans', cursive, arial;
    }
`
document.body.appendChild(style)

setTimeout(e=>{
    // silly apis
    Object.defineProperty(window, "ComiCord", {
        api:{}
    })
    // let getToken = require(path.join(injectedScripts, "/token.cjs")) 
}, 3000)



console.log("%cFinished ComiCord preload script stuff", "font-size:50px;color:yellow;")
