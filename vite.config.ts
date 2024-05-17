import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const Backend_URL = 'https://snapgram-backend-z81v.onrender.com'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      '/api/users': Backend_URL,
      '/api/login': Backend_URL,
      '/api/posts': Backend_URL,
      '/api/upload': Backend_URL,
      // '/api/users': 'http://localhost:1234',
      // '/api/login': 'http://localhost:1234',
      // '/api/posts': 'http://localhost:1234',
      // '/api/upload': 'http://localhost:1234',

    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
