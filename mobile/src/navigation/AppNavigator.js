import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ModuleScreen from '../screens/ModuleScreen';
import QuizScreen from '../screens/QuizScreen';
import LuluScreen from '../screens/LuluScreen';
import AccessibilityScreen from '../screens/AccessibilityScreen';
import ParametresScreen from '../screens/ParametresScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="Module" component={ModuleScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Lulu" component={LuluScreen} />
        <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
        <Stack.Screen name="Parametres" component={ParametresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}