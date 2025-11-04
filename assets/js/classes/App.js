import Appoitment from "./Appoitment.js";
import Interface from "./Interface.js";
import Task from "./Task.js";

export default class App {
  tasks = []; // Tableau des tâches

  constructor() {
    // Expose l'instance globale pour que Task.delete() puisse accéder aux tâches
    window.app = this;

    // Écoute la création d'une nouvelle tâche via l'interface
    Interface.handlerCreateTask((data) => {
      // Ajoute une tâche selon son type
      if (data.type === "simple") {
        this.tasks.push(new Task(data));
      } else if (data.type === "appointment" || data.type === "rendezvous") {
        // adapte "appointment" ou "rendezvous" selon la value de ton <select>
        this.tasks.push(new Appoitment(data));
      }

      // Met à jour l'affichage des tâches
      Interface.displayTasks(this.tasks);
    });
    Interface.displayTasks(this.tasks);
  }
}