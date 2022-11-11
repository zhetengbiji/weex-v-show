# weex v-show

用于支持 weex 环境内的 v-show 指令

## 支持环境

* 普通 weex 项目
* uni-app 项目 nvue 页面

## 使用方式

### NPM

```
npm i weex-v-show --save
```
```js
import vShow from 'weex-v-show'
// #ifdef APP-NVUE
Vue.directive('show', vShow)
// #endif
```

### 直接下载

```js
// 以下路径需根据项目实际情况填写
import vShow from '../../js/weex-v-show.js'
// #ifdef APP-NVUE
Vue.directive('show', vShow)
// #endif
```

## 原理及限制

* 由于 weex 不支持设置 display 样式，本插件通过切换元素其他样式来实现；
* 部分情况下导致隐藏不彻底，可以尝试自行调整插件内切换的样式；
* 如遇隐藏后无法显示，请给元素显式的设置宽高；
