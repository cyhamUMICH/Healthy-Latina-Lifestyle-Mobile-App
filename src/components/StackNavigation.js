import React from 'react';
import StatusBar from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Temp from '../screens/Temp';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import EditAccount from '../screens/EditAccount';
import MeditationList from '../screens/MeditationList';
import Meditation from '../screens/Meditation';
import Timer from '../screens/Timer';

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
      <Stack.Screen name="Temp" component={Temp} options={{ title: 'Temp', headerRight: null}}/>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerRight: null }}/>
      <Stack.Screen name="Register" component={Register} options={{ title: 'Register', headerRight: null }}/>
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Stack.Screen name="EditAccount" component={EditAccount} options={{ title: 'Edit Account'}} />
      <Stack.Screen name="MeditationList" component={MeditationList} options={{ title: 'Meditation List'}} />
      <Stack.Screen name="Meditation" component={Meditation} options={{ title: 'Meditation'}} />
      <Stack.Screen name="Timer" component={Timer} options={{ title: 'Timer'}} />
    </Stack.Navigator>
  );
};

export default StackNavigation;