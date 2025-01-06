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

// Tabellen initialiseren
const kookdagen = [
    { dag: "Maandag", kok: "" },
    { dag: "Dinsdag", kok: "" },
    { dag: "Woensdag", kok: "" },
    { dag: "Donderdag", kok: "" },
    { dag: "Vrijdag", kok: "" },
    { dag: "Zaterdag", kok: "" },
    { dag: "Zondag", kok: "" },
];

// Tabellen updaten
function updateTabellen() {
    const kookdagenTabel = document.getElementById("kookdagen-tabel").getElementsByTagName("tbody")[0];
    kookdagenTabel.innerHTML = "";

    kookdagen.forEach((item, index) => {
        const row = kookdagenTabel.insertRow();
        const dagCel = row.insertCell(0);
        const kokCel = row.insertCell(1);

        dagCel.innerText = item.dag;
        kokCel.innerText = item.kok || "Klik om in te schrijven";
        row.onclick = () => {
            const nieuweKok = prompt(`Wie kookt op ${item.dag}?`);
            if (nieuweKok) {
                item.kok = nieuweKok;
                firebase.database().ref("kookdagen").set(kookdagen);
                updateTabellen();
            }
        };
    });
}

// Firebase-data ophalen en weergeven
firebase.database().ref("kookdagen").on("value", (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        kookdagen.splice(0, kookdagen.length, ...data);
    }
    updateTabellen();
});

// Start de applicatie
window.onload = updateTabellen;
