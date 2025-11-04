export default class Interface {
  // Obtient les éléments DOM au moment utile (évite la nullité si script chargé avant DOM)
  static get listHTML() { return document.getElementById("taskList"); }
  static get completedListHTML() { return document.getElementById("completedTaskList"); }

  // Gère la création d'une tâche via les champs du formulaire
  static handlerCreateTask(handler) {
    const newTaskName = document.getElementById("newTaskName");
    const newTaskType = document.getElementById("newTaskType");
    const newTaskDate = document.getElementById("newTaskDate");
    const newTaskValidate = document.getElementById("newTaskValidate");

    if (!newTaskValidate) return;

    // Quand on clique sur "valider", on crée un objet data et on l’envoie au handler
    newTaskValidate.addEventListener("click", (e) => {
      // Empêche le rechargement si bouton dans un form
      e.preventDefault();

      const data = {
        name: newTaskName ? newTaskName.value : "",
        type: newTaskType ? newTaskType.value : "simple",
        opt: {
          date: newTaskDate ? newTaskDate.value : null,
        },
      };
      handler(data);
    });
  }

  // Affiche la liste des tâches dans le DOM
  static displayTasks(tasks) {
    const listHTML = Interface.listHTML;
    const completedListHTML = Interface.completedListHTML;
    if (!listHTML || !completedListHTML) return;
    listHTML.innerHTML = ""; // Réinitialise la liste
    completedListHTML.innerHTML = "";

    const activeTasks = tasks.filter(task => !task.checked);
    const completedTasks = tasks.filter(task => task.checked);

    activeTasks.forEach((task) => {
      const li = document.createElement("li");

      li.appendChild(task.checkbox); // Ajoute la case à cocher
      
      const p = document.createElement("p");
      p.textContent = task.name; // Ajoute le nom de la tâche
      li.appendChild(p);
      
      li.appendChild(task.deletebutton);

      listHTML.appendChild(li); // Ajoute la tâche à la liste
    });
    completedTasks.forEach((task) => {
      const li = document.createElement("li");

      li.appendChild(task.checkbox); // Ajoute la case à cocher
      task.checkbox.checked = true;

      const p = document.createElement("p");
      p.textContent = task.name; // Ajoute le nom de la tâche
      li.appendChild(p);
      
      li.appendChild(task.deletebutton);
      
      completedListHTML.appendChild(li);
    });
    if (activeTasks.length === 0) {
      const emptyActive = document.createElement("div");
      emptyActive.classList.add("empty-message");
      emptyActive.innerHTML = `
        <span class="icon">🗒️</span>
        <p>Vous n'avez pas encore de tâches.</p>
      `;
      listHTML.appendChild(emptyActive);
    }

    if (completedTasks.length === 0) {
      const emptyCompleted = document.createElement("div");
      emptyCompleted.classList.add("empty-message");
      emptyCompleted.innerHTML = `
        <span class="icon">✅</span>
        <p>Aucune tâche terminée pour le moment.</p>
      `;
      completedListHTML.appendChild(emptyCompleted);
    }
  }
}