import React from "react"
import {
  TouchableOpacity,
  Text,
  AsyncStorage,
  ScrollView,
  View
} from "react-native"
import HomeScreen from "../HomeScreen/HomeScreen"
import HomeContainer from "../containers/HomeContainer"
import LoginScreen from "../LoginScreen/LoginScreen"
import SplashScreen from "../SplashScreen/SplashScreen"
import RegistrationScreen from "../RegistrationScreen/RegistrationScreen"
import CategoryContainer from "../containers/CategoryContainer"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import UserProfileScreen from "../UserProfileScreen/UserProfileScreen"
import UserProfileContainer from "../containers/UserProfileContainer"
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
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.line, styles.itemMenuContainer]}
    >
      <Icon
        style={{ padding: 10, width: 60 }}
        name={props.iconName}
        color={props.color}
        size={30}
      />
      <Text
        style={[
          styles.labelItemMenu,
          {
            color: props.color
          }
        ]}
      >
        {props.textName}
      </Text>
    </TouchableOpacity>
  )
}

function UserProfile(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.line, styles.userProfileContainer]}
    >
      <View style={styles.avatarContainer}>
        <FontAwesome5 size={30} name={"user"} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoName}>{props.name}</Text>
        <Text style={styles.infoId}>{"@" + props.id}</Text>
      </View>
    </TouchableOpacity>
  )
}

function DrawerMenu(props) {
  onPressHome = () => {
    props.navigation.navigate("HomeScreen")
  }

  onPressUserProfile = () => props.navigation.navigate("UserProfileScreen")

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
    <View style={{ flex: 1 }}>
      <UserProfile
        onPress={this.onPressUserProfile.bind(this)}
        name={"Nguyễn Minh Hiếu"}
        id={"nmhieu9779"}
      />
      <ScrollView>
        <ItemMenu
          color={this.getColor(0)}
          iconName={"home"}
          textName={"Home"}
          onPress={this.onPressHome.bind(this)}
        />
      </ScrollView>
      <ItemMenu
        color={this.getColor(1)}
        iconName={"sign-out"}
        textName={"Logout"}
        onPress={this.onPressLogout.bind(this)}
      />
    </View>
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
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5
  },
  itemMenuContainer: {
    flexDirection: "row"
  },
  labelItemMenu: {
    fontSize: 18,
    fontWeight: "bold",
    textAlignVertical: "center"
  },
  userProfileContainer: {
    flexDirection: "row",
    height: 120
  },
  avatarContainer: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    borderColor: "#ccc",
    borderWidth: 0.5,
    margin: 10
  },
  infoContainer: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "center"
  },
  infoName: {
    color: "black",
    fontWeight: "bold",
    fontSize: 17
  },
  infoId: {
    fontStyle: "italic"
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

const UserProfileScreen_StackNavigator = createStackNavigator({
  UserProfile: {
    screen: UserProfileContainer,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: { ...styles.headerStyle },
      headerTintColor: "white",
      headerTitle: "Personal information",
      headerTitleStyle: { ...styles.headerTitleStyle }
    })
  }
})

const DrawerStack = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen_StackNavigator
    },
    UserProfileScreen: {
      screen: UserProfileScreen_StackNavigator
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
