import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View ,TouchableOpacity,Linking} from 'react-native';



export default OnboardingItem = ({item})=> {
 
  const { width } = useWindowDimensions();
    return (
      <View style={[styles.container, {width}]}>
        <Image source={item.logo} style={[styles.logo,{width, resizeMode: 'contain'}]}/>
        <Image source={item.image} style={[styles.image,{width, resizeMode: 'contain'},"{backgroundColor: {item.backgroundColor}}"]}/>
        <TouchableOpacity onPress={()=> Linking.openURL('https://purplepatch.online/')}>
        <Image source={item.button} style={[styles.button,{width, resizeMode: 'contain'}]} />
      </TouchableOpacity>
       
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: .6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
     flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    logo:{
      flex: 0.4,

    },
    button:{
      flex: 0,
      marginTop: 20,
    }

});