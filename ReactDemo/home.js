import React, { useState } from "react";
import { Button, Image, TextInput, ScrollView, Text, View, NativeModules } from "react-native";
import Toast from NativeModules.ToastModule;

/**
* 自定义组件
* @param props：属性数组
**/
function Title(props){
    return <View style={{marginTop: 24, marginBottom: 12}}>
        <Text  style={{fontSize: 20}}>
            {props.content}
         </Text>
    </View>
}


/**
* 有状态组件
**/
function StateDemo() {
  //it doesn’t matter what names you use. But it can be handy to think of the pattern as [<getter>, <setter>] = useState(<initialValue>).
  const [isHungry, setIsHungry] = useState(true);
  return (
    <View>
      <Title content="State Demo"/>
      <Text style={{fontSize: 16}}>
        current state is: {isHungry ? "hungry" : "full"}
      </Text>
      <Button style={{marginTop: 8}}
        onPress={() => {
          setIsHungry(!isHungry);
        }}
        title="click me to change state"
      />
    </View>
  );
}

function TextInputDemo(){
  const [text, setText] = useState('');
  return (
    <View>
      <Title content="TextInput Demo"/>
      <TextInput
        style={{height: 40}}
        placeholder="please input string here"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text>
        {text}
      </Text>
    </View>
  );
}

function ImageDemo(){
  return (
    <View>
      <Title content="Image Demo"/>
      <Image
        source={logo}
      />
    </View>
  );
}



const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};


function NativeMethodDemo() {
  return (
    <View>
      <Title content="Native Method Demo"/>
      <Button style={{marginTop: 8}}
        onPress={() => {
          Toast.show('Awesome', Toast.SHORT);
        }}
        title="click me to toast"
      />
    </View>
  );
}

/**
* 自定义导出组件
* 使用了export default语句来导出这个组件，以使其可以在其他地方引入使用
**/
export default function Cafe() {
  return (
    <ScrollView style={{padding: 12, marginTop: 24}}>
      <TextInputDemo/>
      <ImageDemo/>
      <StateDemo/>
      <NativeMethodDemo/>
    </ScrollView>
  );
}


