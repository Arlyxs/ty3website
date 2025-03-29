function setClocks() {
    // Get current UTC time
    const now = new Date();

    // Set time for each city
    setLondonTime(now);
    setOntarioTime(now);
    setMiamiTime(now);
    setBeijingTime(now);
}

function setLondonTime(now) {
    const londonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
    setClockHands('london-clock', londonTime);
}

function setOntarioTime(now) {
    const ontarioTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Toronto' }));
    setClockHands('ontario-clock', ontarioTime);
}

function setMiamiTime(now) {
    const miamiTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    setClockHands('miami-clock', miamiTime);
}

function setBeijingTime(now) {
    const beijingTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
    setClockHands('beijing-clock', beijingTime);
}

function setClockHands(clockId, time) {
    const clock = document.getElementById(clockId);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Calculate rotation angles
    const secondsDegrees = (seconds / 60) * 360;
    const minutesDegrees = ((minutes + seconds/60) / 60) * 360;
    const hoursDegrees = ((hours % 12 + minutes/60) / 12) * 360;

    // Apply rotations to clock hands
    const hourHand = clock.querySelector('.hour-hand');
    const minuteHand = clock.querySelector('.minute-hand');
    const secondHand = clock.querySelector('.second-hand');

    hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
}

// Update clocks every second
setInterval(setClocks, 1000);

// Initial call to set clocks immediately
setClocks();