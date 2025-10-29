/* Classe représentant un rendez-vous, héritée de Task */
export default class Appoitment extends Task {
  date; // Date du rendez-vous

  constructor(data) {
    super(data); // Appel du constructeur parent
    this.date = data.opt.date; // Stocke la date fournie
  }
}