
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Homescreen from './app/pages/child/homescreen';
import CreateChores from './CreateChores';
import ViewChore from './ViewChore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
      <Stack.Screen name="Home" component={Homescreen} options={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#133C55',
          headerShadowVisible: false,
          headerShown: true,
          title: '',
        }} />

      
        <Stack.Screen name="CreateChores" component={CreateChores} options={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#133C55',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: ''
        }} />

        <Stack.Screen name="ViewChore" component={ViewChore} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});