# 林间摄影作品集

一个可直接托管在 GitHub Pages 的静态摄影作品集，无需安装依赖或构建。

## 本地预览

直接在浏览器打开 `index.html`。如浏览器限制本地脚本加载，可在此目录启动任意静态文件服务器，例如 `python -m http.server 8000`，然后访问 `http://localhost:8000`。

## 添加或替换作品

编辑 `data/photos.js` 中的 `window.PHOTOS` 数组。每张照片使用一个对象：

```js
{
  id: 'unique-id',
  category: 'landscape', // landscape 风景 / portrait 人像 / street 扫街
  title: '作品标题',
  place: '拍摄地点',
  year: '2025',
  image: 'https://example.com/photo.jpg', // 浏览器可直接读取的图片 URL
  alt: '照片内容描述',
  pan123: 'https://www.123pan.com/s/...' // 可选，仅作分享来源备注
}
```

`image` 必须是公开可访问、能直接返回图片内容的 URL。123 网盘的普通分享页地址一般是网页，不是图片文件地址；将它填进 `image` 往往无法显示。可以把分享链接放在可选的 `pan123` 字段留作来源记录，再将图片上传到支持公开直链的图床或对象存储，把直链填入 `image`。发布前用无痕窗口打开图片直链，确认无需登录即可访问。外链服务也可能限制跨站访问、流量或防盗链，稳定性由服务方决定。不要将隐私照片设为公开链接。

分类值请使用 `landscape`、`portrait` 或 `street`。照片默认以黑白显示；自适应网格和灯箱会按屏幕尺寸调整。首页“全部”数量会根据数据自动更新。

## GitHub Pages 部署

1. 登录 GitHub，创建一个新仓库。仓库可以公开；仓库名可使用 `photography-portfolio`。如果使用免费 GitHub Pages，通常将仓库设为公开。
2. 将本目录中的 `index.html`、`about.html`、`styles.css`、`app.js`、`data/photos.js` 和本说明文件上传到仓库根目录。保持 `data/photos.js` 的目录位置不变。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 下选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/(root)`，点击保存。
5. 等待 GitHub Pages 部署完成，页面地址通常为 `https://你的用户名.github.io/仓库名/`。以后更新作品时编辑 `data/photos.js` 并提交到 `main`，部署会自动更新。

若仓库命名为 `你的用户名.github.io`，则网址通常为 `https://你的用户名.github.io/`。项目中页面、脚本和样式均使用相对路径，支持上述两种部署方式。

## 发布前个性化

- 在 `data/photos.js` 中替换示例照片、标题、拍摄地点和年份。
- 在 `about.html` 中更新作者介绍、名字与 `mailto:hello@example.com` 联系邮箱。
- 在 `index.html` 和 `about.html` 中更新站点名称及页脚署名。
- 首页展示的坐标为赤峰市约略坐标 `42.2578°N, 118.8869°E`，不是私人住址定位。
