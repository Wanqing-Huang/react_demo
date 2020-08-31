import React, { useState, Component } from "react";
import {
  StyleSheet,
  Button,
  Image,
  TextInput,
  ScrollView,
  Text,
  View,
  Alert,
  NativeModules,
  NativeEventEmitter,
  requireNativeComponent,
  UIManager,
  findNodeHandle
} from "react-native";


/*============================= 样式声明 ================================*/
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#EFEFEF',
    borderRadius: 6
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: "bold",
    fontStyle: "italic"
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});


/*============================= 组件的使用 ================================*/
/**
 * 基础组件使用
 */
function BaseComponentDemo() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Title content="Component Demo"/>
      <Text style={{fontSize: 16}}>I am a Text component.</Text>
      <Separator/>
      <TextInput
        style={{height: 40}}
        placeholder="I am a TextInput component."
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Separator/>
      <Image
        style={{width: 64, height: 64}} 
        source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
      />
      <Separator/>
      <Button
        title="I am a Button component."
        onPress={() => Alert.alert('Right button pressed')}
      />
      <Separator/>
      <StateDemo/>
    </View>
  );
}

/**
 * 自定义组件
 * @param props：组件属性数组
 **/
function Title(props) {
  return <View style={{marginBottom: 12}}>
        <Text  style={styles.title}>
            {props.content}
         </Text>
    </View>
}

const Separator = () => {
  return <View style={styles.separator} />;
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


/**
 * 自定义导出组件
 * 使用了export default语句来导出这个组件，以使其可以在其他地方引入使用
 **/
export default function Home() {
  return (
    <ScrollView style={{padding: 12}}>
      <BaseComponentDemo/>
      <NativeViewDemo/>
      <NativeMethodDemo/>
    </ScrollView>
  );
}


/*============================= 使用Native自定义View ================================*/
const CustomButtonView = requireNativeComponent("CustomButtonView")
let nativeUI;

function NativeViewDemo() {
  return (
    <View style={styles.container}>
      <Title content="Native View Demo"/>
      <CustomButtonView
        ref={view => nativeUI = view}
        width={350}
        height={48}
        text="click to change text"
        onClick={event=>{
          changeText()
        }}
        onLongClick={event=>{
          alert("onLongClick")
        }}
      />
    </View>
  );
}

//传递命令给native
function changeText() {
  UIManager.dispatchViewManagerCommand(
    findNodeHandle(nativeUI),
    UIManager.getViewManagerConfig("CustomButtonView").Commands.changeText, //Commands.changeText需要与native层定义的命令名称一致
    ['这是新的按钮文案'] //命令携带的数据
  );
}

/*============================= RN与Native通信 ================================*/

/**
 * RN调用Native的方法
 **/
const TestModule = NativeModules.TestModule

class NativeMethodDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Title content="Native Method Demo"/>

        <Button style={{marginTop: 0}}
            onPress={() => {
                TestModule.sendEventToReact();
            }}
            title="send event to react"
        />

        <Button style={{marginVertical: 12}}
            onPress={() => {
                TestModule.showDevOptionsDialog();
            }}
            title="open debug dialog"
        />
      </View>
    )
  }

  /**
   * RN监听Native发送来的事件
   **/
  componentDidMount() {
    const eventEmitter = new NativeEventEmitter();
    eventEmitter.addListener('DemoEvent', (event) => {
      alert("on receive event:" + event.eventProperty)
    });
  }

  componentWillUnmount() {
    this.eventListener.remove();
  }
}