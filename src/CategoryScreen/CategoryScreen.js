import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList
} from "react-native"
import CollapseView from "../Component/Collapse"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import firebase from "../../Firebase"
import Spinner from "../Component/LoadingHud"

export default class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => (
    (onPressAddCategory = () => {
      console.log("add")
    }),
    {
      headerRight: (
        <FontAwesome5
          style={styles.btnAdd}
          onPress={this.onPressAddCategory.bind(this)}
          size={20}
          name={"plus"}
        />
      )
    }
  )

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => this.setState({ showHud: true })

  componentDidMount = () => {
    let me = this
    category = firebase
      .firestore()
      .collection("category")
      .get()
      .then(function(querySnapshot) {
        me.setState({
          category: querySnapshot.docs.map(item => ({
            data: item.data(),
            key: item.id
          }))
        })
      })
      .finally(() =>
        setTimeout(() => {
          this.setState({ showHud: false })
        }, 600)
      )
      .catch(error => console.log(error))
  }

  _renderCollapseView = data => {
    return (
      <View style={styles.collapseView}>
        {data.map(item => this.itemBody(item))}
      </View>
    )
  }

  itemBody = item => (
    <TouchableOpacity activeOpacity={1} style={styles.headerCollapseContainer}>
      <View style={styles.iconHeaderContainer}>
        <FontAwesome5 size={20} name={item.icon} />
      </View>
      <Text style={styles.titleHeader}>{item.name}</Text>
    </TouchableOpacity>
  )

  _renderView = (collapse, title, icon) => {
    return (
      <View style={styles.headerCollapseContainer}>
        <View style={styles.iconHeaderContainer}>
          <FontAwesome5 size={20} name={this.getIcon(icon)} />
        </View>
        <Text style={styles.titleHeader}>{title}</Text>
        {this.renderDrop(collapse)}
      </View>
    )
  }

  renderDrop = status =>
    status ? (
      <FontAwesome5 size={20} name={"caret-down"} />
    ) : (
      <FontAwesome5 size={20} name={"caret-up"} />
    )

  getIcon = icon => {
    switch (icon) {
      case "food-and-dining":
        return "utensils"
      case "utilities":
        return "space-shuttle"
      case "personal":
        return "users"
      case "home":
        return "home"
      case "health-and-fitness":
        return "briefcase-medical"
      case "gifts-and-donations":
        return "gifts"
      case "entertainment":
        return "suitcase"
      case "clothing":
        return "tshirt"
      case "auto-and-transport":
        return "map-marked-alt"
      default:
        return "question"
    }
  }

  // AddCategory() {
  //   return (
  //     <Dialog
  //       onTouchOutside={() => {
  //         this.setState({ scaleAnimationDialog: false })
  //       }}
  //       width={0.9}
  //       visible={scaleAnimationDialog}
  //       dialogAnimation={new ScaleAnimation()}
  //     >
  //       <ScrollView>
  //         <DialogTitle
  //           textStyle={historyMeetingHeader}
  //           title="Add expense category"
  //           hasTitleBar={true}
  //         />
  //         <DialogContent>
  //           <View style={{ flex: 1 }} />
  //         </DialogContent>
  //         <DialogButton
  //           text="Close"
  //           // onPress={this.onPress.bind(this)}
  //           key="button-1"
  //         />
  //       </ScrollView>
  //     </Dialog>
  //   )
  // }

  render() {
    let me = this
    return (
      <View style={styles.categoryContainer}>
        <Spinner
          visible={this.state.showHud}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />

        <FlatList
          data={this.state.category}
          renderItem={({ item }) => (
            <CollapseView
              renderView={me._renderView}
              renderCollapseView={this._renderCollapseView}
              title={item.data.name}
              icon={item.key}
              dataBody={item.data.data}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#009688"
  },
  headerCollapseContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    marginLeft: 10,
    marginRight: 10
  },
  iconHeaderContainer: {
    backgroundColor: "#ccc",
    borderRadius: 999,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  titleHeader: {
    flex: 1,
    color: "black",
    textAlign: "left"
  },
  collapseView: {
    marginLeft: 40
  },
  iconView: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff"
  },
  btnAdd: { color: "white", marginRight: 10 }
})
