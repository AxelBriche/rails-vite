import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import FullReload from 'vite-plugin-full-reload'
import StimulusHMR from 'vite-plugin-stimulus-hmr'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    FullReload(['config/routes.rb', 'app/views/**/*']),
    StimulusHMR()
  ],
  server: {
    hmr: {
      host: 'localhost',
      port: 3036 // Must match Vite port (vite.json) for dev env.
    }
  }
})