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
import Spinner from "../Component/LoadingHud"
import AddCategoryScreen from "./AddCategoryScreen"
import EditCategoryScreen from "./EditCategoryScreen"
export default class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => (
    (onPressAddCategory = () => {
      me.setModalVisible(true)
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
    me = this
    this.state = {
      visibleEdit: false,
      visible: false,
      listParentCategory: [],
      editCategory: { item: { icon: "", name: "" }, key: "" },
      showHud: false
    }
  }

  setModalVisible(visible) {
    this.setState({ visible: visible })
  }

  componentWillMount = () => this.setState({ showHud: true })

  componentDidMount() {
    this.getCategoryFromSever()
  }

  componentDidUpdate = prevProps => {
    if (prevProps.data.category != this.props.data.category) {
      this.setState({ showHud: false })
    }
  }

  getCategoryFromSever = () => {
    this.props.onFetchCategory()
  }

  _renderCollapseView = (data, key) => (
    <View style={styles.collapseView}>
      {data.map(item => this.itemBody(item, key))}
    </View>
  )

  itemBody = (item, key) => {
    return (
      <TouchableOpacity
        key={item.icon}
        activeOpacity={1}
        style={styles.headerCollapseContainer}
        onPress={() => {
          const { params } = this.props.navigation.state
          const { goBack } = this.props.navigation
          goBack()
          params.chooseCategory(item)
        }}
      >
        <View style={styles.iconHeaderContainer}>
          <FontAwesome5 size={20} name={item.icon} />
        </View>
        <Text style={styles.titleHeader}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => {
            this.onPressEdit(item, key)
          }}
          style={styles.btnEditContainer}
        >
          <FontAwesome5 size={20} name={"pen"} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  onPressEdit = (item, key) =>
    this.setState({ editCategory: { item, key: key }, visibleEdit: true })

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
      case "income":
        return "plus-circle"
      default:
        return "question"
    }
  }

  addCategoryScreen = visible => {
    if (visible) {
      return (
        <AddCategoryScreen
          visible={visible}
          onPressClose={() => {
            this.setState({ visible: false })
          }}
          listParentCategory={this.props.data.listParentCategory}
          onPressAddCategory={this.onPressAddCategory.bind(this)}
        />
      )
    }
    return null
  }

  onPressAddCategory = async newCategory => {
    await this.setState({ showHud: true })
    await this.props.onAddCategory(newCategory)
    await this.setState({ visible: false })
  }

  editCategoryScreen = visibleEdit => {
    if (visibleEdit) {
      return (
        <EditCategoryScreen
          visible={visibleEdit}
          onPressClose={() => {
            this.setState({ visibleEdit: false })
          }}
          editCategory={this.state.editCategory}
          listParentCategory={this.props.data.listParentCategory}
          onPressEditCategory={this.onPressEditCategory.bind(this)}
          onPressDeleteCategory={this.onPressDeleteCategory.bind(this)}
        />
      )
    }
    return null
  }

  onPressEditCategory = async (dataNew, dataOld) => {
    await this.setState({ showHud: true })
    await this.props.onEditCategory(dataNew, dataOld)
    await this.setState({ visibleEdit: false })
  }

  onPressDeleteCategory = async category => {
    await this.setState({ showHud: true })
    await this.props.onDeleteCategory(category)
    await this.setState({ visibleEdit: false })
  }

  showHud = showHud => {
    if (showHud) {
      return (
        <Spinner
          visible={showHud}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      )
    }
    return null
  }

  render() {
    let me = this
    return (
      <View style={styles.categoryContainer}>
        {this.showHud(this.state.showHud)}
        {this.addCategoryScreen(this.state.visible)}
        {this.editCategoryScreen(this.state.visibleEdit)}
        <FlatList
          data={this.props.data.category}
          renderItem={({ item }) => (
            <CollapseView
              renderView={me._renderView}
              renderCollapseView={this._renderCollapseView}
              title={item.data.name}
              icon={item.key}
              dataBody={item.data.data}
            />
          )}
          keyExtractor={item => item.key}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  categoryContainer: {
    // flex: 1
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
  btnAdd: { color: "white", marginRight: 10 },
  btnEditContainer: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  }
})
