import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Share,
  ActivityIndicator,
  Platform
} from "react-native";
import { Constants } from "expo";

import { searchGifs, trendingGifs } from "./utils/api";

import SearchInput from "./components/SearchInput";
import List from "./components/List";
import Preview from "./components/Preview";

export default class App extends React.Component {
  state = {
    gifItems: [],
    text: "",
    refreshing: false,
    isTrendingSearch: true,
    offset: 0,
    previewVisible: false,
    gifSelected: null,
    embedUrl: null,
    loading: false
  };

  flatList = null;

  componentDidMount() {
    this.trendingGifs();
  }

  searchGifs = async q => {
    this.setState({ loading: this.state.gifItems.length === 0 }, async () => {
      const { offset } = this.state;
      const data = await searchGifs(q, offset);

      this.setState({
        gifItems:
          offset === 0 ? data.data : [...this.state.gifItems, ...data.data],
        refreshing: false,
        loading: false
      });
    });
  };

  trendingGifs = async () => {
    this.setState({ loading: true }, async () => {
      const data = await trendingGifs();

      this.setState({ gifItems: data.data, refreshing: false, loading: false });
    });
  };

  handlePressItem = item => {
    this.setState({
      previewVisible: true,
      gifSelected: item.images.fixed_height.url,
      embedUrl: item.embed_url
    });
  };

  handleSubmitSearch = text => {
    this.setState(
      {
        isTrendingSearch: false,
        offset: 0,
        text
      },
      () => {
        if (this.flatList) {
          this.flatList.scrollToOffset({ offset: 0 });
        }
        this.searchGifs(text);
      }
    );
  };

  handleLoadMore = () => {
    if (!this.state.isTrendingSearch) {
      this.setState(
        {
          offset: this.state.offset + 27
        },
        () => {
          this.searchGifs(this.state.text);
        }
      );
    }
  };

  handlePreviewClose = () => {
    this.setState({ previewVisible: !this.state.previewVisible });
  };

  handlePreviewShare = () => {
    const { embedUrl } = this.state;
    Share.share({
      url: embedUrl,
      message: embedUrl
    });
  };

  render() {
    const { gifItems, loading, previewVisible, gifSelected } = this.state;
    const { width } = Dimensions.get("window");

    return (
      <View style={styles.container}>
        <SearchInput
          placeholder="Procurar em GIPHY"
          onSubmit={this.handleSubmitSearch}
        />
        {loading && (
          <ActivityIndicator size="large" style={{ marginTop: 15 }} />
        )}
        <List
          reference={flatList => (this.flatList = flatList)}
          items={gifItems}
          onPressItem={this.handlePressItem}
          onLoadMore={this.handleLoadMore}
        />
        <Preview
          visible={previewVisible}
          imageUri={gifSelected}
          onShare={this.handlePreviewShare}
          onClose={this.handlePreviewClose}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
});
