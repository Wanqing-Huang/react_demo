# react_demo

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


## 多线程
原生模块不应对自己被调用时所处的线程做任何假设，当前的状况有可能会在将来的版本中改变。如果一个过程要阻塞执行一段时间，这个工作应当分配到一个内部管理的工作线程，然后从那边可以调用任意的回调函数。译注：我们通常用 AsyncTask 来完成这项工作。