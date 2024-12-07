import { Application } from "@hotwired/stimulus"

const application: Application = Application.start()

// Configure Stimulus development experience
application.debug = true // TODO: Set to false in production
window.Stimulus = application

// Déclaration pour TypeScript pour éviter l'erreur sur window.Stimulus
declare global {
    interface Window {
        Stimulus: Application;
    }
}

export { application }