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
import Timer from '../screens/Timer';
import PasswordReset from '../screens/PasswordReset';
import AddMeditation from '../screens/AddMeditation'

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
      <Stack.Screen name="Timer" component={Timer} options={{ title: 'Timer'}} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ title: 'Reset Password', headerRight: null }}/>
      <Stack.Screen name="AddMeditation" component={AddMeditation} options={{ title: 'Add Meditation'}} />
    </Stack.Navigator>
  );
};

export default StackNavigation;