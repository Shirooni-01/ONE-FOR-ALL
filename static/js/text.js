const textInput = document.getElementById("textInput");
const previewBox = document.getElementById("previewBox");

const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const readingTime = document.getElementById("readingTime");

const uppercaseBtn = document.getElementById("uppercaseBtn");
const lowercaseBtn = document.getElementById("lowercaseBtn");
const capitalizeBtn = document.getElementById("capitalizeBtn");
const removeSpacesBtn = document.getElementById("removeSpacesBtn");
const reverseBtn = document.getElementById("reverseBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const toast = document.getElementById("toast");



// ------------------------
// Update Statistics
// ------------------------

function updateStats() {

    let text = textInput.value;

    charCount.textContent = text.length;

    let words = text.trim();

    if (words === "") {
        wordCount.textContent = 0;
        readingTime.textContent = "0 min";
    }
    else {

        let totalWords = words.split(/\s+/).length;

        wordCount.textContent = totalWords;

        readingTime.textContent = (totalWords / 200).toFixed(2) + " min";
    }

    const lineCount = document.getElementById("lineCount");

    lineCount.textContent =
        text === "" ? 1 : text.split("\n").length;

    previewBox.textContent = text || "Your text will appear here...";
}



// ------------------------
// Toast Message
// ------------------------

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}



// ------------------------
// Live Update
// ------------------------

textInput.addEventListener("input", updateStats);



// ------------------------
// Uppercase
// ------------------------

uppercaseBtn.addEventListener("click", () => {

    textInput.value = textInput.value.toUpperCase();

    updateStats();

    showToast("Converted to Uppercase");

});



// ------------------------
// Lowercase
// ------------------------

lowercaseBtn.addEventListener("click", () => {

    textInput.value = textInput.value.toLowerCase();

    updateStats();

    showToast("Converted to Lowercase");

});



// ------------------------
// Capitalize
// ------------------------

capitalizeBtn.addEventListener("click", () => {

    let words = textInput.value.toLowerCase().split(" ");

    let result = [];

    for (let word of words) {

        if (word !== "") {

            result.push(word.charAt(0).toUpperCase() + word.slice(1));

        }
        else {

            result.push("");

        }

    }

    textInput.value = result.join(" ");

    updateStats();

    showToast("Text Capitalized");

});



// ------------------------
// Remove Extra Spaces
// ------------------------

removeSpacesBtn.addEventListener("click", () => {

    textInput.value = textInput.value.replace(/\s+/g, " ").trim();

    updateStats();

    showToast("Extra Spaces Removed");

});



// ------------------------
// Reverse Text
// ------------------------

reverseBtn.addEventListener("click", () => {

    textInput.value = textInput.value.split("").reverse().join("");

    updateStats();

    showToast("Text Reversed");

});



// ------------------------
// Copy
// ------------------------

copyBtn.addEventListener("click", () => {

    if (textInput.value === "") {
        showToast("Nothing to Copy");
        return;
    }

    navigator.clipboard.writeText(textInput.value);

    showToast("Copied to Clipboard");

});



// ------------------------
// Download
// ------------------------

downloadBtn.addEventListener("click", () => {

    if (textInput.value === "") {
        showToast("Nothing to Download");
        return;
    }

    let blob = new Blob([textInput.value], { type: "text/plain" });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "text.txt";

    link.click();

    URL.revokeObjectURL(link.href);

    showToast("Download Started");

});



// ------------------------
// Clear
// ------------------------

clearBtn.addEventListener("click", () => {

    textInput.value = "";

    updateStats();

    showToast("Text Cleared");

});



// ------------------------
// Initial Call
// ------------------------

updateStats();