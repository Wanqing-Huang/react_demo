# ReactNative

## 安装第三方库
1. 在package.json文件中添加依赖
```json
{
  "dependencies": {
    "react-native-maps": "^0.22.1"
  },
}
```
2. 运行命令安装第三方库
npm install react-native-maps

## 打包bundle
1. 在 android/app/src/main/ 目录下创建 assets 目录
2. 执行打包命令：
react-native bundle --entry-file index.js --platform android --dev false --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/

## 多线程
React Native 的跨语言访问是异步进行的，所以想要给 JavaScript 返回一个值的唯一办法是使用回调函数或者发送事件。
原生模块不应对自己被调用时所处的线程做任何假设，当前的状况有可能会在将来的版本中改变。如果一个过程要阻塞执行一段时间，这个工作应当分配到一个内部管理的工作线程，然后从那边可以调用任意的回调函数。

## JS 与 Native参数映射关系
- Boolean -> Bool
- Integer -> Number
- Double -> Number
- Float -> Number
- String -> String
- Callback -> function
- ReadableMap -> Object
- ReadableArray -> Array
