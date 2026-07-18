// ===============================
// DOM Elements
// ===============================

const category = document.getElementById("category");
const value = document.getElementById("value");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");


// ===============================
// Units
// Base Units
// Length -> Meter
// Weight -> Kilogram
// Volume -> Liter
// Time -> Second
// Storage -> Byte
// ===============================

const units = {

    length: {
        Meter: 1,
        Kilometer: 1000,
        Centimeter: 0.01,
        Millimeter: 0.001,
        Inch: 0.0254,
        Foot: 0.3048,
        Yard: 0.9144,
        Mile: 1609.34
    },

    weight: {
        Kilogram: 1,
        Gram: 0.001,
        Pound: 0.453592,
        Ounce: 0.0283495
    },

    volume: {
        Liter: 1,
        Milliliter: 0.001,
        Gallon: 3.78541,
        CubicMeter: 1000
    },

    time: {
        Second: 1,
        Minute: 60,
        Hour: 3600,
        Day: 86400
    },

    storage: {
        Byte: 1,
        KB: 1024,
        MB: 1048576,
        GB: 1073741824,
        TB: 1099511627776
    },

    temperature: {
        Celsius: "C",
        Fahrenheit: "F",
        Kelvin: "K"
    }

};


// ===============================
// Load Units
// ===============================

function loadUnits() {

    const current = category.value;

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    for (let unit in units[current]) {

        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;

        fromUnit.appendChild(option1);
        toUnit.appendChild(option2);

    }

    if (toUnit.options.length > 1) {
        toUnit.selectedIndex = 1;
    }

}

loadUnits();


// ===============================
// Temperature Conversion
// ===============================

function convertTemperature(value, from, to) {

    if (from === to)
        return value;

    let celsius;

    if (from === "Celsius") {

        celsius = value;

    } else if (from === "Fahrenheit") {

        celsius = (value - 32) * 5 / 9;

    } else {

        celsius = value - 273.15;

    }


    if (to === "Celsius") {

        return celsius;

    } else if (to === "Fahrenheit") {

        return (celsius * 9 / 5) + 32;

    } else {

        return celsius + 273.15;

    }

}


// ===============================
// Normal Conversion
// ===============================

function convertNormal(type, value, from, to) {

    const base = value * units[type][from];

    return base / units[type][to];

}


// ===============================
// Category Change
// ===============================

category.addEventListener("change", loadUnits);
// ===============================
// Convert Function
// ===============================

function convert() {

    const inputValue = parseFloat(value.value);

    if (isNaN(inputValue)) {
        result.textContent = "Please enter a valid number";
        return;
    }

    const type = category.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    let converted;

    if (type === "temperature") {

        converted = convertTemperature(inputValue, from, to);

    } else {

        converted = convertNormal(type, inputValue, from, to);

    }

    result.textContent = Number(converted.toFixed(6)).toLocaleString();

}



// ===============================
// Convert Button
// ===============================

convertBtn.addEventListener("click", convert);



// ===============================
// Auto Convert
// ===============================

value.addEventListener("input", () => {

    if (value.value !== "") {
        convert();
    }

});

fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);



// ===============================
// Swap Units
// ===============================

swapBtn.addEventListener("click", () => {

    const temp = fromUnit.value;

    fromUnit.value = toUnit.value;
    toUnit.value = temp;

    if (value.value !== "") {
        convert();
    }

});



// ===============================
// Copy Result
// ===============================

copyBtn.addEventListener("click", () => {

    if (
        result.textContent === "0" ||
        result.textContent === "Please enter a valid number"
    ) {
        alert("Nothing to copy.");
        return;
    }

    navigator.clipboard.writeText(result.textContent);

    copyBtn.textContent = "✅ Copied!";

    setTimeout(() => {

        copyBtn.textContent = "📋 Copy Result";

    }, 1500);

});



// ===============================
// Enter Key Support
// ===============================

value.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        convert();
    }

});



// ===============================
// Initial Result
// ===============================

result.textContent = "0";