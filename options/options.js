let px1 = document.getElementById("px1");
let px2 = document.getElementById("px2");
let px3 = document.getElementById("px3");
let px4 = document.getElementById("px4");

let slider1 = document.getElementById("mySharpie_thicknessSlider1");
let slider2 = document.getElementById("mySharpie_thicknessSlider2");
let slider3 = document.getElementById("mySharpie_thicknessSlider3");
let slider4 = document.getElementById("mySharpie_thicknessSlider4");

let colorChooser = document.getElementById("mySharpie_colorChooser");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal")

let saveValuesBtn = document.getElementById("saveValuesBtn")
let saveState = document.getElementById("status")

async function saveOptionsCallback() {

    const res = await chrome.runtime.sendMessage({
        message: "from-options-page"
    })

    console.log(res);
    if (res.message === "not logged in") {
        const obj = {
            heading: "Premium Feature",
            message: "You are not logged in",
            btnText: "login",
            link: "https://app-backend-gkbi.onrender.com/auth"
        }

        toggleModalAndOverlay(obj)

    }
    else if (res.message === "prcHJlbWl1bSB1c2Vy") {
        let penThickness = slider1.value
        let highligherThickness = slider2.value
        let eraserThickness = slider3.value
        let textSize = slider4.value
        let penColor = colorChooser.value

        chrome.storage.local.set({
            textSize: textSize,
            penColor: penColor,
            penThickness: penThickness,
            highligherThickness: highligherThickness,
            eraserThickness: eraserThickness

        }, function () {
            saveState.textContent = "my sharpie default values saved to storage"

            setTimeout(function () {
                saveState.textContent = ""
            }, 2000)

        })

    }

    else if (res.message === "ZnJlZSB1c2Vyfr") {

        let storageObj = await chrome.storage.local.get(["token"])

        console.log("token", storageObj);

        const obj = {
            heading: "Premium Feature",
            message: "please purchase a subscription to access this feature",
            btnText: "purchase now",
            link: `https://app-backend-gkbi.onrender.com/subscriptions/${storageObj.token}`
        }

        toggleModalAndOverlay(obj)
    }

    else {
        const obj = {
            heading: "problem with token",
            message: res.message,
            btnText: "log in",
            link: `https://app-backend-gkbi.onrender.com/auth`
        }

        toggleModalAndOverlay(obj)
    }

}

function toggleModalAndOverlay(messageObj) {
    modal.classList.toggle("hidden")
    overlay.classList.toggle("hidden")

    document.getElementById("modalHeader").innerText = messageObj.heading
    document.getElementById("modalText").innerText = messageObj.message
    document.getElementById("accountState").innerText = messageObj.btnText
    document.getElementById("accountState").dataset.link = messageObj.link

}

closeModalBtn.addEventListener("click", toggleModalAndOverlay)
overlay.addEventListener("click", toggleModalAndOverlay)
saveValuesBtn.addEventListener("click", saveOptionsCallback)


chrome.storage.local.get({
    textSize: 20,
    penColor: "#0075FF",
    penThickness: 5,
    highligherThickness: 20,
    eraserThickness: 25
}, function (storageObj) {
    slider1.value = storageObj.penThickness;
    slider2.value = storageObj.highligherThickness;
    slider3.value = storageObj.eraserThickness;
    slider4.value = storageObj.textSize;
    px1.textContent = `${slider1.value} px`
    px2.textContent = `${slider2.value} px`
    px3.textContent = `${slider3.value} px`
    px4.textContent = `${slider4.value} px`
    colorChooser.value = storageObj.penColor

})

slider1.addEventListener("input", function () {
    px1.textContent = slider1.value + "px";
}, false);

slider2.addEventListener("input", function () {
    px2.textContent = slider2.value + "px";
}, false);

slider3.addEventListener("input", function () {
    px3.textContent = slider3.value + "px";
}, false);

slider4.addEventListener("input", function () {
    px4.textContent = slider4.value + "px";
}, false);




accountState.addEventListener("click", function (e) {

    window.open(`${accountState.getAttribute("data-link")}`, "_blank")


})