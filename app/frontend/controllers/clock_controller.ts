import { Controller } from "@hotwired/stimulus"

/**
 * Controller Stimulus pour afficher l'heure actuelle
 * Utilisation : <div data-controller="clock"></div>
 */
export default class ClockController extends Controller {
  declare readonly element: HTMLElement
  private interval: number

  /**
   * Appelé quand le controller est connecté à l'élément DOM
   */
  connect() {
    // Met à jour l'heure immédiatement
    this.updateTime()
    // Met à jour l'heure chaque seconde
    this.interval = window.setInterval(() => this.updateTime(), 1000)
  }

  /**
   * Appelé quand le controller est déconnecté de l'élément DOM
   */
  disconnect() {
    // Nettoie l'intervalle pour éviter les fuites de mémoire
    clearInterval(this.interval)
  }

  /**
   * Met à jour l'heure dans l'élément
   */
  private updateTime() {
    const now = new Date()
    const dateStr = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const timeStr = now.toLocaleTimeString()
    this.element.textContent = `${dateStr} ${timeStr}`
  }
}
