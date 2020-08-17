import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {PropsGroupDetail, DataControlBar} from 'Views/type';
import GroupDetailService from 'Providers/Services/GroupDetailService';
import HocServices from 'Providers/Services/HocServices';
import {IVocabularyCategoriesParamRequest} from 'Providers/Services/type';
import ContentGroup from 'Views/_Components/ContentGroup';
import {VocabularyCategory} from 'Providers/Models/type';
import {KeyNavigate} from 'Providers/Navigates/Params';
import ControlBar from './ControlBar';
import LayoutItemCategory from 'Views/_Layouts/LayoutItemCategory';
import LayoutControlBar from 'Views/_Layouts/LayoutControlBar';
import ContentItemCategory from 'Views/_Components/ContentItemCategory';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from 'assets/Colors';
class GroupDetail extends PureComponent<PropsGroupDetail> {
  private isOwner = false;
  private DataButton: DataControlBar[];
  constructor(props: PropsGroupDetail) {
    super(props);
    const {route} = props;
    this.isOwner = route?.params.GroupCategory?.IsOwner ?? false;
    this.DataButton = [
      {
        icon: 'add-to-list',
        onPress: this.onPressAddToList,
      },
    ];
    this.isOwner &&
      this.DataButton.push({
        icon: 'delete',
        ComponentIcon: MaterialIcons,
        onPress: this.onPressDelete,
        ColorIcon: Colors.Orange,
        ColorBorder: Colors.Orange,
      });
  }
  onPressGroupItem = (item?: VocabularyCategory) => {
    const {navigation} = this.props;
    navigation?.navigate(KeyNavigate.CategoryDetail, {
      WordCategory: item,
      Title: item?.Name,
      IsOwner: this.isOwner,
    });
  };
  onPressAddToList = () => {};
  onPressDelete = () => {};
  onPressAdd = () => {};
  componentDidMount = async () => {};

  RenderCategoryItem = (item?: VocabularyCategory): JSX.Element => {
    return (
      <LayoutItemCategory
        Action={<LayoutControlBar DataButton={this.DataButton} />}
        Content={
          <ContentItemCategory
            onPress={() => this.onPressGroupItem(item)}
            item={item}
          />
        }
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.isOwner && <ControlBar onPressAdd={this.onPressAdd} />}
        <ContentGroup
          RenderItem={this.RenderCategoryItem}
          data={this.props.data ?? []}
        />
      </View>
    );
  }
}
export default HocServices<PropsGroupDetail, IVocabularyCategoriesParamRequest>(
  GroupDetail,
  {
    ActionService: [GroupDetailService.GetVocabularyCategories],
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
  },
});
