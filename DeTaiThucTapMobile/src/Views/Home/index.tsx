import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {PropsHome, FlatListHomeProp, FlatListHome} from 'Views/type';
import HocServices from 'Providers/Services/HocServices';
import HomeService from 'Providers/Services/HomeService';
import LayoutGroup from 'Views/Layouts/LayoutGroup';
import TitleGroup from 'Views/Layouts/TitleGroup';
import ContentGroup from 'Views/Layouts/ContentGroup';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {GroupCategory} from 'Providers/Models/type';

export class Home extends PureComponent<PropsHome> {
  private ConfigFlatList: FlatListHomeProp;
  constructor(props: PropsHome) {
    super(props);
    const {data} = props;

    this.ConfigFlatList = {
      data,
      renderItem: ({item}) => {
        return (
          <LayoutGroup
            TitleComponent={
              <TitleGroup onPressMore={() => this.onPressMore(item)}>
                {item.Name}
              </TitleGroup>
            }
            Content={
              <ContentGroup
                onPressItem={this.onPressGroupItem}
                onPressAddToList={this.onPressAddToList}
                data={item.VocabularyCategories}
              />
            }
          />
        );
      },
      keyExtractor: (item) => item.Name,
      showsVerticalScrollIndicator: false,
    };
  }
  onPressGroupItem = () => {};
  onPressAddToList = () => {};
  onPressMore = (item: GroupCategory) => {
    const {navigation} = this.props;
    navigation?.navigate(KeyNavigate.GroupDetail, {
      GroupCategory: item,
      Title: item.Name,
    });
  };
  render() {
    const {theme} = this.props;

    return (
      <View style={theme?.containerStyle}>
        <FlatListHome {...this.ConfigFlatList} />
      </View>
    );
  }
}

export default HocServices<PropsHome>(Home, {
  ActionService: [HomeService.GetGroupCategories],
});
