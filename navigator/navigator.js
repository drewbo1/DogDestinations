import Home from "../screens/Home";
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import MapTest from "../screens/Map";
import More from "../screens/More";
import Search from "../screens/Search";
import SignUp from "../screens/SignUp";
import Add from "../screens/Add";
import CardInfo from "../screens/CardInfo";
import Alerts from "../screens/Alerts";
import Events from "../screens/Events";
import Profile from "../screens/Profile";
import PasswordReset from "../screens/PasswordReset";
import React from "react";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginStack = createStackNavigator(
  {
    Login: Login,
    PasswordReset: PasswordReset
  },
  { headerMode: "none" }
);

const AuthTabNavigator = createBottomTabNavigator(
  {
    SignUp: SignUp,
    Login: LoginStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;

        if (routeName === "Login") {
          iconName = `ios-log-in`;
        } else if (routeName === "SignUp") {
          iconName = `ios-add-circle`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

const HomeStack = createStackNavigator({
  Home: Home,
  CardInfo: CardInfo,
  Add: Add
});

const MapStack = createStackNavigator({
  Map: MapTest,
  Add: Add
});

const SearchStack = createStackNavigator({
  Search: Search,
  Add: Add
});

const MoreStack = createStackNavigator({
  More: More,
  Alerts: Alerts,
  Events: Events,
  Profile: Profile,
  Add: Add
});

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Map: {
      screen: MapStack
    },
    Search: {
      screen: SearchStack
    },
    More: {
      screen: MoreStack
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Map") {
          iconName = `ios-map`;
        } else if (routeName === "Search") {
          iconName = `ios-search`;
        } else if (routeName === "More") {
          iconName = `ios-more`;
        }
        if (routeName === "Login") {
          iconName = `ios-log-in`;
        } else if (routeName === "SignUp") {
          iconName = `ios-add-circle`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

const RootSwitch = createSwitchNavigator(
  {
    Loading: Loading,
    Login: AuthTabNavigator,
    Home: MainTabNavigator
  },
  {
    initialRouteName: "Loading"
  }
);

const App = createAppContainer(RootSwitch);

export default App;