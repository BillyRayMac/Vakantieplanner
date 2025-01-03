// Data-array voor kookdagen en activiteiten
const kookdagen = [
    { dag: 'Maandag', kok: '' },
    { dag: 'Dinsdag', kok: '' },
    { dag: 'Woensdag', kok: '' },
    { dag: 'Donderdag', kok: '' },
    { dag: 'Vrijdag', kok: '' },
    { dag: 'Zaterdag', kok: '' },
    { dag: 'Zondag', kok: '' }
];

const activiteiten = [
    { dag: 'Maandag', activiteit: '' },
    { dag: 'Dinsdag', activiteit: '' },
    { dag: 'Woensdag', activiteit: '' },
    { dag: 'Donderdag', activiteit: '' },
    { dag: 'Vrijdag', activiteit: '' },
    { dag: 'Zaterdag', activiteit: '' },
    { dag: 'Zondag', activiteit: '' }
];

// Functie om tabellen te genereren
function genereerTabel(data, elementId) {
    const tbody = document.getElementById(elementId);
    tbody.innerHTML = ''; // Reset de inhoud

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value || 'Nog niet ingevuld';
            row.appendChild(cell);
        });

        // Voeg knop toe om in te schrijven
        const actieCel = document.createElement('td');
        const knop = document.createElement('button');
        knop.textContent = 'Inschrijven';
        knop.addEventListener('click', () => inschrijven(data, index));
        actieCel.appendChild(knop);
        row.appendChild(actieCel);

        tbody.appendChild(row);
    });
}

// Functie om inschrijving te verwerken
function inschrijven(data, index) {
    const naam = prompt('Vul je naam in:');
    if (naam) {
        data[index].kok = naam || data[index].activiteit;
        updateTabellen();
    }
}

// Functie om tabellen te updaten
function updateTabellen() {
    genereerTabel(kookdagen, 'kookdagen');
    genereerTabel(activiteiten, 'activiteitendagen');
}

// Initialiseer de tabellen
updateTabellen();
