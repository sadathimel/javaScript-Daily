// import React from 'react';
// import { StyleSheet, View,Text } from 'react-native';
// import  Svg,{ G,Circle } from 'react-native-svg';


// export default NextButton = ()=> {
//     const size = 128;
//     const strokeWidth = 2;
//     const center = size / 2;
//     const radius = size/2 - strokeWidth /2;
//     const circumference = 2 * Math.PI * radius;

//     return (
//       <View style={styles.container}>
//           <Svg width={size} height={size}>
//               <Circle stroke='#E6E7E8' strokeWidth={strokeWidth} cx={center} cy={center} r={radius} />
//               <Circle 
//                 stroke='#F4338F' 
//                 strokeWidth={strokeWidth} 
//                 cx={center} 
//                 cy={center} 
//                 r={radius} 
//                 strokeDasharray={circumference} 
//                 strokeDashoffset =  {circumference - (circumference * 25)/ 100}
//               />
//           </Svg> 
//            <Text>Next</Text>
//       </View>
//     );
//   };

// const styles = StyleSheet.create({
//     container: {
//      flex: 1,
//      justifyContent: 'center',
//      alignItems: 'center',
//     }
// });



`import React, { Component } from 'react';
import { StyleSheet,View,Platform, Text, Image, ImageBackground } from 'react-native';
import Router from './config/Router';
import Baker from './assets/svgimages/Prize_money.svg';
import AsyncStorage from '@react-native-community/async-storage';
import AppContextFunction from './config/appcontextfunction';
import CheckInternet from './config/checkinternet';

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#F5FCFF',
},
welcome: {
fontSize: 20,
textAlign: 'center',
margin: 10,
},
instructions: {
textAlign: 'center',
color: '#333333',
marginBottom: 5,
},
MainContainer: {
flex: 1,
paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
alignItems: 'center',
justifyContent: 'center',
padding: 20
},
title: {
fontSize: 26,
color: '#fff',
fontWeight: 'bold',
textAlign: 'center',
marginTop: 20,
},
text: {
color: '#fff',
fontSize: 25,
},
image: {
width: '80%',
height: '70%',
resizeMode: 'contain'
},
});

class SplashScreen extends Component {
render() {
const viewStyles = [styles.container, { backgroundColor: 'orange' }]
return (



);
}
}

class App extends Component {
constructor(props) {
super(props);
this.state = { isLoading: true, show_Main_App: false, }
}

performTimeConsumingTask = async () => {
return new Promise((resolve) =>
setTimeout(
() => { resolve('result') },
2000
)
);
}

async componentDidMount() {
AsyncStorage.getItem("alreadyLaunched").then(value => {
console.log(value)
if (value !== null) {
if (value == "true") {
this.setState({ show_Main_App: true });
}
}
})
const data = await this.performTimeConsumingTask();
if (data !== null) {
this.setState({ isLoading: false });
}
}
on_Done_all_slides = () => {
AsyncStorage.setItem("alreadyLaunched", "true");
this.setState({ show_Main_App: true });
};

on_Skip_slides = () => {
AsyncStorage.setItem("alreadyLaunched", "true");
this.setState({ show_Main_App: true });
};

render() {
if (this.state.isLoading) {
return ;
} else if (!this.state.show_Main_App) {
return (
<ImageBackground source={require('./assets/images/introbkg.png')} style={{ width: '100%', height: '100%' }}>


);
} else {
return (




);
}
}
}

const slides = [
{
key: 'k1',
image: require('./assets/images/assets_intro1.png'),
imageStyle: styles.image,
backgroundColor: 'transparent',
},
{
key: 'k2',
image: require('./assets/images/assets_intro2.png'),
imageStyle: styles.image,
backgroundColor: 'transparent',
},
{
key: 'k3',
image: require('./assets/images/assets_intro3.png'),
imageStyle: styles.image,
backgroundColor: 'transparent',
},

];
export default App;
`