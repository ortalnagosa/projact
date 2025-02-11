const searchCity = async () => {
    const searchInput = document.getElementById('search-input');
    const cityName = searchInput.value.trim(); // קבלת שם העיר מהמשתמש

    if (!cityName) { 
        alert("נא להזין שם עיר");
        return;
    }

    try {
        // חיפוש עיר ב-Nominatim API
        const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`);
        const data = await response.json();

        if (data.length === 0) {
            alert("עיר לא נמצאה");
            return;
        }

        // חיפוש התוצאה המתאימה ביותר (עיר ולא אזור קטן)
        let bestMatch = data.find(item => item.type === "city" || item.type === "town") || data[0];

        // שליפת קואורדינטות של העיר
        const { lat, lon, display_name } = bestMatch;

        // בקשה לשירות זיהוי אזור הזמן לפי קואורדינטות
        const timezoneRes = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=TF3ISO4TNVPA&format=json&by=position&lat=${lat}&lng=${lon}`);
        const timezoneData = await timezoneRes.json();
        const cityTimeZone = timezoneData.zoneName; // שם אזור הזמן

        displayCityTime(display_name, cityTimeZone);
    } catch (error) {
        console.error('שגיאה בחיפוש העיר:', error);
        alert("שגיאה בעת חיפוש העיר");
    }
};

// פונקציה שמציגה את שם העיר והשעה שלה
const displayCityTime = (cityName, timeZone) => {
    const cityContainer = document.getElementById('search-result');

    // חישוב השעה לפי אזור הזמן
    const time = new Intl.DateTimeFormat('he-IL', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date());

    // הצגת הנתונים בחלון
    cityContainer.innerHTML = `
        <div class="newCountry">
            <h3>${cityName.split(',')[0]}</h3> <!-- מציג רק את שם העיר בלי מידע נוסף -->
            <h2>${time}</h2>
        </div>
    `;
};

// מאזין ללחיצה על כפתור החיפוש
document.getElementById('search-button').addEventListener('click', searchCity);
