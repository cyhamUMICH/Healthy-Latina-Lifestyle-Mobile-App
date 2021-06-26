import React from 'react';
import StatusBar from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import EditAccount from '../screens/EditAccount';
import MeditationList from '../screens/MeditationList';
import Meditation from '../screens/Meditation';
import AddContent from '../screens/AddContent';
import SetTimer from '../screens/SetTimer';
import Timer from '../screens/Timer';
import PasswordReset from '../screens/PasswordReset';
import AddMeditation from '../screens/AddMeditation';
import AddChallenge from '../screens/AddChallenge';
import Challenge from '../screens/Challenge'
import ChallengeList from '../screens/ChallengeList'
import ChatScreen from '../screens/ChatScreen'
import ChatRoomHome from '../screens/ChatRoomHome'
import Yoga from '../screens/Yoga'
import YogaList from '../screens/YogaList'

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login"
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: colors.accentBackground},
        headerTitleStyle: { color: colors.text },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerRight: () => (
          <Icon containerStyle={styles.iconContainer}
            name="bars" type="font-awesome" color={colors.text}
            onPress={() => navigation.toggleDrawer()}
          />
      )})}>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Homepage', headerTitleAlign: 'center'}}/>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerRight: null }}/>
      <Stack.Screen name="Register" component={Register} options={{ title: 'Register', headerRight: null }}/>
      <Stack.Screen name="EditAccount" component={EditAccount} options={{ title: 'Edit Account'}} />
      <Stack.Screen name="MeditationList" component={MeditationList} options={{ title: 'Meditation List'}} />
      <Stack.Screen name="Meditation" component={Meditation} options={{ title: 'Meditation'}} />
      <Stack.Screen name="AddContent" component={AddContent} options={{title: 'Add Content'}} />
      <Stack.Screen name="SetTimer" component={SetTimer} options={{ title: 'Timer'}} />
      <Stack.Screen name="Timer" component={Timer} options={{ title: 'Timer'}} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ title: 'Reset Password', headerRight: null }}/>
      <Stack.Screen name="AddMeditation" component={AddMeditation} options={{ title: 'Add Meditation'}} />
      <Stack.Screen name="AddChallenge" component={AddChallenge} options={{ title: 'Add Challenge'}} />
      <Stack.Screen name="Challenge" component={Challenge} options={{ title: 'Challenge'}} />
      <Stack.Screen name="ChallengeList" component={ChallengeList} options={{ title: 'ChallengeList'}} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route}) =>({ title: route.params.thread.name})} />
      <Stack.Screen name="ChatRoomHome" component={ChatRoomHome} options={{ title: 'Chat Rooms'}} />
      <Stack.Screen name="Yoga" component={Yoga} options={{ title: 'Yoga'}} />
      <Stack.Screen name="YogaList" component={YogaList} options={{ title: 'YogaList'}} />
    </Stack.Navigator>
  );
};

export default StackNavigation;