/* Classe représentant une tâche simple */
export default class Task {
  // Compteur statique pour attribuer un ID unique à chaque tâche
  static idCount = 1;

  id;       // Identifiant de la tâche
  name;     // Nom de la tâche
  checked = false; // Indique si la tâche est cochée
  checkbox; // Élément HTML associé
  deletebutton;

  constructor(data) {
    // Assigne un ID unique à la tâche
    this.id = Task.idCount;
    Task.idCount++;

    // Récupère le nom depuis les données
    this.name = data.name;

    // Crée la case à cocher dans le DOM
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    this.checkbox = checkbox;

    // Ajoute un événement pour inverser l’état coché/non coché
    checkbox.addEventListener("click", () => this.toggle());

    const deletebutton = document.createElement("button");
    deletebutton.textContent = "❌";
    deletebutton.title = "Supprimer la tâche";
    this.deletebutton = deletebutton
    
    deletebutton.addEventListener("click", () => {
      window.taskToDelete = this;
      opentest();
    });
  }
  // Inverse l’état "checked" de la tâche
  toggle = () => (this.checked = !this.checked);

}