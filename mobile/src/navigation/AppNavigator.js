import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ModuleScreen from '../screens/ModuleScreen';
import SousModuleScreen from '../screens/SousModuleScreen';
import QuizScreen from '../screens/QuizScreen';
import LuluScreen from '../screens/LuluScreen';
import AccessibilityScreen from '../screens/AccessibilityScreen';
import ParametresScreen from '../screens/ParametresScreen';
import UssdScreen from '../screens/UssdScreen';
import IvrScreen from '../screens/IvrScreen';
import ChannelsScreen from '../screens/ChannelsScreen';
import SmsScreen from '../screens/SmsScreen';
import EcranProtege from '../components/EcranProtege';

const Stack = createNativeStackNavigator();

// L'écran de lancement est une animation : agréable, mais jamais nécessaire.
// S'il échoue sur un téléphone donné, on entre directement dans l'accueil
// plutôt que de laisser le parent devant un écran blanc.
function LancementProtege(props) {
  return (
    <EcranProtege onEchec={() => props.navigation.replace('Home')}>
      <SplashScreen {...props} />
    </EcranProtege>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={LancementProtege} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="Module" component={ModuleScreen} />
        <Stack.Screen name="SousModule" component={SousModuleScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Lulu" component={LuluScreen} />
        <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
        <Stack.Screen name="Parametres" component={ParametresScreen} />
        <Stack.Screen name="Ussd" component={UssdScreen} />
        <Stack.Screen name="Ivr" component={IvrScreen} />
        <Stack.Screen name="Channels" component={ChannelsScreen} />
        <Stack.Screen name="Sms" component={SmsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
