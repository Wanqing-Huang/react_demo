import React, { useState } from "react";
import { Button, Image, TextInput, ScrollView, Text, View, Alert, NativeModules, NativeEventEmitter, requireNativeComponent } from "react-native";


/*============================= 组件的使用 ================================*/
/**
* 基础组件使用
*/
function BaseComponentDemo() {
  const [text, setText] = useState('');
  return (
    <View>
      <Title content="Component Demo"/>
      <Text style={{fontSize: 16}}>I am a Text component.</Text>
      <TextInput
        style={{height: 40}}
        placeholder="I am a TextInput component."
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Image
        style={{width: 64, height: 64}}
        source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
      />
      <Button
        title="I am a Button component."
        onPress={() => Alert.alert('Right button pressed')}
      />
      <StateDemo/>
    </View>
  );
}

/**
* 自定义组件
* @param props：组件属性数组
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
  const [isHungry, setIsHungry] = useState(true);
  return (
    <View>
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


/*============================= 使用Native自定义View ================================*/
const CustomButtonView = requireNativeComponent("CustomButtonView")
function NativeViewDemo() {
  return (
    <View>
      <Title content="Native View Demo"/>
      <CustomButtonView
        width={350}
        height={48}
        text="I am a native view"
      />
    </View>
  );
}

/*============================= RN与Native通信 ================================*/

/**
* RN调用Native的方法
**/
const Toast =  NativeModules.ToastModule
class NativeMethodDemo extends Component{
    function render() {
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
        const eventEmitter = new NativeEventEmitter();
        eventEmitter.addListener('DemoEvent', (event) => {
          alert("DemoEvent:" + event.eventProperty)
        });
    }

    componentWillUnmount() {
        this.eventListener.remove();
    }
}


/**
* RN监听Native发送来的事件
**/
const eventEmitter = new NativeEventEmitter();
eventEmitter.addListener('DemoEvent', (event) => {
  alert("DemoEvent:" + event.eventProperty)
});

function EventListenerDemo() {
  return (
    <View>
      <Title content="Event Listener Demo"/>
      <Button style={{marginTop: 8}}
        onPress={() => {
         Toast.sendEventDemo();
        }}
        title="click me to send a native event"
      />
    </View>
  );
}

/**
* 自定义导出组件
* 使用了export default语句来导出这个组件，以使其可以在其他地方引入使用
**/
export default function Home() {
  return (
    <ScrollView style={{padding: 12, marginTop: 24}}>
      <BaseComponentDemo/>
      <NativeViewDemo/>
      <NativeMethodDemo/>
      <EventListenerDemo/>
    </ScrollView>
  );
}


