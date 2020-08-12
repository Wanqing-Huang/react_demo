import React, { useState } from "react";
import { Button, Text, View } from "react-native";

/**
* 自定义组件
* @param props：属性数组
**/
function Cat(props) {
  //it doesn’t matter what names you use. But it can be handy to think of the pattern as [<getter>, <setter>] = useState(<initialValue>).
  const [isHungry, setIsHungry] = useState(true);
  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? "hungry" : "full"}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "Pour me some milk, please!" : "Thank you!"}
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
    <>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
    </>
  );
}
