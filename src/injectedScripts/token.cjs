let token = ""
getToken()

function getToken(){
    if(token.length>=19){
      return token;
    }
    function setToken(tokenI){
      if(tokenI.length>=19)token = tokenI
    }
    window.webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        req => {
          if (!req.c) return;
          for (const m of Object.keys(req.c)
            .map(x => req.c[x].exports)
            .filter(x => x)) {
            if (m.default && m.default.getToken !== undefined) {
              return setToken(m.default.getToken());
            }
            if (m.getToken !== undefined) {
              return setToken(m.getToken());
            }
          }
        },
      ]);

      console.log(token)
      return token;
}

module.exports = {token, getToken}