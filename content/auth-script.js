function getToken() {
    let token = null;
    let storagePollInterval = setInterval(async function () {
        token = localStorage.getItem("jwt_token")
        //send it to the bg.js
        if (token) {

            chrome.runtime.sendMessage({
                message: "from-auth-script.js",
                token: token
            })
            clearInterval(storagePollInterval)
        }


    }, 4000)

}

getToken()