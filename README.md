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
2. 前端项目执行`npm run build`打包，项目目录下生成`dist`文件夹，结构如下：
<img src="https://gitee.com/jiang_hui_kai/images/raw/master/img/image-20220123140027241.png" alt="image-20220123140027241" style="zoom:67%;" />

3.将步骤2中的**除了`index.html`的文件**拷贝到django项目的`static`文件夹中，作为静态资源访问。

4.将 index.html 文件拷贝到 templates 文件夹下，作为模板访问。**同时，将index.html 的资源依赖改成 如下形式的static 链接 （css前面加入了static）**

```html
 <link href="/static/css/app.62f2d439.css" rel="preload" as="style">
```
