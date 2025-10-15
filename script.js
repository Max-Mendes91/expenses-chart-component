
// TODO 1: Create a data.json array here (or fetch from external file)
// Format: [{"day": "mon", "amount": 17.45 }, ...]
const chartData = [];

const getData = async (params) => {
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data)
    return data;
    
}
getData().then(data => {
    chartData = data;
});



// TODO 2: Get the current day of the week (lowercase: mon, tue, wed, etc.)
// Hint: Use new Date().getDay() and convert to day name
const currentDay = '';

// TODO 3: Select the bar chart container
const chartContainer = null;

// TODO 4: Create a function to find the maximum amount for scaling bars
function getMaxAmount(data) {
    // Your code here
}

// TODO 5: Create a function to generate a single bar element
function createBar(dayData, maxAmount, isCurrent) {
    // Create div for bar column
    // Calculate height percentage based on maxAmount
    // Add appropriate classes (cyan for current day, soft-red for others)
    // Add tooltip/hover with amount
    // Add day label
    // Return the complete bar element
}

// TODO 6: Create a function to render all bars
function renderChart() {
    // Clear existing bars
    // Get max amount
    // Loop through chartData
    // Create bar for each day
    // Append to container
}

// TODO 7: Call renderChart() when page loads
// Hint: You can call it here or use DOMContentLoaded event
