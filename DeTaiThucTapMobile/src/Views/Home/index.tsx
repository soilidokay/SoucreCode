import React, {PureComponent, createRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {PropsHome, FlatListHomeProp, FlatListHome} from 'Views/type';
import HocServices from 'Providers/Services/HocServices';
import HomeService from 'Providers/Services/HomeService';
import LayoutGroup from 'Views/_Layouts/LayoutGroup';
import TitleGroup from 'Views/_Components/TitleGroup';
import ContentGroup from 'Views/_Components/ContentGroup';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {
  GroupCategory,
  VocabularyCategory,
  LearningGoal,
} from 'Providers/Models/type';
import LayoutItemCategory from 'Views/_Layouts/LayoutItemCategory';
import ContentItemCategory from '../_Components/ContentItemCategory';
import LayoutControlBar from 'Views/_Layouts/LayoutControlBar';
import AppContext from 'Providers/Contexts/AppContext';
import LearningGoalService from 'Providers/Services/LearningGoalService';
import {MenuModel} from 'Views/_Components/MenuModel';
import {Text} from 'react-native-elements';

export class Home extends PureComponent<PropsHome> {
  private ConfigFlatList: FlatListHomeProp;
  private refMenu = createRef<MenuModel>();
  constructor(props: PropsHome) {
    super(props);
    const {data, navigation} = props;
    navigation?.addListener('focus', this.onFocus);
    this.ConfigFlatList = {
      data: data ? data[0] : [],
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
  onFocus = () => {
    this.props.refresh();
  };
  RenderCategoryItem = (
    item?: VocabularyCategory,
    Group?: GroupCategory,
  ): JSX.Element => {
    return (
      <LayoutItemCategory
        Action={
          <LayoutControlBar
            DataButton={[
              {icon: 'add-to-list', onPress: () => this.onPressAddToList(item)},
            ]}
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
      IsOwner: Group?.IsOwner,
    });
  };
  renderItemMenu = ({item}: {item: LearningGoal; index: number}) => {
    return <Text style={styles.textMenu}>{item.Name}</Text>;
  };
  onPressAddToList = (Category?: VocabularyCategory) => {
    const {data} = this.props;
    this.refMenu.current?.Show({
      data: data ? data[1] : [],
      renderItem: this.renderItemMenu,
      onSubmit: async (item: LearningGoal) => {
        await LearningGoalService.PostCategoryToLearningGoal({
          CategoryId: Category?.Id ?? '',
          LearningGoalId: item.Id,
        });
      },
    });
  };
  onPressMore = (item: GroupCategory) => {
    const {navigation} = this.props;
    navigation?.navigate(KeyNavigate.GroupDetail, {
      GroupCategory: item,
    });
  };
  componentWillUnmount() {
    this.props.navigation?.removeListener('focus', this.onFocus);
  }
  render() {
    const {theme} = this.props;

    return (
      <View style={theme?.containerStyle}>
        <FlatListHome {...this.ConfigFlatList} />
        <MenuModel ref={this.refMenu} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textMenu: {
    textAlign: 'center',
  },
});
export default HocServices<PropsHome>(Home, {
  ActionService: [
    HomeService.GetGroupCategories,
    LearningGoalService.GetLearningGoals,
  ],
});
