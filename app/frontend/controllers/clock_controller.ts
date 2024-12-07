import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  private interval: number | undefined

  connect(): void {
    this.updateTime()
    this.interval = window.setInterval(() => this.updateTime(), 1000)
  }

  disconnect(): void {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  private updateTime(): void {
    this.element.textContent = new Date().toLocaleTimeString()
  }
}
