// =====================================
// QR GENERATOR & SCANNER
// One For All
// =====================================

const input = document.getElementById("qrInput");
const qrContainer = document.getElementById("qrcode");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

const scanBtn = document.getElementById("scanBtn");

const resultText = document.getElementById("resultText");

const copyBtn = document.getElementById("copyBtn");
const openBtn = document.getElementById("openBtn");

let qrCode = null;
let scannerStarted = false;
let html5QrCode = null;


// =====================================
// TOAST
// =====================================

function showToast(message){

    let toast = document.querySelector(".toast");

    if(!toast){

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2200);

}



// =====================================
// GENERATE QR
// =====================================

function generateQR(){

    const text = input.value.trim();

    if(text===""){

        showToast("Enter text or URL.");

        input.focus();

        return;

    }

    qrContainer.innerHTML="";

    qrCode = new QRCode(qrContainer,{

        text:text,

        width:220,

        height:220,

        colorDark:"#000000",

        colorLight:"#ffffff"

    });

    showToast("QR Generated");

}


generateBtn.addEventListener("click",generateQR);



// =====================================
// DOWNLOAD
// =====================================

downloadBtn.addEventListener("click",()=>{

    const img = qrContainer.querySelector("img");

    const canvas = qrContainer.querySelector("canvas");

    if(img){

        const a=document.createElement("a");

        a.href=img.src;

        a.download="QRCode.png";

        a.click();

        showToast("Downloaded");

    }

    else if(canvas){

        const a=document.createElement("a");

        a.href=canvas.toDataURL();

        a.download="QRCode.png";

        a.click();

        showToast("Downloaded");

    }

    else{

        showToast("Generate a QR first.");

    }

});



// =====================================
// SHARE
// =====================================

shareBtn.addEventListener("click",()=>{

    const canvas=qrContainer.querySelector("canvas");

    if(!canvas){

        showToast("Generate a QR first.");

        return;

    }

    if(!navigator.share){

        showToast("Sharing unsupported.");

        return;

    }

    canvas.toBlob(async(blob)=>{

        const file=new File(

            [blob],

            "QRCode.png",

            {type:"image/png"}

        );

        try{

            await navigator.share({

                title:"QR Code",

                text:"Generated using One For All",

                files:[file]

            });

        }

        catch(e){

            console.log(e);

        }

    });

});



// =====================================
// SCANNER
// =====================================

scanBtn.addEventListener("click",async()=>{

    if(scannerStarted) return;

    scannerStarted=true;

    scanBtn.innerHTML=

    '<i class="fa-solid fa-spinner fa-spin"></i> Scanning...';

    html5QrCode=new Html5Qrcode("reader");

    try{

        await html5QrCode.start(

            {facingMode:"environment"},

            {

                fps:10,

                qrbox:250

            },

            decoded=>{

                resultText.value=decoded;

                html5QrCode.stop();

                scannerStarted=false;

                scanBtn.innerHTML=

                '<i class="fa-solid fa-camera"></i> Scan';

                showToast("QR Scanned");

            }

        );

    }

    catch(err){

        scannerStarted=false;

        scanBtn.innerHTML=

        '<i class="fa-solid fa-camera"></i> Scan';

        showToast("Camera unavailable.");

    }

});



// =====================================
// COPY
// =====================================

copyBtn.addEventListener("click",async()=>{

    if(resultText.value===""){

        showToast("Nothing to copy.");

        return;

    }

    await navigator.clipboard.writeText(

        resultText.value

    );

    showToast("Copied");

});



// =====================================
// OPEN LINK
// =====================================

openBtn.addEventListener("click",()=>{

    const text=resultText.value.trim();

    if(text===""){

        showToast("Nothing scanned.");

        return;

    }

    if(

        text.startsWith("http://") ||

        text.startsWith("https://")

    ){

        window.open(text,"_blank");

    }

    else{

        showToast("Scanned data isn't a URL.");

    }

});



// =====================================
// ENTER
// =====================================

input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        generateQR();

    }

});



// =====================================
// CTRL + ENTER
// =====================================

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="Enter"){

        e.preventDefault();

        generateQR();

    }

});



// =====================================
// AUTO FOCUS
// =====================================

window.addEventListener("load",()=>{

    input.focus();

});