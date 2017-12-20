import React, { Component } from "react";
import { FlatList } from "react-native";

import PropTypes from "prop-types";

import ItemShareable from "./ItemShareable";

export default class List extends Component {
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
    return (
      <FlatList
        ref={this.ref}
        data={this.props.items}
        numColumns={3}
        renderItem={({ item }) => (
          <ItemShareable item={item} onPress={this.handlePressItem} />
        )}
        keyExtractor={item => item.id}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
