// Firebase-configuratie
const firebaseConfig = {
    apiKey: "JOUW_API_KEY",
    authDomain: "JOUW_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://JOUW_PROJECT_ID.firebaseio.com",
    projectId: "JOUW_PROJECT_ID",
    storageBucket: "JOUW_PROJECT_ID.appspot.com",
    messagingSenderId: "JOUW_MESSAGING_SENDER_ID",
    appId: "JOUW_APP_ID",
    measurementId: "JOUW_MEASUREMENT_ID"
};

// Initialiseer Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Standaard kookdagen en activiteiten
const kookdagen = [
    { dag: "Maandag", kok: "", gerecht: "" },
    { dag: "Dinsdag", kok: "", gerecht: "" },
    { dag: "Woensdag", kok: "", gerecht: "" },
    { dag: "Donderdag", kok: "", gerecht: "" },
    { dag: "Vrijdag", kok: "", gerecht: "" },
    { dag: "Zaterdag", kok: "", gerecht: "" },
    { dag: "Zondag", kok: "", gerecht: "" }
];

const activiteiten = [
    { dag: "Maandag", activiteit: "", details: "" },
    { dag: "Dinsdag", activiteit: "", details: "" },
    { dag: "Woensdag", activiteit: "", details: "" },
    { dag: "Donderdag", activiteit: "", details: "" },
    { dag: "Vrijdag", activiteit: "", details: "" },
    { dag: "Zaterdag", activiteit: "", details: "" },
    { dag: "Zondag", activiteit: "", details: "" }
];

// Functie om kookdagen en activiteiten te updaten in de Firebase-database
function updateDatabase() {
    firebase.database().ref("kookdagen").set(kookdagen);
    firebase.database().ref("activiteiten").set(activiteiten);
}

// Kookdagen en activiteiten updaten op de pagina
function updateTables() {
    const kookdagenTabel = document.getElementById("kookdagen-tabel").getElementsByTagName("tbody")[0];
    kookdagenTabel.innerHTML = "";
    kookdagen.forEach((item) => {
        const row = kookdagenTabel.insertRow();
        row.insertCell(0).innerText = item.dag;
        row.insertCell(1).innerText = item.kok || "Klik om in te schrijven";
        row.insertCell(2).innerText = item.gerecht || "Klik om in te schrijven";
        const actieCell = row.insertCell(3);
        actieCell.innerHTML = "<button>Inschrijven</button>";
        actieCell.onclick = () => {
            const nieuweKok = prompt(`Wie kookt op ${item.dag}?`);
            if (nieuweKok) {
                item.kok = nieuweKok;
                const gerecht = prompt(`Wat wordt er gekookt op ${item.dag}?`);
                if (gerecht) {
                    item.gerecht = gerecht;
                    updateDatabase();
                    updateTables();
                }
            }
        };
    });

    const activiteitenTabel = document.getElementById("activiteiten-tabel").getElementsByTagName("tbody")[0];
    activiteitenTabel.innerHTML = "";
    activiteiten.forEach((item) => {
        const row = activiteitenTabel.insertRow();
        row.insertCell(0).innerText = item.dag;
        row.insertCell(1).innerText = item.activiteit || "Klik om in te schrijven";
        row.insertCell(2).innerText = item.details || "Klik om in te schrijven";
        const actieCell = row.insertCell(3);
        actieCell.innerHTML = "<button>Inschrijven</button>";
        actieCell.onclick = () => {
            const nieuweActiviteit = prompt(`Wat is de activiteit op ${item.dag}?`);
            if (nieuweActiviteit) {
                item.activiteit = nieuweActiviteit;
                const details = prompt(`Wat zijn de details voor de activiteit op ${item.dag}?`);
                if (details) {
                    item.details = details;
                    updateDatabase();
                    updateTables();
                }
            }
        };
    });
}

// Fetch data from Firebase on load
window.onload = () => {
    firebase.database().ref("kookdagen").on("value", (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            kookdagen.splice(0, kookdagen.length, ...data);
        }
        updateTables();
    });

    firebase.database().ref("activiteiten").on("value", (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            activiteiten.splice(0, activiteiten.length, ...data);
        }
        updateTables();
    });
};
window.onload = () => {
    firebase.database().ref("kookdagen").on("value", (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Kookdagen geladen:", data); // Check of data goed binnenkomt
            kookdagen.splice(0, kookdagen.length, ...data);
        } else {
            console.log("Geen kookdagen gevonden.");
        }
        updateTables();
    });

    firebase.database().ref("activiteiten").on("value", (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Activiteiten geladen:", data); // Check of data goed binnenkomt
            activiteiten.splice(0, activiteiten.length, ...data);
        } else {
            console.log("Geen activiteiten gevonden.");
        }
        updateTables();
    });
};
