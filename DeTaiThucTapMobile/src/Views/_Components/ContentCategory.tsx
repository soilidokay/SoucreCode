import React, {PureComponent} from 'react';

import {
  ContentCategoryProps,
  FlatListContentCategory,
  FlatListContentCategoryHomeProp,
} from '../_Layouts/types';
import ItemVocabulary from './ItemVocabulary';

export class ContentCategory extends PureComponent<ContentCategoryProps> {
  private ConfigFlatList: FlatListContentCategoryHomeProp;
  constructor(props: ContentCategoryProps) {
    super(props);
    this.ConfigFlatList = {
      renderItem: ({item, index}) => {
        return props.renderItem(item, index);
      },
      data: props.data,
      keyExtractor: (item) => {
        return item.Id;
      },
      showsVerticalScrollIndicator: false,
    };
  }
  static defaultProps: ContentCategoryProps = {
    data: [],
    renderItem: (item) => {
      return <ItemVocabulary item={item} />;
    },
  };
  render() {
    return <FlatListContentCategory {...this.ConfigFlatList} />;
  }
}

export default ContentCategory;
