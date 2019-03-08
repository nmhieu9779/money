import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import TransactionContainer from "../containers/TransactionContainer"
import HistoryContainer from "../containers/HistoryContainer"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import CategoryContainer from "../containers/CategoryContainer"
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation"

const styles = {
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
  tabBarMenuContainer: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
    borderTopWidth: 0.5,
    flexDirection: "row"
  },
  itemMenuContainer: { flex: 1, alignItems: "center", justifyContent: "center" }
}

function ItemMenu(props) {
  return (
    <TouchableOpacity style={styles.itemMenuContainer} onPress={props.onPress}>
      <FontAwesome5 color={props.color} name={props.nameIcon} />
      <Text style={{ color: props.color }}>{props.name}</Text>
    </TouchableOpacity>
  )
}

function tabBarMenu(props) {
  onPressDashboard = () => props.navigation.navigate("HistoryScreen")
  onPressAddTransactions = () =>
    props.navigation.navigate("AddTransactionsScreen")

  getColor = index =>
    props.navigation.state.index === index ? "blue" : "black"

  return (
    <View style={styles.tabBarMenuContainer}>
      <ItemMenu
        color={this.getColor(0)}
        nameIcon={"home"}
        name={"Dashboard"}
        onPress={this.onPressDashboard.bind(this)}
      />
      <ItemMenu
        color={this.getColor(1)}
        nameIcon={"plus"}
        name={"Add"}
        onPress={this.onPressAddTransactions.bind(this)}
      />
    </View>
  )
}

const HistoryScreen_StackNavigator = createStackNavigator({
  HistoryScreen: {
    screen: HistoryContainer
  }
})
const AddTransactionsScreen_StackNavigator = createStackNavigator({
  AddTransactionsScreen: {
    screen: TransactionContainer
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
  createBottomTabNavigator(
    {
      HistoryScreen: {
        screen: HistoryScreen_StackNavigator
      },
      AddTransactionsScreen: { screen: AddTransactionsScreen_StackNavigator }
    },
    {
      tabBarComponent: tabBarMenu
    }
  )
)

export default BottomAppContainer
