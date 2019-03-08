import React from "react"
import { TouchableOpacity, Text, AsyncStorage, ScrollView } from "react-native"
import HomeScreen from "../HomeScreen/HomeScreen"
import HomeContainer from "../containers/HomeContainer"
import LoginScreen from "../LoginScreen/LoginScreen"
import SplashScreen from "../SplashScreen/SplashScreen"
import RegistrationScreen from "../RegistrationScreen/RegistrationScreen"
import CategoryContainer from "../containers/CategoryContainer"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  withNavigationFocus,
  createSwitchNavigator
} from "react-navigation"

import Icon from "react-native-vector-icons/FontAwesome"

function NavigationDrawerStructure(props) {
  toggleDrawer = () => {
    props.navigationProps.toggleDrawer()
  }
  return (
    <Icon
      style={styles.iconLeft}
      name="bars"
      color="white"
      size={30}
      onPress={this.toggleDrawer.bind(this)}
    />
  )
}

function ItemMenu(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ flexDirection: "row" }}>
      <Icon
        style={{ padding: 10, width: 60 }}
        name={props.iconName}
        color={props.color}
        size={30}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlignVertical: "center",
          color: props.color
        }}
      >
        {props.textName}
      </Text>
    </TouchableOpacity>
  )
}

function DrawerMenu(props) {
  onPressHome = () => {
    props.navigation.navigate("HomeScreen")
  }

  onPressLogout = () => {
    this._logoutAsync()
  }

  _logoutAsync = async () => {
    await AsyncStorage.clear()
    props.navigation.navigate("loginStack")
  }

  getColor = index =>
    props.navigation.state.index === index ? "blue" : "black"

  return (
    <ScrollView>
      <ItemMenu
        color={this.getColor(0)}
        iconName={"home"}
        textName={"Home"}
        onPress={this.onPressHome.bind(this)}
      />
      <ItemMenu
        color={this.getColor(1)}
        iconName={"sign-out"}
        textName={"Logout"}
        onPress={this.onPressLogout.bind(this)}
      />
    </ScrollView>
  )
}

const styles = {
  iconLeft: { padding: 10, width: 60 },
  btnCancel: { color: "white", fontSize: 15, paddingRight: 10, width: 60 },
  headerTitleStyle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: 50
  },
  headerStyle: {
    backgroundColor: "#329BFF"
  }
}

const HomeScreen_StackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeContainer,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: { ...styles.headerStyle },
      headerTintColor: "white",
      headerTitle: "Home",
      headerTitleStyle: { ...styles.headerTitleStyle }
    })
  }
})

const DrawerStack = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen_StackNavigator
    }
  },
  {
    initialRouteName: "HomeScreen",
    contentComponent: DrawerMenu
  }
)

const DrawerNavigation = createStackNavigator(
  {
    DrawerStack: { screen: DrawerStack }
  },
  { headerMode: "none" }
)

const LoginStack = createStackNavigator(
  {
    loginScreen: { screen: LoginScreen },
    registrationScreen: { screen: RegistrationScreen }
  },
  { headerMode: "none" }
)

const AppContainer = createAppContainer(
  createSwitchNavigator({
    authLoading: { screen: SplashScreen },
    drawerStack: { screen: DrawerStack },
    loginStack: { screen: LoginStack }
  }),
  {
    initialRouteName: "authLoading",
    headerMode: "none"
  }
)

export default AppContainer
