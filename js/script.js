// Simulazione di un database di utenti (sostituire con un backend reale)
const users = [
    { username: "cliente", password: "cliente123", type: "cliente" },
    { username: "negoziante", password: "negoziante123", type: "negoziante" },
];

// Simulazione di contratti e richieste (sostituire con un backend reale)
const contrattiCliente = [
    { id: "001", servizio: "Fastweb Internet", dataAttivazione: "2023-01-15", stato: "Attivo" },
    { id: "002", servizio: "Windtre Mobile", dataAttivazione: "2023-03-10", stato: "In Attesa" },
];

const richiesteNegozziante = [
    { id: "001", cliente: "Mario Rossi", servizio: "Fastweb Internet", dataRichiesta: "2023-09-01", stato: "In Attesa" },
    { id: "002", cliente: "Luigi Verdi", servizio: "Windtre Mobile", dataRichiesta: "2023-09-05", stato: "Completata" },
];

// Funzione per gestire il login
function handleLogin(event) {
    event.preventDefault(); // Impedisce il ricaricamento della pagina

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verifica le credenziali
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Memorizza lo stato di login e il tipo di utente in sessionStorage
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("userType", user.type);

        // Reindirizza alla dashboard corretta
        if (user.type === "cliente") {
            window.location.href = "dashboard_cliente.html";
        } else if (user.type === "negoziante") {
            window.location.href = "dashboard_negoziante.html";
        }
    } else {
        alert("Username o password non validi. Riprova.");
    }
}

// Funzione per gestire il logout
function handleLogout() {
    // Rimuove lo stato di login e il tipo di utente da sessionStorage
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userType");

    // Reindirizza alla pagina di login
    window.location.href = "login.html";
}

// Funzione per caricare i contratti del cliente
function loadContrattiCliente() {
    const tableBody = document.querySelector("#contrattiTable tbody");
    tableBody.innerHTML = ""; // Pulisce la tabella

    contrattiCliente.forEach(contratto => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contratto.id}</td>
            <td>${contratto.servizio}</td>
            <td>${contratto.dataAttivazione}</td>
            <td><span class="badge ${contratto.stato === "Attivo" ? "bg-success" : "bg-warning"}">${contratto.stato}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Funzione per caricare le richieste del negoziante
function loadRichiesteNegozziante() {
    const tableBody = document.querySelector("#richiesteTable tbody");
    tableBody.innerHTML = ""; // Pulisce la tabella

    richiesteNegozziante.forEach(richiesta => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${richiesta.id}</td>
            <td>${richiesta.cliente}</td>
            <td>${richiesta.servizio}</td>
            <td>${richiesta.dataRichiesta}</td>
            <td><span class="badge ${richiesta.stato === "Completata" ? "bg-success" : "bg-warning"}">${richiesta.stato}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Funzione per gestire la richiesta di attivazione contratto
function handleRichiestaAttivazione(event) {
    event.preventDefault(); // Impedisce il ricaricamento della pagina

    // Recupera i dati del form
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const email = document.getElementById("email").value;
    const servizio = document.getElementById("servizio").value;
    const codiceMigrazione = document.getElementById("codiceMigrazione").value;
    const numeroTelefono = document.getElementById("numeroTelefono").value;
    const altreInfo = document.getElementById("altreInfo").value;

    // Simula l'invio della richiesta (sostituire con una chiamata API reale)
    alert(`Richiesta di attivazione inviata con successo!\n\nDettagli:\nNome: ${nome}\nCognome: ${cognome}\nEmail: ${email}\nServizio: ${servizio}\nCodice Migrazione: ${codiceMigrazione}\nNumero di Telefono: ${numeroTelefono}\nAltre Info: ${altreInfo}`);

    // Resetta il form
    document.getElementById("richiestaAttivazioneForm").reset();
}

// Funzione per gestire la visibilità dei campi "Codice Migrazione" e "Numero di Telefono"
function toggleCampiPortaNumero() {
    const portaNumero = document.getElementById("portaNumero");
    const codiceMigrazioneGroup = document.getElementById("codiceMigrazioneGroup");
    const numeroTelefonoGroup = document.getElementById("numeroTelefonoGroup");

    if (portaNumero.checked) {
        codiceMigrazioneGroup.style.display = "block";
        numeroTelefonoGroup.style.display = "block";
    } else {
        codiceMigrazioneGroup.style.display = "none";
        numeroTelefonoGroup.style.display = "none";
    }
}

// Funzione per inizializzare la dashboard
function initDashboard() {
    const loggedIn = sessionStorage.getItem("loggedIn");
    const userType = sessionStorage.getItem("userType");

    // Se l'utente non è loggato, reindirizza alla pagina di login
    if (!loggedIn) {
        window.location.href = "login.html";
        return;
    }

    // Carica i dati in base al tipo di utente
    if (userType === "cliente") {
        loadContrattiCliente();
    } else if (userType === "negoziante") {
        loadRichiesteNegozziante();
    }
}

// Funzione per validare i form
function validateForm(form) {
    let isValid = true;
    form.querySelectorAll("input[required]").forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("is-invalid");
        } else {
            input.classList.remove("is-invalid");
        }
    });
    return isValid;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
    // Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    // Logout
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }

    // Richiesta di attivazione contratto
    const richiestaForm = document.getElementById("richiestaAttivazioneForm");
    if (richiestaForm) {
        richiestaForm.addEventListener("submit", handleRichiestaAttivazione);
    }

    // Gestione della checkbox "Porta il tuo numero"
    const portaNumero = document.getElementById("portaNumero");
    if (portaNumero) {
        portaNumero.addEventListener("change", toggleCampiPortaNumero);
    }

    // Inizializzazione della dashboard
    if (window.location.pathname.includes("dashboard")) {
        initDashboard();
    }
});