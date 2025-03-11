document.addEventListener("DOMContentLoaded", function () {
    const tempInput = document.getElementById("temp-input");
    const fromUnit = document.getElementById("from-unit");
    const toUnit = document.getElementById("to-unit");
    const resultDisplay = document.getElementById("result");
    const swapButton = document.getElementById("swap");
    const copyButton = document.getElementById("copy");
    const historyList = document.getElementById("history");

    let history = [];

    function convertTemperature(value, from, to) {
        if (from === to) return value;

        let tempInCelsius;
        if (from === "Celsius") tempInCelsius = value;
        if (from === "Fahrenheit") tempInCelsius = (value - 32) * 5 / 9;
        if (from === "Kelvin") tempInCelsius = value - 273.15;

        let convertedTemp;
        if (to === "Celsius") convertedTemp = tempInCelsius;
        if (to === "Fahrenheit") convertedTemp = (tempInCelsius * 9 / 5) + 32;
        if (to === "Kelvin") convertedTemp = tempInCelsius + 273.15;

        return convertedTemp.toFixed(2);
    }
    function updateConversion() {
        let tempValue = parseFloat(tempInput.value);
        if (isNaN(tempValue)) {
            resultDisplay.textContent = "Converted Temperature: --";
            return;
        }
        let convertedValue = convertTemperature(tempValue, fromUnit.value, toUnit.value);
        resultDisplay.textContent = Converted Temperature: ${convertedValue} ${toUnit.value};

        history.unshift(${tempValue}, $ {fromUnit,value} = ${convertedValue} ${toUnit,value});
        if (history.length > 5) history.pop();

        renderHistory();
    }

    function renderHistory() {
        historyList.innerHTML = "";
        history.forEach(item => {
            let li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("click", () => {
                let parts = item.split(" ");
                tempInput.value = parts[0];
                fromUnit.value = parts[1];
                toUnit.value = parts[4];
                updateConversion();
            });
            historyList.appendChild(li);
        });
    }

    tempInput.addEventListener("input", updateConversion);
    fromUnit.addEventListener("change", updateConversion);
    toUnit.addEventListener("change", updateConversion);

    swapButton.addEventListener("click", () => {
        let temp = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = temp;
        updateConversion();
    });

    copyButton.addEventListener("click", () => {
        let textToCopy = resultDisplay.textContent.replace("Converted Temperature: ", "");
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Copied to clipboard!");
        });
    });
});
