import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置'@'指向’src‘目录
      '#': resolve(__dirname, 'src/types')
    }
  },

  base: './', // 设置打包路径

  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
    // 设置代理，根据项目实际情况配置
    /*    proxy:{
      '/api':{
        target:'http://xxx.xxx.xxx.8000',
        changeOrigin:true,
        secure:false,
        rewrite:(path)=>path.replace('/api','/')
      }
    } */
  },
  // 生产环境去除console和debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
