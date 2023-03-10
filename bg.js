let isFabricActive = {}

chrome.action.onClicked.addListener((tab) => {

})


function addMainContentScript() {

}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

})

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {

})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.message === "from-content-script") {

    }
    else if (request.message === "from-auth-script.js") {
        chrome.storage.local.set({ token: request.token })
    }
    else if (request.message === "from-options-page") {

        (async () => {


            try {

                let storageObj = await chrome.storage.local.get(["token"])

                const authToken = storageObj.token

                if (!authToken) {
                    sendResponse({ message: "not logged in" })
                    return
                }

                //hit the api here
                let res1 = await fetch(`https://app-backend-gkbi.onrender.com/users/account-state/${authToken}`)

                const res2 = await res1.json()

                if (res2.message === "prcHJlbWl1bSB1c2Vy") {
                    sendResponse({
                        message: "prcHJlbWl1bSB1c2Vy",
                    })

                }

                else if (res2.message === "ZnJlZSB1c2Vyfr") {

                    sendResponse({ message: "ZnJlZSB1c2Vyfr" })
                }

                else {
                    sendResponse({ message: "invalid token. Please log into your account again" })

                }

            } catch (error) {
                console.log(error);
            }

        })()

    }

    else {
        sendResponse({
            message: "fail"
        })
    }


    return true



})


chrome.runtime.onInstalled.addListener(function (details) {

})

chrome.runtime.setUninstallURL("")
