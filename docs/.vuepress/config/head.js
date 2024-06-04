/**
 * @Description: 头部文件配置
 * @Version: 1.0
 * @Author: 苏格晓晓
 */
module.exports = [
  ['link', { rel: 'icon', href: '/img/favicon.ico' }],
  [
    'meta',
    { name: 'keywords', content: 'Gxsunny空间,vuepress,自建博客,苏格晓晓' },
  ],
  [
    'meta',
    {
      name: 'description',
      content:
        'Gxsunny空间,vuepress,自建博客,苏格晓晓',
    },
  ],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no',
    },
  ],
  ['meta', { name: 'robots', content: 'all' }],
  ['meta', { name: 'author', content: '苏格晓晓' }],
  ['link', { rel: 'stylesheet', href: '/css/style.css' }], //显示nav小logo
  // ['script', { charset: 'utf-8', src: '/js/custom.js' }], //加载右侧菜单栏广告图片
  // 百度统计
  [
    'script',
    {},
    `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e23ce24533ef8dfa488f593eeb285be6";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `,
  ],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no',
    },
  ],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  [
    'link',
    {
      rel: 'apple-touch-icon',
      href: 'https://infinitypro-img.infinitynewtab.com/custom-icon/8001de1jd3n68lbfnxxt564xvb0vl5.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim',
    },
  ],
  [
    'script',
    {
      language: 'javascript',
      type: 'text/javascript',
      src: 'https://cdn.staticfile.org/jquery/1.7.2/jquery.min.js',
    },
  ],
  ['script', { src: '/js/mouseClick.js' }, ``], //鼠标点击特效
]
