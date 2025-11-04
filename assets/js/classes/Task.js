import Interface from "./Interface.js"; // si nécessaire pour rafraîchir l'affichage

export default class Task {
  static idCount = 1;

  id;
  name;
  checked = false;
  checkbox;
  deletebutton;

  constructor(data) {
    this.id = Task.idCount++;
    this.name = data.name || `Tâche ${this.id}`;

    // Crée la case à cocher
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    this.checkbox = checkbox;

    // Lorsque l'utilisateur clique sur la checkbox, on inverse l'état et on rafraîchit l'affichage
    checkbox.addEventListener("click", () => {
      this.toggle();
      // Raffraîchir l'affichage en demandant la liste au root app exposé
      if (window.app) Interface.displayTasks(window.app.tasks);
    });

    const deletebutton = document.createElement("button");
    deletebutton.textContent = "🗑️";
    deletebutton.title = "Supprimer la tâche";
    deletebutton.classList.add("delete-btn");
    this.deletebutton = deletebutton;

    // ouverture du popup de confirmation
    deletebutton.addEventListener("click", () => {
      window.taskToDelete = this;
      if (typeof window.opentest === "function") window.opentest();
    });
  }

  toggle = () => (this.checked = !this.checked);

  // Méthode pour supprimer cette tâche du tableau app.tasks et rafraîchir l'affichage
  delete = () => {
    if (!window.app) return;
    window.app.tasks = window.app.tasks.filter(t => t !== this);
    Interface.displayTasks(window.app.tasks);
  };
}