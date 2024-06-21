console.log("%cHello from ComiCord", "font-size:50px;color:yellow;")
let style = document.createElement("style")
style.innerHTML = `
    *{
        font-family:'Comic Sans MS', 'Comic Sans', cursive, arial;
    }
`
document.body.appendChild(style)