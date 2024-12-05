import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import FullReload from 'vite-plugin-full-reload'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    FullReload(['config/routes.rb', 'app/views/**/*'])
  ],
  server: {
    host: 'localhost', // changé de true à 'localhost'
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3036
    }
  }
})