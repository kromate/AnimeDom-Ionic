import { defineConfig } from 'VUE_APP'
import path from 'path'
import vue from '@VUE_APPjs/plugin-vue'

// https://VUE_APPjs.dev/config/
export default defineConfig({
  plugins: [vue()],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
