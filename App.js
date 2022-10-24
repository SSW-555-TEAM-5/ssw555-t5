
import { NavigationContainer } from '@react-navigation/native';
import HomeScreenChild from './app/pages/child/HomeScreenChild';
import HomeScreenParent from './app/pages/guardian/HomeScreenParent';
import CreateReward from './app/pages/child/CreateReward'
import CreateChores from './app/pages/guardian/CreateChores';
import ViewRewardChild from './app/pages/child/ViewRewardChild';
import ViewChoreParent from './app/pages/guardian/ViewChoreParent';
import ViewChoreChild from './app/pages/child/ViewChoreChild';
import ViewRewardParent from './app/pages/guardian/ViewRewardParent';
import SignUp from './app/pages/signup';
import Login from './app/pages/login';
import ProfileSelection from './app/pages/ProfileSelection';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
      <Stack.Screen name="ChildHome" component={HomeScreenChild} options={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#133C55',
          headerShadowVisible: false,
          headerShown: true,
          title: '',
        }} />
        <Stack.Screen name="ParentHome" component={HomeScreenParent} options={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#133C55',
          headerShadowVisible: false,
          headerShown: true,
          title: '',
        }} />

      
        <Stack.Screen name="CreateChore" component={CreateChores} options={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#133C55',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: ''
        }} />
         <Stack.Screen name="CreateReward" component={CreateReward} options={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#133C55',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: ''
        }} />
        <Stack.Screen name="ViewChoreChild" component={ViewChoreChild} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
        <Stack.Screen name="ViewChoreParent" component={ViewChoreParent} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
         <Stack.Screen name="ViewRewardChild" component={ViewRewardChild} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
        <Stack.Screen name="ViewRewardParent" component={ViewRewardParent} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
        <Stack.Screen name="ProfileSelection" component={ProfileSelection} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
        <Stack.Screen name="Login" component={Login} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{
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

