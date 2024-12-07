import { Application } from "@hotwired/stimulus"
import { Controller } from "@hotwired/stimulus"

const application: Application = Application.start()

application.debug = true // TODO: Set to false in production
window.Stimulus = application

declare global {
    interface Window {
        Stimulus: Application;
    }
}

type ControllerModule = { default: typeof Controller }

const allFiles = import.meta.glob<ControllerModule | Record<string, unknown>>('./**/*', { eager: true })

type ControllerName = string
type ControllerPath = string

const isSnakeCase = (str: string): boolean => /^[a-z0-9]+(?:_[a-z0-9]+)*$/.test(str)

const extractControllerName = (path: ControllerPath): ControllerName | null => {
  const match = path.match(/\.\/(.+)_controller\./)
  return match?.[1]?.replace(/\//g, '--') ?? null
}

Object.entries(allFiles).forEach(([path, controller]) => {
  if (path === './application.ts') return

  if (!path.endsWith('_controller.ts')) {
    throw new Error(
      `Fichier invalide: "${path}"\nLes fichiers doivent se terminer par '_controller.ts'`
    )
  }

  const fileNameMatch = path.match(/\.\/(.+)_controller\./)
  const controllerBaseName = fileNameMatch?.[1]

  if (!controllerBaseName) {
    throw new Error(
      `Format invalide: "${path}"\nLe chemin ne correspond pas au format attendu`
    )
  }

  if (!isSnakeCase(controllerBaseName)) {
    throw new Error(
      `Format invalide: "${path}"\nLe nom doit être en snake_case (lettres minuscules et chiffres, séparés par des underscores)`
    )
  }

  const name = extractControllerName(path)
  if (!name) {
    throw new Error(`Impossible d'extraire le nom du contrôleur depuis "${path}"`)
  }

  if (!('default' in controller)) {
    throw new Error(
      `Export invalide: "${name}"\nLe contrôleur doit avoir un export default class qui étend Controller`
    )
  }

  application.register(name, (controller as ControllerModule).default)
})
