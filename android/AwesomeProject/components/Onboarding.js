import React, { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
// import NextButton from '../components/NextButton';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import slides from '../slides';



export default Onboarding = ()=> {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


    return (
      <View style={styles.container}>
        <View style={{flex: 3}}>
        <FlatList 
          data={slides}  
          renderItem={({item})=> <OnboardingItem item={item}/>} 
          horizontal 
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={item=>item.id}
          onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}],{
            useNativeDriver:false
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        </View>
        <Paginator data={slides}  scrollX={scrollX}/>
        {/* <NextButton /> */}
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },
});