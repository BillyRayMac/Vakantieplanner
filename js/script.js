// Firebase configuratie
const firebaseConfig = {
    apiKey: "AIzaSyBV0QbK7I_8Gct3PEexjn_8mn-AHPlPjFM",
    authDomain: "vakantieplanner-8e47e.firebaseapp.com",
    databaseURL: "https://vakantieplanner-8e47e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vakantieplanner-8e47e",
    storageBucket: "vakantieplanner-8e47e.firebasestorage.app",
    messagingSenderId: "76259349044",
    appId: "1:76259349044:web:5316a95a0a1a0b9f0ef061",
    measurementId: "G-DMHRYB6R26"
};

// Firebase initialiseren
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Data structuren
const kookdagen = [
    { dag: "Maandag", kok: "" },
    { dag: "Dinsdag", kok: "" },
    { dag: "Woensdag", kok: "" },
    { dag: "Donderdag", kok: "" },
    { dag: "Vrijdag", kok: "" },
    { dag: "Zaterdag", kok: "" },
    { dag: "Zondag", kok: "" }
];
const activiteiten = [
    { dag: "Maandag", activiteit: "" },
    { dag: "Dinsdag", activiteit: "" },
    { dag: "Woensdag", activiteit: "" },
    { dag: "Donderdag", activiteit: "" },
    { dag: "Vrijdag", activiteit: "" },
    { dag: "Zaterdag", activiteit: "" },
    { dag: "Zondag", activiteit: "" }
];

// Tabellen updaten
function updateTabellen() {
    const kookdagenTabel = document.getElementById("kookdagen-tabel").getElementsByTagName("tbody")[0];
    const activiteitenTabel = document.getElementById("activiteiten-tabel").getElementsByTagName("tbody")[0];
    kookdagenTabel.innerHTML = ""; // Leeg de tabel
    activiteitenTabel.innerHTML = ""; // Leeg de tabel

    // Kookdagen invullen
    kookdagen.forEach((item, index) => {
        const row = kookdagenTabel.insertRow();
        const dagCel = row.insertCell(0);
        const kokCel = row.insertCell(1);
        dagCel.innerText = item.dag;
        kokCel.innerText = item.kok || "Klik om in te schrijven";
        row.onclick = () => inschrijven(kookdagen, index, "kookdagen");
    });

    // Activiteiten invullen
    activiteiten.forEach((item, index) => {
        const row = activiteitenTabel.insertRow();
        const dagCel = row.insertCell(0);
        const activiteitCel = row.insertCell(1);
        dagCel.innerText = item.dag;
        activiteitCel.innerText = item.activiteit || "Klik om activiteit toe te voegen";
        row.onclick = () => inschrijven(activiteiten, index, "activiteiten");
    });
}

// Inschrijven functie
function inschrijven(data, index, type) {
    const input = prompt(`Voer ${type === "kookdagen" ? "de naam van de kok" : "de activiteit"} in:`);
    if (input) {
        data[index][type === "kookdagen" ? "kok" : "activiteit"] = input;
        firebase.database().ref(type).set(data); // Gegevens opslaan in Firebase
        updateTabellen(); // Tabellen bijwerken
    }
}

// Firebase lezen bij opstarten
firebase.database().ref("kookdagen").on("value", (snapshot) => {
    if (snapshot.exists()) {
        kookdagen.splice(0, kookdagen.length, ...snapshot.val());
        updateTabellen();
    }
});
firebase.database().ref("activiteiten").on("value", (snapshot) => {
    if (snapshot.exists()) {
        activiteiten.splice(0, activiteiten.length, ...snapshot.val());
        updateTabellen();
    }
});

// Start de applicatie
window.onload = updateTabellen;
