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
