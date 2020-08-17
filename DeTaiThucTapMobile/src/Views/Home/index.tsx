import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {PropsHome, FlatListHomeProp, FlatListHome} from 'Views/type';
import HocServices from 'Providers/Services/HocServices';
import HomeService from 'Providers/Services/HomeService';
import LayoutGroup from 'Views/_Layouts/LayoutGroup';
import TitleGroup from 'Views/_Components/TitleGroup';
import ContentGroup from 'Views/_Components/ContentGroup';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {GroupCategory, VocabularyCategory} from 'Providers/Models/type';
import LayoutItemCategory from 'Views/_Layouts/LayoutItemCategory';
import ContentItemCategory from '../_Components/ContentItemCategory';
import LayoutControlBar from 'Views/_Layouts/LayoutControlBar';
import AppContext from 'Providers/Contexts/AppContext';

export class Home extends PureComponent<PropsHome> {
  private ConfigFlatList: FlatListHomeProp;
  constructor(props: PropsHome) {
    super(props);
    const {data} = props;
    this.ConfigFlatList = {
      data,
      renderItem: ({item: Group}) => {
        return (
          <LayoutGroup
            TitleComponent={
              <TitleGroup onPress={() => this.onPressMore(Group)}>
                {Group.Name}
              </TitleGroup>
            }
            Content={
              <ContentGroup
                data={Group.VocabularyCategories}
                RenderItem={(item) => this.RenderCategoryItem(item, Group)}
              />
            }
          />
        );
      },
      keyExtractor: (item) => item.Name,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: {
        paddingBottom: AppContext.HeightTabNavigate,
      },
    };
  }
  RenderCategoryItem = (
    item?: VocabularyCategory,
    Group?: GroupCategory,
  ): JSX.Element => {
    return (
      <LayoutItemCategory
        Action={
          <LayoutControlBar
            DataButton={[{icon: 'add-to-list', onPress: this.onPressAddToList}]}
          />
        }
        Content={
          <ContentItemCategory
            onPress={() => this.onPressGroupItem(Group, item)}
            item={item}
          />
        }
      />
    );
  };
  onPressGroupItem = (Group?: GroupCategory, item?: VocabularyCategory) => {
    const {navigation} = this.props;
    navigation?.navigate(KeyNavigate.CategoryDetail, {
      WordCategory: item,
      Title: item?.Name,
      IsOwner: Group?.IsOwner,
    });
  };
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
