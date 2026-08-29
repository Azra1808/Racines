import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ModuleScreen from '../screens/ModuleScreen';
import QuizScreen from '../screens/QuizScreen';
import LuluScreen from '../screens/LuluScreen';
import AccessibilityScreen from '../screens/AccessibilityScreen';
import ParametresScreen from '../screens/ParametresScreen';
import UssdScreen from '../screens/UssdScreen';
import IvrScreen from '../screens/IvrScreen';
import ChannelsScreen from '../screens/ChannelsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="Module" component={ModuleScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Lulu" component={LuluScreen} />
        <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
        <Stack.Screen name="Parametres" component={ParametresScreen} />
        <Stack.Screen name="Ussd" component={UssdScreen} />
        <Stack.Screen name="Ivr" component={IvrScreen} />
        <Stack.Screen name="Channels" component={ChannelsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}