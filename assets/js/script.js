import App from "./classes/App.js";
import Interface from "./classes/Interface.js";

new App();

document.getElementById("connect").addEventListener("click", () => {
    document.location.replace("http://127.0.0.1:5500/connect.html")
})


document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('choice');

    const options = {
        1: { label: 'TO-DO List', url: '/todolist.html' },
        2: { label: 'Rendez-vous', url: '/appointment.html' },
    };

    select.innerHTML = '<option value="">-- Choisir une page --</option>';
    for (const [valeur, option] of Object.entries(options)) {
        const opt = document.createElement('option');
        opt.value = valeur;
        opt.textContent = option.label;
        select.appendChild(opt);
    }

    const currentPath = window.location.pathname;
    for (const [valeur, option] of Object.entries(options)) {
        if (!option.url.startsWith('http') && currentPath.endsWith(option.url)) {
            select.value = valeur;
            break;
        }
    }

    select.addEventListener('change', () => {
        const valeur = select.value;
        if (valeur && options[valeur]) {
            window.location.href = options[valeur].url;
        }
    });
});

const confirmDeleteButton = document.getElementById("confirmDelete");
confirmDeleteButton.addEventListener("click", () => {
    if (window.taskToDelete) {
        window.taskToDelete.delete();
        window.taskToDelete = null;
        closetest();
    }
});
window.opentest = function () {
    const popup = document.getElementById("deletePopUp");
    popup.classList.toggle("display");
    setTimeout(() => {
        popup.classList.toggle("open");
    }, 50);
};

window.closetest = function () {
    const popup = document.getElementById("deletePopUp");
    popup.classList.remove("open");
    setTimeout(() => {
        popup.classList.remove("display");
    }, 300);
};

window.taskToDelete = null;