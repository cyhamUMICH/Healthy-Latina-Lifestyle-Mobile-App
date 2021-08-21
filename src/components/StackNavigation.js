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
import ChallengeDay from '../screens/ChallengeDay'
import ChatScreen from '../screens/ChatScreen'
import ChatRoomHome from '../screens/ChatRoomHome'
import Yoga from '../screens/Yoga'
import YogaList from '../screens/YogaList'
import ShareContent from '../screens/ShareContent'
import Groups from '../screens/Groups'
import CreateRoom from '../screens/CreateRoom'
import JoinRoom from '../screens/JoinRoom'
import AddYoga from '../screens/AddYoga'
import JournalPromptList from '../screens/JournalPromptList'
import JournalEntry from '../screens/JournalEntry'
import JournalEntryList from '../screens/JournalEntryList'
import AddJournalPrompt from '../screens/AddJournalPrompt';
import PodcastList from '../screens/PodcastList';
import Podcast from '../screens/Podcast';
import AddPodcast from '../screens/AddPodcast';
import Course from '../screens/Course';
import CourseList from '../screens/CourseList';
import AddCourse from '../screens/AddCourse';
import SavedEntry from '../screens/SavedEntry';
import CourseSection from '../screens/CourseSection';

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
      <Stack.Screen name="Home" component={Home} options={{ title: 'Home'}}/>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerRight: null }}/>
      <Stack.Screen name="Register" component={Register} options={{ title: 'Register', headerRight: null }}/>
      <Stack.Screen name="EditAccount" component={EditAccount} options={{ title: 'Edit Account'}} />
      <Stack.Screen name="MeditationList" component={MeditationList} options={{ title: 'Meditations'}} />
      <Stack.Screen name="Meditation" component={Meditation} options={{ title: 'Meditation'}} />
      <Stack.Screen name="AddContent" component={AddContent} options={{title: 'Add Content'}} />
      <Stack.Screen name="SetTimer" component={SetTimer} options={{ title: 'Timer'}} />
      <Stack.Screen name="Timer" component={Timer} options={{ title: 'Timer'}} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ title: 'Reset Password', headerRight: null }}/>
      <Stack.Screen name="AddMeditation" component={AddMeditation} options={{ title: 'Add Meditation'}} />
      <Stack.Screen name="AddChallenge" component={AddChallenge} options={{ title: 'Add Challenge'}} />
      <Stack.Screen name="Challenge" component={Challenge} options={{ title: 'Challenge'}} />
      <Stack.Screen name="ChallengeList" component={ChallengeList} options={{ title: 'Challenges'}} />
      <Stack.Screen name="ChallengeDay" component={ChallengeDay} options={{ title: 'Challenge Day'}} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route}) =>({ title: route.params.thread.name })} />
      <Stack.Screen name="ChatRoomHome" component={ChatRoomHome} options={{ title: 'Chat Rooms'}} />
      <Stack.Screen name="Yoga" component={Yoga} options={{ title: 'Yoga Video'}} />
      <Stack.Screen name="YogaList" component={YogaList} options={{ title: 'Yoga Videos'}} />
      <Stack.Screen name="ShareContent" component={ShareContent} options={{ title: 'ShareContent'}} />
      <Stack.Screen name="Groups" component={Groups} options={{ title: 'Groups'}} />
      <Stack.Screen name="CreateRoom" component={CreateRoom} options={{ title: 'Create New Room', headerRight: null }}/>
      <Stack.Screen name="JoinRoom" component={JoinRoom} options={{ title: 'Join Existing Room', headerRight: null }}/>
      <Stack.Screen name="AddYoga" component={AddYoga} options={{ title: 'Add Yoga' }}/>
      <Stack.Screen name="JournalPromptList" component={JournalPromptList} options={{ title: 'Journal Prompts' }}/>
      <Stack.Screen name="JournalEntry" component={JournalEntry} options={{ title: 'Journal Entry' }}/>
      <Stack.Screen name="JournalEntryList" component={JournalEntryList} options={{ title: 'Journal Entries' }}/>
      <Stack.Screen name="AddJournalPrompt" component={AddJournalPrompt} options={{ title: 'Add Journal Prompt' }}/>
      <Stack.Screen name="PodcastList" component={PodcastList} options={{ title: 'Podcasts' }}/>
      <Stack.Screen name="Podcast" component={Podcast} options={{ title: 'Podcast' }}/>
      <Stack.Screen name="AddPodcast" component={AddPodcast} options={{ title: 'Add Podcast' }}/>
      <Stack.Screen name="CourseList" component={CourseList} options={{ title: 'Courses' }}/>
      <Stack.Screen name="Course" component={Course} options={{ title: 'Course' }}/>
      <Stack.Screen name="AddCourse" component={AddCourse} options={{ title: 'Add Course' }}/>
      <Stack.Screen name="SavedEntry" component={SavedEntry} options={{ title: 'Saved Entry' }}/>
      <Stack.Screen name="CourseSection" component={CourseSection} options={{ title: 'Course Section' }}/>

    </Stack.Navigator>
  );
};

export default StackNavigation;