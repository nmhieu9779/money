import React from "react"
import { TouchableOpacity, Text, AsyncStorage, ScrollView } from "react-native"
import AddTransactionsScreen from "../TransactionsScreen/AddTransactionsScreen"
import HistoryScreen from "../HistoryScreen/HistoryScreen"
import HistoryContainer from "../containers/HistoryContainer"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import CategoryContainer from "../containers/CategoryContainer"
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation"

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
    screen: HistoryContainer
  }
})
const AddTransactionsScreen_StackNavigator = createStackNavigator({
  AddTransactionsScreen: {
    screen: AddTransactionsScreen
  },
  CategoryScreen: {
    screen: CategoryContainer,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { ...styles.headerStyle },
      headerTintColor: "white",
      headerTitle: "Select category",
      headerTitleStyle: [{ ...styles.headerTitleStyle, paddingRight: 0 }]
    })
  }
})

const BottomAppContainer = createAppContainer(
  createBottomTabNavigator({
    HistoryScreen: {
      screen: HistoryScreen_StackNavigator
    },
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
