import React, { PureComponent } from "react";
import { FlatList, Dimensions } from "react-native";

import PropTypes from "prop-types";

import ItemShareable from "./ItemShareable";

export default class List extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onPressItem: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func,
    reference: PropTypes.func
  };

  ref = flatList => {
    const { reference } = this.props;

    if (reference && flatList) {
      reference(flatList);
    }
  };

  handlePressItem = item => {
    this.props.onPressItem(item);
  };

  handleLoadMore = () => {
    const { onLoadMore } = this.props;

    if (onLoadMore) {
      onLoadMore();
    }
  };

  render() {
    const { width } = Dimensions.get("window");

    return (
      <FlatList
        ref={this.ref}
        data={this.props.items}
        numColumns={3}
        renderItem={({ item }) => (
          <ItemShareable item={item} onPress={this.handlePressItem} />
        )}
        keyExtractor={item => item.id}
        getItemLayout={(data, index) => ({
          length: width / 3 - 3,
          offset: (width / 3 - 3) * index,
          index
        })}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
