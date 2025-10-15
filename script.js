//Create a data.json array 
let chartData = [];
const chartContainer = document.getElementById('chart-container')


//Get local json
const getData = async () => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data loaded:', data)
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback data if fetch fails
        return [
            { "day": "mon", "amount": 17.45 },
            { "day": "tue", "amount": 34.91 },
            { "day": "wed", "amount": 52.36 },
            { "day": "thu", "amount": 31.07 },
            { "day": "fri", "amount": 23.39 },
            { "day": "sat", "amount": 43.28 },
            { "day": "sun", "amount": 25.48 }
        ];
    }
}

getData().then(data => {
    chartData = data;
    console.log('Chart data set:', chartData);
    renderChart();
});

//Get the current day of the week (lowercase: mon, tue, wed, etc.) json return Upper case 
const days = new Date().getDay();
const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const currentDay = weekdays[days];


// Find the maximum amount for scaling bars
function getMaxAmount(data) {
    const amounts = data.map(item => item.amount);
    return Math.max(...amounts);
}


// Create tooltip element (called once)
function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.id = 'chart-tooltip';
    tooltip.className = 'absolute text-white text-sm font-bold px-2 py-1 rounded pointer-events-none opacity-0 transition-opacity duration-200';
    tooltip.style.backgroundColor = 'hsl(25, 47%, 15%)'; // dark-brown
    tooltip.style.transform = 'translateX(-50%)';
    document.body.appendChild(tooltip);
    return tooltip;
}

// Get or create tooltip
let tooltip = null;
function getTooltip() {
    if (!tooltip) {
        tooltip = createTooltip();
    }
    return tooltip;
}

// Show tooltip
function showTooltip(amount, barElement) {
    const tip = getTooltip();
    const rect = barElement.getBoundingClientRect();

    tip.textContent = `$${amount}`;
    tip.style.left = `${rect.left + rect.width / 2}px`;
    tip.style.top = `${rect.top - 35}px`;
    tip.classList.remove('opacity-0');
    tip.classList.add('opacity-100');
}

// Hide tooltip
function hideTooltip() {
    const tip = getTooltip();
    tip.classList.remove('opacity-100');
    tip.classList.add('opacity-0');
}


// Generate a single bar element
const chartCard = document.querySelector('#chart-card')
function createBar(dayData, maxAmount, isCurrent) {
    // Create div for bar column
    const columnContainer = document.createElement('div')
    columnContainer.className = `flex flex-col justify-end items-center flex-1`;

    //Create bar column
    const barDiv = document.createElement('div');
    barDiv.className = `w-full rounded cursor-pointer transition-all`;

    // Set colors with inline styles
    barDiv.style.backgroundColor = isCurrent ? 'hsl(186, 34%, 65%)' : 'hsl(10, 79%, 65%)'; // cyan : soft-red

    // Calculate height in pixels based on container height (160px = h-40)
    const containerHeight = 160;
    const calcHeight = (dayData.amount / maxAmount) * containerHeight;
    barDiv.style.height = `${calcHeight}px`;
    barDiv.style.minHeight = '20px'; // Ensure bars are visible

    // Add hover effect
    barDiv.addEventListener('mouseenter', () => {
        barDiv.style.opacity = '0.7';
        showTooltip(dayData.amount, barDiv);
    });
    barDiv.addEventListener('mouseleave', () => {
        barDiv.style.opacity = '1';
        hideTooltip();
    });

    //Create name of the day
    const dayLabel = document.createElement('p');
    dayLabel.textContent = dayData.day;
    dayLabel.className = 'text-xs mt-2';
    dayLabel.style.color = 'hsl(28, 10%, 53%)';

    columnContainer.appendChild(barDiv);
    columnContainer.appendChild(dayLabel)
    chartContainer.appendChild(columnContainer);
}


//Render all bars
function renderChart() {
    // Clear existing bars
    chartContainer.innerHTML = '';
    // Get max amount
    const maxAmount = getMaxAmount(chartData);
    // Loop through chartData
    chartData.forEach(item => {
        const isCurrent = item.day === currentDay;
        createBar(item, maxAmount, isCurrent);
    });
}