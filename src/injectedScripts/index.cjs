console.log("%cHello from ComiCord", "font-size:50px;color:yellow;")

let path = require("path") 
let style = document.createElement("style")
style.innerHTML = `
    *{
        font-family:'Comic Sans MS', 'Comic Sans', cursive, arial;
    }
`
document.body.appendChild(style)

// let ven = require(path.join(injectedScripts, "/vencord.cjs")) //commit vencord


console.log("%cFinished ComiCord preload script stuff", "font-size:50px;color:yellow;")
