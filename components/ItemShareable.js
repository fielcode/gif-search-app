import React, { PureComponent } from "react";
import { TouchableOpacity, Dimensions } from "react-native";

import PropTypes from "prop-types";

import Image from "react-native-image-progress";

export default class ItemShareable extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      images: PropTypes.shape({
        fixed_height_downsampled: PropTypes.shape({
          url: PropTypes.string.isRequired
        })
      })
    }),
    onPress: PropTypes.func.isRequired
  };

  handlePress = () => {
    this.props.onPress(this.props.item);
  };

  render() {
    const { width } = Dimensions.get("window");
    const { url } = this.props.item.images.fixed_height_downsampled;

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Image
          source={{ uri: url ? url : "https://fakeimg.pl/266x200/?text=???" }}
          style={{
            width: width / 3 - 3,
            height: width / 3 - 3,
            marginTop: 3,
            marginHorizontal: 1.5
          }}
        />
      </TouchableOpacity>
    );
  }
}
