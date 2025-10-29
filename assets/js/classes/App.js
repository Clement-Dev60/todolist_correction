import Appoitment from "./Appoitment.js";
import Interface from "./Interface.js";
import Task from "./Task.js";

/* Classe principale de l'application */
export default class App {
  tasks = []; // Tableau des tâches
  
  constructor() {
    // Écoute la création d'une nouvelle tâche via l'interface
    Interface.handlerCreateTask((data) => {

      // Ajoute une tâche selon son type
      if (data.type == "simple") {
        this.tasks.push(new Task(data));
      } else if (data.type == "simple") {
        this.tasks.push(new Appoitment(data));
      }

      // Met à jour l'affichage des tâches
      Interface.displayTasks();
    });
  }
}