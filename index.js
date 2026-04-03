const urlInput = document.getElementById("url");
const generateBTN = document.querySelector(".generate-btn");
const qrContainer = document.querySelector(".output");
const mainContainer = document.querySelector(".container");
const fileNameInput = document.getElementById("filename");

let isAnimating = false;

function generateQR(){
    const url = urlInput.value.trim();

    if (!url){
        alert("Please Enter a URL first!")
        mainContainer.classList.remove("active");
        qrContainer.classList.remove("qr-ready");
        setTimeout(() => {
            qrContainer.innerHTML = '<p id="placeholder-text">Your QR-code will appear here</p>';
        }, 800)
        return
    }

    if (isAnimating) return;

    const isAlreadyActive = mainContainer.classList.contains("active");

    if (!isAlreadyActive) {
        isAnimating = true;
        mainContainer.classList.add("active");
        setTimeout(() => {
            renderQR(url);
            isAnimating = false;
        }, 800);
    } else {
        qrContainer.classList.remove("qr-ready");
        setTimeout(() => {
            renderQR(url);
        }, 400)
    }
}

function renderQR(url){
    const canvas = qrContainer.querySelector("canvas");
    const img = qrContainer.querySelector("img");
    const placeholder = document.getElementById("placeholder-text");

    if (canvas) canvas.remove();
    if (img) img.remove();
    if (placeholder) placeholder.style.display = "none";

    new QRCode(qrContainer, {
        text: url,
        width: 350,
        height: 350,
        colorDark : "#1a3a1f",
        colorLight : "#fff",
        correctLevel : QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        qrContainer.classList.add("qr-ready");
    }, 50)
}

generateBTN.addEventListener("click", generateQR);

qrContainer.addEventListener("click", () => {
    const canvas = qrContainer.querySelector("canvas")
    if (!canvas) return;

    let name = fileNameInput.value.trim();
    if (!name) name = "my-qrcode"

    const link = document.createElement("a");
    link.download = `${name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
})