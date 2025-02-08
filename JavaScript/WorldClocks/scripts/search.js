const getCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch countries', error);
    }
};

const countriesFull = await getCountries();

const search = () => {
    const searchInput = document.getElementById('search-input');
    const word = searchInput.value.trim().toLowerCase(); 
    
    if (!word) { 
        alert("נא להזין שם מדינה");
        return;
    } 
    const country = countriesFull.find(country => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(word);
    });
    
    if (country) {
        displayCountry(country);
    } else {
        alert("מדינה לא נמצאה");
    }
};

document.getElementById('search-button').addEventListener('click', search);

const displayCountry = async (country) => {
    if (!country) return;

    let countryContainer = document.getElementById('search-result');
    
    countryContainer.innerHTML = `
        <div class="newCountry">
            <h3>${country.name.common}</h3>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="300">
            <h2 id="searched-time"></h2>
        </div>
    `;    

    const countryTimeZone = country.timezones[0]; // לוקחים את אזור הזמן הראשון של המדינה
    const normalizedTimeZone = normalizeTimeZone(countryTimeZone);
    updateCountryTime(normalizedTimeZone);
};

// פונקציה הממירה אזור זמן ב-UTC לפורמט תקני
const normalizeTimeZone = (timeZone) => {
    if (timeZone.startsWith("UTC")) {
        const offset = timeZone.split("UTC")[1]; // לדוגמה: "-05:00"
        const sign = offset.startsWith("-") ? "minus" : "plus";
        const absOffset = offset.replace(":", "");

        // דוגמאות להתאמות אזורי זמן
        if (sign === "minus" && absOffset === "0500") {
            return "America/New_York"; // UTC-05:00 → America/New_York
        } else if (sign === "plus" && absOffset === "0100") {
            return "Europe/Paris"; // UTC+01:00 → Europe/Paris
        }
        // יש להוסיף התאמות נוספות לפי הצורך

        return timeZone; // אם לא נמצאה התאמה, מחזירים את ה-UTC המקורי
    }
    return timeZone; // אם לא מדובר ב-UTC, מחזירים את אזור הזמן המקורי
};

          