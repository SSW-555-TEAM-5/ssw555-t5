
import { NavigationContainer } from '@react-navigation/native';
import HomeScreenChild from './app/pages/child/HomeScreenChild';
import HomeScreenParent from './app/pages/guardian/HomeScreenParent';
import CreateReward from './app/pages/guardian/CreateReward'
import CreateChores from './app/pages/guardian/CreateChores';
import ViewRewardChild from './app/pages/child/ViewRewardChild';
import ViewChoreParent from './app/pages/guardian/ViewChoreParent';
import ViewChoreChild from './app/pages/child/ViewChoreChild';
import ViewRewardParent from './app/pages/guardian/ViewRewardParent';
import SignUp from './app/pages/signup';
import Login from './app/pages/login';
import ProfileSelection from './app/pages/ProfileSelection';
import StartUpScreen from './app/pages/StartUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="StartUpScreen" component={StartUpScreen} options={{
          headerShown: false,
          headerTransparent: true,
          headerTintColor: '#133C55',
          headerShadowVisible: false,
          headerShown: true,
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



        <Stack.Screen name="ProfileSelection" component={ProfileSelection} options={{
          headerShown: false,
          headerTransparent: true,
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerBackVisible: true,
          title: 'Family',

        }} />






        <Stack.Screen name="HomeScreenChild" component={HomeScreenChild} options={{
          headerShown: false,
          headerTintColor: "#2ABAFF",
          headerShadowVisible: false,
          headerShown: false,
          title: 'ChoreNScore',
          headerBackVisible: false,
        }} />
        <Stack.Screen name="ViewChoreChild" component={ViewChoreChild} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: "#2ABAFF",
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
        <Stack.Screen name="HomeScreenParent" component={HomeScreenParent} options={{
          headerShown: false,
          headerTintColor: "#2ABAFF",
          headerShadowVisible: false,
          headerShown: true,
          title: '',
          headerBackVisible: false,
        }} />


        <Stack.Screen name="CreateChores" component={CreateChores} options={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: "#2ABAFF",
          headerShadowVisible: false,
          headerBackVisible: true,
          title: ''
        }} />
        <Stack.Screen name="CreateReward" component={CreateReward} options={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: "#2ABAFF",
          headerShadowVisible: false,
          headerBackVisible: true,
          title: ''
        }} />

        <Stack.Screen name="ViewChoreParent" component={ViewChoreParent} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: "#2ABAFF",
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
        <Stack.Screen name="ViewRewardChild" component={ViewRewardChild} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: "#2ABAFF",
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />
        <Stack.Screen name="ViewRewardParent" component={ViewRewardParent} options={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: "#2ABAFF",
          headerShadowVisible: false,
          headerBackVisible: true,
          title: '',

        }} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

