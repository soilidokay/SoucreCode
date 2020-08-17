import React, {PureComponent} from 'react';

import {
  FlatListContentGroup,
  FlatListContentGroupProp,
  ContentGroupProps,
} from '../_Layouts/types';
import {View, StyleSheet} from 'react-native';
import {VocabularyCategory} from 'Providers/Models/type';
export class ContentGroup extends PureComponent<ContentGroupProps> {
  private ConfigFlatList: FlatListContentGroupProp;
  constructor(props: ContentGroupProps) {
    super(props);
    // if (props.data.length % 2 !== 0) {
    //   props.data.push({Id: '', Name: '', NameVN: '', Image: ''});
    // }
    this.ConfigFlatList = {
      renderItem: ({item, index}) => {
        if (index === props.data.length - 1) {
          return this.renderLastItem(item);
        }
        return this.props.RenderItem(item, index);

        // <ItemVocabularyCategory
        //   onPressAddToList={props.onPressAddToList}
        //   onPress={() => props.onPressItem(item)}
        //   item={item}
        // />
      },
      data: props.data,
      keyExtractor: (item) => {
        return item?.Id ?? '';
      },
      numColumns: 2,
    };
  }
  renderLastItem = (item?: VocabularyCategory) => {
    return this.props.data.length % 2 === 0 ? (
      this.props.RenderItem(item)
    ) : (
      <>
        {this.props.RenderItem(item)}
        <View style={styles.EmptyItem} />
      </>
    );
  };
  render() {
    return <FlatListContentGroup {...this.ConfigFlatList} />;
  }
}

const styles = StyleSheet.create({
  EmptyItem: {
    flex: 1,
    padding: 3,
  },
});

export default ContentGroup;
