const timeZones = {
    jerusalem: "Asia/Jerusalem",
    addis_ababa: "Africa/Addis_Ababa",
    brasilia: "America/Sao_Paulo",
    kingston: "America/Jamaica"
};

function updateTime() {
    for (const city in timeZones) {
        const element = document.getElementById(city);
        if (element) {
            const time = new Intl.DateTimeFormat('he-IL', {
                timeZone: timeZones[city],
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(new Date());

            element.innerHTML = time;
        }
    }
}

setInterval(updateTime, 1000);
updateTime(); 
