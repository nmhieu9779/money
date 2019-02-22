import React from "react"
import { TouchableOpacity, Text, AsyncStorage, ScrollView } from "react-native"
import AddTransactionsScreen from "../TransactionsScreen/AddTransactionsScreen"
import HistoryScreen from "../HistoryScreen/HistoryScreen"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import {
  createBottomTabNavigator,
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
        color="#203546"
        size={30}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlignVertical: "center",
          color: "#203546"
        }}
      >
        {props.textName}
      </Text>
    </TouchableOpacity>
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

const HistoryScreen_StackNavigator = createStackNavigator({
  HistoryScreen: {
    screen: HistoryScreen,
    props: { history: "aaa" }
  }
})
const AddTransactionsScreen_StackNavigator = createStackNavigator({
  AddTransactionsScreen: {
    screen: AddTransactionsScreen
  }
})

const BottomAppContainer = createAppContainer(
  createBottomTabNavigator({
    HistoryScreen: { screen: HistoryScreen_StackNavigator },
    AddTransactionsScreen: { screen: AddTransactionsScreen_StackNavigator }
  }),
  {
    initialRouteName: "HistoryScreen_StackNavigator",
    tabBarOptions: {
      activeTintColor: "#e91e63",
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: "blue"
      }
    }
  }
)

export default BottomAppContainer
