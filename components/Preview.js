import React, { Component } from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Constants } from "expo";

import { Ionicons } from "@expo/vector-icons";

import Image from "react-native-image-progress";

export default class Preview extends Component {
  static propTypes = {
    imageUri: PropTypes.string,
    onClose: PropTypes.func,
    onShare: PropTypes.func,
    visible: PropTypes.bool
  };

  handleClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  handleShare = () => {
    const { onShare } = this.props;
    if (onShare) {
      onShare();
    }
  };

  render() {
    const { visible, imageUri } = this.props;

    return (
      <Modal visible={visible} onRequestClose={this.handleClose}>
        <View style={styles.modal}>
          <Image
            source={{
              uri: imageUri
            }}
            style={{
              width: 266,
              height: 200
            }}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={this.handleClose}
            style={styles.modalCloseButton}
          >
            <Ionicons name="ios-close-circle-outline" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleShare}
            style={styles.modalShareButton}
          >
            <Ionicons name="ios-share-outline" size={32} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  modalCloseButton: {
    position: "absolute",
    top: 5,
    right: 8
  },
  modalShareButton: {
    position: "absolute",
    top: 5,
    left: 8
  }
});
