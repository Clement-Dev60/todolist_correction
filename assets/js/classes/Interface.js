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
  static displayTasks() {
    if (!Interface.listHTML || !Interface.completedListHTML) return;
    Interface.listHTML.innerHTML = ""; // Réinitialise la liste
    Interface.completedListHTML.innerHTML = "";

    const activeTasks = Interface.list.filter(task => !task.checked);
    const completedTasks = Interface.list.filter(task => task.checked)

    activeTasks.forEach(task => {
      const li = document.createElement("li");
      li.appendChild(task.checkbox);

      const p = document.createElement("p");
      p.textContent = task.displayName;
      li.appendChild(p);

      li.appendChild(task.deletebutton);
      Interface.listHTML.appendChild(li);
    });

    completedTasks.forEach(task => {
      const li = document.createElement("li");
      task.checkbox.checked = true;
      li.appendChild(task.checkbox);

      const p = document.createElement("p");
      p.textContent = task.displayName;
      li.appendChild(p);

      li.appendChild(task.deletebutton);
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
  static delete() {
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
  }
}