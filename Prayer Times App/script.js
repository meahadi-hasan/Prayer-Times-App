document.getElementById('saveButton').addEventListener('click', () => {
    const prayers = [
        { name: 'ফজর', start: 'fajrStart', end: 'fajrEnd' },
        { name: 'জোহর', start: 'dhuhrStart', end: 'dhuhrEnd' },
        { name: 'আসর', start: 'asrStart', end: 'asrEnd' },
        { name: 'মাগরিব', start: 'maghribStart', end: 'maghribEnd' },
        { name: 'ইশা', start: 'ishaStart', end: 'ishaEnd' }
    ];

    prayers.forEach(prayer => {
        const startTime = document.getElementById(prayer.start).value;
        const endTime = document.getElementById(prayer.end).value;

        if (startTime && endTime) {
            const now = new Date();
            const start = new Date(now.toDateString() + ' ' + startTime);
            const end = new Date(now.toDateString() + ' ' + endTime);

            // Check if the current time is within the specified range
            if (now >= start && now <= end) {
                showNotification(`${prayer.name} - সাইলেন্ট মোড চালু হয়েছে!`);
            } else {
                showNotification(`${prayer.name} - সাইলেন্ট মোড বন্ধ হয়েছে!`);
            }

            // Schedule notifications for start and end times
            scheduleNotification(start, `${prayer.name} - সাইলেন্ট মোড চালু হয়েছে!`);
            scheduleNotification(end, `${prayer.name} - সাইলেন্ট মোড বন্ধ হয়েছে!`);
        }
    });

    alert('সময় সেট করা হয়েছে! নোটিফিকেশন দেখুন।');
});

function scheduleNotification(time, message) {
    const now = new Date();
    const delay = time - now;

    if (delay > 0) {
        setTimeout(() => {
            showNotification(message);
        }, delay);
    }
}

function showNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(message);
            }
        });
    }
}