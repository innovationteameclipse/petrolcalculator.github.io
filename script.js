function calculateCost() {
    const totalDistance = parseFloat(document.getElementById('totalDistance').value);
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    const fuelType = document.getElementById('fuelType').value;
    const locationType = document.getElementById('locationType').value;

    // Fuel prices for coastal and inland areas
    const fuelPrices = {
        '93': { coastal: 22.72, inland: 23.44 },
        '95': { coastal: 23.18, inland: 23.90 },
        'diesel_500ppm': {
            coastal: 23.44,
            inland: 24.16,
        },
        'diesel_50ppm': {
            coastal: 23.69,
            inland: 24.40,
        },
    };

    // Validate input values
    if (isNaN(totalDistance) || isNaN(fuelConsumption)) {
        alert('Please enter valid numbers for total distance and fuel consumption.');
        return;
    }

    if (!(fuelType in fuelPrices) || !(locationType in fuelPrices[fuelType])) {
        alert('Invalid fuel type or location.');
        return;
    }

    const fuelPrice = fuelPrices[fuelType][locationType];

    // Check for division by zero or invalid fuel price
    if (fuelConsumption === 0 || isNaN(fuelPrice)) {
        alert('Invalid fuel consumption or fuel price.');
        return;
    }

    const totalCost = calculateCostBasedOnFactors(totalDistance, fuelConsumption, fuelPrice);

    const resultText = document.getElementById('result');
    resultText.style.display = 'block';
    resultText.innerHTML = `Estimated Cost: R${totalCost.toFixed(2)}<br><span id="reset" onclick="resetForm()">Reset</span>`;
}

function calculateCostBasedOnFactors(totalDistance, consumption, fuelPrice) {
    return (totalDistance / consumption) * fuelPrice;
}

function resetForm() {
    document.getElementById('totalDistance').value = '';
    document.getElementById('fuelConsumption').value = '';
    document.getElementById('fuelType').value = '93'; // Set default value if needed
    document.getElementById('locationType').value = 'inland'; // Set default value if needed
    document.getElementById('result').style.display = 'none';
}

// Update the fuel prices
function updateFuelPrices() {
    document.getElementById('price93').innerText = `R${fuelPrices['93'].inland.toFixed(2)}`;
    document.getElementById('price95').innerText = `R${fuelPrices['95'].inland.toFixed(2)}`;
    document.getElementById('priceDiesel500').innerText = `R${fuelPrices['diesel_500ppm'].inland.toFixed(2)}`;
    document.getElementById('priceDiesel50').innerText = `R${fuelPrices['diesel_50ppm'].inland.toFixed(2)}`;
}


function updateFuelPlaceholder() {
    const fuelTypeDropdown = document.getElementById('fuelType');
    const selectedFuelOption = fuelTypeDropdown.options[fuelTypeDropdown.selectedIndex];
    const fuelPrice = selectedFuelOption.getAttribute('data-fuelprice');
    
    fuelTypeDropdown.setAttribute('placeholder', `Selected Fuel: ${selectedFuelOption.text} - Price: R${fuelPrice}`);
}


// Monthly Fuel Calculator
function calculateMonthlyCost() {
    const monthlyKilometers = parseFloat(document.getElementById('monthlyKilometers').value);
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    const fuelType = document.getElementById('fuelType').value;
    const locationType = document.getElementById('locationType').value;

    if (isNaN(monthlyKilometers) || isNaN(fuelConsumption)) {
        alert('Please enter valid numbers for monthly kilometers and fuel consumption.');
        return;
    }

    const fuelPrice = getFuelPrice(fuelType, locationType);
    const monthlyCost = calculateMonthlyCostBasedOnFactors(monthlyKilometers, fuelConsumption, fuelPrice);

    const formattedCost = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2, // Set the minimum number of fraction digits to 2
        maximumFractionDigits: 2, // Set the maximum number of fraction digits to 2
    }).format(monthlyCost);

    const monthlyResult = document.getElementById('monthlyResult');
    monthlyResult.innerText = `Estimated Monthly Cost: ${formattedCost}`;
    monthlyResult.style.display = 'block';

    const downloadCSVButton = document.getElementById('downloadCSV');
    downloadCSVButton.style.display = 'block';
}

function getFuelPrice(fuelType, locationType) {
    const fuelPrices = {
        '93': { coastal: 23.44, inland: 23.44 },
        '95': { coastal: 23.90, inland: 23.90 },
        'diesel_500ppm': { coastal: 24.16, inland: 24.16 },
        'diesel_50ppm': { coastal: 24.40, inland: 24.40 },
    };

    return fuelPrices[fuelType][locationType];
}

function calculateMonthlyCostBasedOnFactors(monthlyKilometers, consumption, fuelPrice) {
    return (monthlyKilometers / consumption) * fuelPrice;
}