import React, {PureComponent} from 'react';

import {
  ContentCategoryProps,
  FlatListContentCategory,
  FlatListContentCategoryHomeProp,
} from './types';
import ItemVocabulary from './ItemVocabulary';

export class ContentCategory extends PureComponent<ContentCategoryProps> {
  private ConfigFlatList: FlatListContentCategoryHomeProp;
  constructor(props: ContentCategoryProps) {
    super(props);
    this.ConfigFlatList = {
      renderItem: ({item}) => {
        return <ItemVocabulary item={item} />;
      },
      data: props.data,
      keyExtractor: (item) => {
        return item.Id;
      },
    };
  }
  render() {
    return <FlatListContentCategory {...this.ConfigFlatList} />;
  }
}

export default ContentCategory;
