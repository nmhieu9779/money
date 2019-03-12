import React from "react"
import {
  TouchableOpacity,
  Text,
  AsyncStorage,
  ScrollView,
  View,
  Image
} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Icon from "react-native-vector-icons/FontAwesome"

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
      <View style={styles.avatarContainer}>{props.getAvatar}</View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoName}>{props.name}</Text>
        <Text style={styles.infoId}>{"@" + props.id}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default class DrawerMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  getAvatar = () => {
    if (!!this.props.data.avatar) {
      let uri = this.props.data.avatar
      return <Image style={styles.avatar} source={{ uri: uri }} />
    } else {
      return <FontAwesome5 size={30} name={"user"} />
    }
  }

  onPressHome = () => {
    this.props.navigation.navigate("HomeScreen")
  }

  onPressUserProfile = () => this.props.navigation.navigate("UserProfileScreen")

  onPressLogout = () => {
    this._logoutAsync()
  }

  _logoutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate("loginStack")
    this.props.onFetch()
  }

  getColor = index =>
    this.props.navigation.state.index === index ? "blue" : "black"

  render() {
    console.log(this.props)
    return (
      <View style={{ flex: 1 }}>
        <UserProfile
          onPress={this.onPressUserProfile.bind(this)}
          name={this.props.data.nameDisplay}
          id={"nmhieu9779"}
          getAvatar={this.getAvatar()}
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
  },
  avatar: { width: "100%", height: "100%", borderRadius: 999 }
}
