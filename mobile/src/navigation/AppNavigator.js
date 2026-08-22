import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ModuleScreen from '../screens/ModuleScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1c6b3f' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'RACINES' }} />
        <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Modules' }} />
        <Stack.Screen name="Module" component={ModuleScreen} options={{ title: 'Module' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}