import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import  Svg,{ G,Circle } from 'react-native-svg';


export default NextButton = ()=> {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size/2 - strokeWidth /2;
    const circumference = 2 * Math.PI * radius;

    return (
      <View style={styles.container}>
          <Svg width={size} height={size}>
              <Circle stroke='#E6E7E8' strokeWidth={strokeWidth} cx={center} cy={center} r={radius} />
              <Circle 
                stroke='#F4338F' 
                strokeWidth={strokeWidth} 
                cx={center} 
                cy={center} 
                r={radius} 
                strokeDasharray={circumference} 
                strokeDashoffset =  {circumference - (circumference * 25)/ 100}
              />
          </Svg> 
           <Text>Next</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
    }
});