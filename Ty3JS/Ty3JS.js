document.addEventListener('DOMContentLoaded', function() {
    // Day display
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    document.getElementById("dayDisplay").innerHTML = days[today.getDay()];

    // Date display
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    const tomorrow = new Date();
    tomorrow.setTime(tomorrow.getTime() + (1000 * 3600 * 24));
    document.getElementById("spanDate").innerHTML = months[tomorrow.getMonth()] + " " + tomorrow.getDate() + ", " + tomorrow.getFullYear();

    // Clock display
    function renderTime() {
        const currentTime = new Date();
        let diem = "AM";
        let h = currentTime.getHours();
        let m = currentTime.getMinutes();
        let s = currentTime.getSeconds();

        if (h === 0) {
            h = 12;
        } else if (h > 12) {
            h = h - 12;
            diem = "PM";
        }

        if (h < 10) { h = "0" + h; }
        if (m < 10) { m = "0" + m; }
        if (s < 10) { s = "0" + s; }

        const myClock = document.getElementById('clockDisplay');
        const timeString = `${h}:${m}:${s} ${diem}`;
        myClock.textContent = timeString;
        myClock.innerText = timeString;

        setTimeout(renderTime, 1000);
    }
    renderTime();

    // Marquee scroll
    const ScrollSpeed = 100;
    const ScrollChars = 1;
    function ScrollMarquee() {
        const marqueeForm = document.forms['marquee1'];
        if (marqueeForm && marqueeForm.text) {
            const msg = marqueeForm.text.value;
            marqueeForm.text.value = msg.substring(ScrollChars) + msg.substring(0, ScrollChars);
        }
        setTimeout(ScrollMarquee, ScrollSpeed);
    }
    ScrollMarquee();

    // Exchange rates functions
    window.toggleDropdown = function() {
        document.getElementById("ratesDropdown").classList.toggle("show");
    };

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-btn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    async function updateExchangeRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/TTD');
            const data = await response.json();

            // Calculate how many TTD are needed for 1 unit of each currency
            const ttdToUsd = (1 / data.rates.USD * data.rates.TTD).toFixed(2);
            const ttdToGbp = (1 / data.rates.GBP * data.rates.TTD).toFixed(2);
            const ttdToEur = (1 / data.rates.EUR * data.rates.TTD).toFixed(2);

            // Update the display with the new format
            document.getElementById('usd-rate').innerHTML =
                `<span class="rate-value">${ttdToUsd} TTD</span> = 1 USD`;
            document.getElementById('gbp-rate').innerHTML =
                `<span class="rate-value">${ttdToGbp} TTD</span> = 1 GBP`;
            document.getElementById('eur-rate').innerHTML =
                `<span class="rate-value">${ttdToEur} TTD</span> = 1 EUR`;

            const now = new Date();
            document.getElementById('last-updated').textContent =
                `Last updated: ${now.toLocaleTimeString()}`;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('usd-rate').textContent = 'Error loading rates';
            document.getElementById('gbp-rate').textContent = 'Error loading rates';
            document.getElementById('eur-rate').textContent = 'Error loading rates';
            document.getElementById('last-updated').textContent = 'Failed to update rates';
        }
    }

    // Initial update
    updateExchangeRates();

    // Update rates every hour
    setInterval(updateExchangeRates, 3600000);
});
