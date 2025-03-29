// timezone.js
const timeZones = {
    'london': 'Europe/London',
    'ontario': 'America/Toronto',
    'miami': 'America/New_York',
    'beijing': 'Asia/Shanghai'
};

function updateClock(clockId, timeZone) {
    const now = new Date();
    const localTime = now.toLocaleTimeString('en-GB', {
        timeZone: timeZone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const clock = document.getElementById(clockId);
    clock.textContent = localTime;
}

function updateAllClocks() {
    updateClock('london-clock', timeZones.london);
    updateClock('ontario-clock', timeZones.ontario);
    updateClock('miami-clock', timeZones.miami);
    updateClock('beijing-clock', timeZones.beijing);
}

// Initialize and update clocks every second
document.addEventListener('DOMContentLoaded', () => {
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
});
