import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LudoBoardScreen from '../screens/LudoBoardScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import { navigationRef } from '../helpers/NavigationUtils';
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='LudoBoardScreen' screenOptions={()=>({
        headerShown:false
      })}>
        <Stack.Screen name='LudoBoardScreen' options={{
            animation:'fade'
        }}  component={LudoBoardScreen}/>
        <Stack.Screen name='SplashScreen' options={{
            animation:'fade'
        }}  component={SplashScreen}/>
        <Stack.Screen name='HomeScreen' options={{
            animation:'fade'
        }}  component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Navigation;