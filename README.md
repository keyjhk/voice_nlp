# voice

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Edit Configs
see `/src/config.js`

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 部署到django
1. 前端代码更改`config.js`的后端测试地址`http://127.0.0.1:8000`为服务器ip ，测试服务器的端口是否正常
2. 前端项目执行`npm run build`打包，项目目录下生成`dist`文件夹
3. 复制 dist 文件夹到 django项目的根目录文件夹
