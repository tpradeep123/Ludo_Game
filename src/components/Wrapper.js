import { View, Text, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import BG  from "../assets/images/bg.jpg"
import { DeviceHeight, DeviceWidth } from '../constants/Scaling'
const Wrapper = ({children,style}) => {
  return (
    <ImageBackground source={BG} resizeMode='cover' style={styles.container}>
        <SafeAreaView style={[styles.SafeArea,{...style}]}>
            {children}
        </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  SafeArea:{
width:DeviceWidth,
height:DeviceHeight,
    justifyContent:'center',
    alignItems:'center'
  }
});
export default Wrapper