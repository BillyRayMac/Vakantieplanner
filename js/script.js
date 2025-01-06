// Firebase configuratie
const firebaseConfig = {
    apiKey: "AIzaSyBV0QbK7I_8Gct3PEexjn_8mn-AHPlPjFM",
    authDomain: "vakantieplanner-8e47e.firebaseapp.com",
    databaseURL: "https://vakantieplanner-8e47e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vakantieplanner-8e47e",
    storageBucket: "vakantieplanner-8e47e.appspot.com",
    messagingSenderId: "76259349044",
    appId: "1:76259349044:web:5316a95a0a1a0b9f0ef061",
    measurementId: "G-DMHRYB6R26"
};

// Firebase initialiseren
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Kookdagen lijst (standaard)
const kookdagen = [
    { dag: "Maandag", kok: "", gerecht: "" },
    { dag: "Dinsdag", kok: "", gerecht: "" },
    { dag: "Woensdag", kok: "", gerecht: "" },
    { dag: "Donderdag", kok: "", gerecht: "" },
    { dag: "Vrijdag", kok: "", gerecht: "" },
    { dag: "Zaterdag", kok: "", gerecht: "" },
    { dag: "Zondag", kok: "", gerecht: "" },
];

// Activiteiten lijst (standaard)
const activiteiten = [
    { dag: "Maandag", activiteit: "", details: "" },
    { dag: "Dinsdag", activiteit: "", details: "" },
    { dag: "Woensdag", activiteit: "", details: "" },
    { dag: "Donderdag", activiteit: "", details: "" },
    { dag: "Vrijdag", activiteit: "", details: "" },
    { dag: "Zaterdag", activiteit: "", details: "" },
    { dag: "Zondag", activiteit: "", details: "" },
];

// Kookdagen updaten
function updateKookdagen() {
    const kookdagenTabel = document.getElementById("kookdagen-tabel").getElementsByTagName("tbody")[0];
    kookdagenTabel.innerHTML = "";

    kookdagen.forEach((item) => {
        const row = kookdagenTabel.insertRow();
        const dagCel = row.insertCell(0);
        const kokCel = row.insertCell(1);
        const gerechtCel = row.insertCell(2);
        const actieCel = row.insertCell(3);

        dagCel.innerText = item.dag;
        kokCel.innerText = item.kok || "Klik om in te schrijven";
        gerechtCel.innerText = item.gerecht || "Klik om in te schrijven";
        actieCel.innerHTML = "<button>Inschrijven</button>";

        row.onclick = () => {
            const nieuweKok = prompt(`Wie kookt op ${item.dag}?`);
            if (nieuweKok) {
                item.kok = nieuweKok;
                const gerecht = prompt(`Wat wordt er gekookt op ${item.dag}?`);
                if (gerecht) {
                    item.gerecht = gerecht;
                    firebase.database().ref("kookdagen").set(kookdagen);
                    updateKookdagen();
                }
            }
        };
    });
}

// Activiteiten updaten
function updateActiviteiten() {
    const activiteitenTabel = document.getElementById("activiteiten-tabel").getElementsByTagName("tbody")[0];
    activiteitenTabel.innerHTML = "";

    activiteiten.forEach((item) => {
        const row = activiteitenTabel.insertRow();
        const dagCel = row.insertCell(0);
        const activiteitCel = row.insertCell(1);
        const detailsCel = row.insertCell(2);
        const actieCel = row.insertCell(3);

        dagCel.innerText = item.dag;
        activiteitCel.innerText = item.activiteit || "Klik om in te schrijven";
        detailsCel.innerText = item.details || "Klik om in te schrijven";
        actieCel.innerHTML = "<button>Inschrijven</button>";

        row.onclick = () => {
            const nieuweActiviteit = prompt(`Welke activiteit is er op ${item.dag}?`);
            if (nieuweActiviteit) {
                item.activiteit = nieuweActiviteit;
                const details = prompt(`Wat is de detailinformatie voor de activiteit op ${item.dag}?`);
                if (details) {
                    item.details = details;
                    firebase.database().ref("activiteiten").set(activiteiten);
                    updateActiviteiten();
                }
            }
        };
    });
}

// Firebase-data ophalen en weergeven voor kookdagen
firebase.database().ref("kookdagen").on("value", (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        kookdagen.splice(0, kookdagen.length, ...data);
    }
    updateKookdagen();
});

// Firebase-data ophalen en weergeven voor activiteiten
firebase.database().ref("activiteiten").on("value", (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        activiteiten.splice(0, activiteiten.length, ...data);
    }
    updateActiviteiten();
});

// Start de applicatie
window.onload = () => {
    updateKookdagen();
    updateActiviteiten();
};
