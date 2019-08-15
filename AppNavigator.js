import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './Main';
import Score from './components/Score';
import AskName from './components/AskName';
const AppNavigator = createStackNavigator({
  Main: Main,
  Score: Score,
  AskName: AskName,
},
  {
    initialRouteName: 'Main',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1685f4'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

const AppNav = createAppContainer(AppNavigator);

export default AppNav;