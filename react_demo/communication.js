import React, { useState } from "react";
import { Button, Image, TextInput, ScrollView, Text, View, Alert, NativeModule, NativeEventEmitter} from "react-native";


/*============================= RN与Native通信 ================================*/

/**
* RN调用Native的方法
**/
const Toast =  NativeModules.ToastModule
function NativeMethodDemo() {
  return (
    <View>
      <Title content="Native Method Demo"/>
      <Button style={{marginTop: 8}}
        onPress={() => {
         Toast.show('I am a toast invoke from react', Toast.SHORT);
        }}
        title="click me to toast"
      />
    </View>
  );
}


componentDidMount() {
  const eventEmitter = new NativeEventEmitter(Toast);
  this.eventEmitter = eventEmitter.addListener('DemoEvent', (event) => {
    console.log(event.eventProperty) // "someValue"
  };
}
componentWillUnmount() {
  this.eventListener.remove(); // Removes the listener
}


/**
* 自定义导出组件
* 使用了export default语句来导出这个组件，以使其可以在其他地方引入使用
**/
export default function Home() {
  return (
    <ScrollView style={{padding: 12, marginTop: 24}}>
      <BaseComponentDemo/>
      <NativeMethodDemo/>
    </ScrollView>
  );
}


