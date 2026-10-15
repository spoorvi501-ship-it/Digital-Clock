const form = document.getElementById("rainForm");
const areaInput = document.getElementById("area");
const rainfallInput = document.getElementById("rainfall");
const efficiencyInput = document.getElementById("efficiency");

const efficiencyValue = document.getElementById("efficiencyValue");
const answer = document.getElementById("answer");
const description = document.getElementById("description");
const gross = document.getElementById("gross");
const efficiencyResult = document.getElementById("efficiencyResult");
const error = document.getElementById("error");
const clearBtn = document.getElementById("clearBtn");

const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2
});

function litres(value) {
    return formatter.format(value) + " L";
}

efficiencyInput.addEventListener("input", function () {
    efficiencyValue.textContent = this.value + "%";
    efficiencyResult.textContent = this.value + "%";
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const areaText = areaInput.value.trim();
    const rainfallText = rainfallInput.value.trim();

    const area = Number(areaText);
    const rainfall = Number(rainfallText);
    const efficiency = Number(efficiencyInput.value);

    if (
        areaText === "" ||
        rainfallText === "" ||
        !Number.isFinite(area) ||
        !Number.isFinite(rainfall) ||
        area <= 0 ||
        rainfall < 0
    ) {
        error.textContent =
            "Please enter a roof area greater than zero and valid rainfall.";
        return;
    }

    error.textContent = "";

    // 1 mm rainfall over 1 m² = approximately 1 litre.
    const grossWater = area * rainfall;

    // Estimate collected water after collection losses.
    const collectedWater = grossWater * efficiency / 100;

    answer.textContent = litres(collectedWater);
    gross.textContent = litres(grossWater);
    efficiencyResult.textContent = efficiency + "%";

    description.textContent =
        "Your roof could collect approximately " +
        formatter.format(collectedWater) +
        " litres over the rainfall period entered.";
});

clearBtn.addEventListener("click", function () {
    form.reset();

    efficiencyValue.textContent = "80%";
    efficiencyResult.textContent = "80%";
    answer.textContent = "0 Litres";
    gross.textContent = "0 L";

    description.textContent =
        "Enter your details to calculate your rainwater collection.";

    error.textContent = "";
});