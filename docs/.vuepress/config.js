/**
 * @Description: 配置文件
 * @Version: 1.0
 * @Author: 苏格晓晓
 */
const headConf = require("./config/head");
const pluginsConf = require("./config/plugins");
const themeConf = require("./config/theme");

module.exports = {
  base: "/",
  title: "苏格晓晓的个人博客",
  description: "欢迎来到我的博客！分享开发心得与技术探讨，共同学习成长。🌹",
  dest: "dist", //打包到根路径dist目录
  port: "8080",
  theme: "reco",
  head: headConf,
  themeConfig: themeConf,
  markdown: {
    lineNumbers: true,
  },
  plugins: pluginsConf,
};
