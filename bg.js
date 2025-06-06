let fabricObj = {}

function x(cb) {
    (async () => {


        try {

            let storageObj = await chrome.storage.local.get(["token"])

            const authToken = storageObj.token

            if (!authToken) {
                cb({ message: "not logged in" })
                return
            }

            //hit the api here
            let res1 = await fetch(`https://app-backend-gkbi.onrender.com/users/account-state/${authToken}`)

            const res2 = await res1.json()

            if (res2.message === "prcHJlbWl1bSB1c2Vy") {
                chrome.storage.local.set({ state: "prcHJlbWl1bSB1c2Vy" })
                cb({
                    message: "prcHJlbWl1bSB1c2Vy",
                })

            }

            else if (res2.message === "ZnJlZSB1c2Vyfr") {

                cb({ message: "ZnJlZSB1c2Vyfr" })
            }

            else {
                cb({ message: "invalid token. Please log into your account again" })

            }

        } catch (error) {
            console.log(error);
        }

    })()
}
chrome.action.onClicked.addListener(async (tab) => {

    try {

        if (fabricObj[tab.id] === null || !fabricObj[tab.id]) {
            fabricObj[tab.id] = true;

            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["/content/fabric.min.js"]
            })

            await addMainContentScript(tab)

        }

        else {
            await addMainContentScript(tab)
        }
    } catch (error) {
        console.log(error);

    }

})


async function addMainContentScript(tab) {

    try {
        await chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['/content/content-style.css']
        })

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['/content/content-script.js']
        })

    } catch (error) {
        console.log(error);

    }


}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    fabricObj[tabId] = false

})

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {

    delete fabricObj[tabId]

})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {


    if (request.message === "from-content-script") {
        chrome.tabs.captureVisibleTab(null, {}, function (image) {
            sendResponse({ screenshot: image })
        })
    }
    else if (request.message === "from-auth-script.js") {
        chrome.storage.local.set({ token: request.token })

        x(sendResponse)

    }
    else if (request.message === "from-options-page") {

        x(sendResponse)

    }

    else {
        sendResponse({
            message: "fail"
        })
    }


    return true



})
