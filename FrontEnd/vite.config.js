import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
  proxy: {
    '/backend': {
      target: 'http://localhost:3000',
      secure: false,
    },
  },
},
  plugins: [react()],
})
