import React, { Component } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";

import { Ionicons } from "@expo/vector-icons";

export default class SearchInput extends Component {
  static defaultProps = {
    placeholder: ""
  };

  static propTypes = {
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    text: ""
  };

  handleChangeText = text => {
    this.setState({
      text
    });
  };

  handleSubmitSearch = () => {
    this.props.onSubmit(this.state.text);
  };

  render() {
    const { placeholder } = this.props;

    return (
      <View style={styles.container}>
        <Ionicons
          name="ios-search-outline"
          size={24}
          color="#999"
          style={styles.icon}
        />
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          clearButtonMode="always"
          underlineColorAndroid="transparent"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitSearch}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: 50,
    flexDirection: "row"
  },
  textInput: {
    flex: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    fontSize: 16
  },
  icon: {
    backgroundColor: "#eee",
    paddingTop: 12,
    paddingLeft: 10
  }
});
