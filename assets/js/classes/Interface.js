/* Classe gérant l'interface utilisateur */
export default class Interface {
  // Élément HTML où s'affichent les tâches
  static listHTML = document.getElementById("taskList");
  static completedListHTML = document.getElementById("completedTaskList");

  // Gère la création d'une tâche via les champs du formulaire
  static handlerCreateTask(handler) {
    const newTaskName = document.getElementById("newTaskName");
    const newTaskType = document.getElementById("newTaskType");
    const newTaskDate = document.getElementById("newTaskDate");
    const newTaskValidate = document.getElementById("newTaskValidate");

    // Quand on clique sur "valider", on crée un objet data et on l’envoie au handler
    newTaskValidate.addEventListener("click", () => {
      const data = {
        name: newTaskName.value,
        type: newTaskType.value,
        opt: {
          date: newTaskDate.value,
        },
      };
      handler(data);
    });
  }

  // Affiche la liste des tâches dans le DOM
  static displayTasks(tasks) {
    if (!Interface.listHTML || !Interface.completedListHTML) return;
    Interface.listHTML.innerHTML = ""; // Réinitialise la liste
    Interface.completedListHTML.innerHTML = "";

    const activeTasks = tasks.filter(task => !task.checked);
    const completedTasks = tasks.filter(task => task.checked);

    activeTasks.forEach((task) => {
      const li = document.createElement("li");

      li.appendChild(task.checkbox); // Ajoute la case à cocher

      li.appendChild(task.deletebutton);

      const p = document.createElement("p");
      p.textContent = task.name; // Ajoute le nom de la tâche
      li.appendChild(p);

      Interface.listHTML.appendChild(li); // Ajoute la tâche à la liste
    });
    completedTasks.forEach((task) => {
      const li = document.createElement("li");

      li.appendChild(task.checkbox); // Ajoute la case à cocher
      task.checkbox.checked = true;

      li.appendChild(task.deletebutton);

      const p = document.createElement("p");
      p.textContent = task.name; // Ajoute le nom de la tâche
      li.appendChild(p);

      Interface.completedListHTML.appendChild(li);
    });
    if (activeTasks.length === 0) {
      const emptyActive = document.createElement("div");
      emptyActive.classList.add("empty-message");
      emptyActive.innerHTML = `
        <span class="icon">🗒️</span>
        <p>Vous n'avez pas encore de tâches.</p>
      `;
      Interface.listHTML.appendChild(emptyActive);
    }

    if (completedTasks.length === 0) {
      const emptyCompleted = document.createElement("div");
      emptyCompleted.classList.add("empty-message");
      emptyCompleted.innerHTML = `
        <span class="icon">✅</span>
        <p>Aucune tâche terminée pour le moment.</p>
      `;
      Interface.completedListHTML.appendChild(emptyCompleted);
    }
  }
  delete = () => (Interface.list = Interface.list.filter(t => t !== this));
}