import React, {PureComponent, createRef} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {PropsGroupDetail, DataControlBar} from 'Views/type';
import CategoryService from 'Providers/Services/CategoryService';
import HocServices from 'Providers/Services/HocServices';
import ContentGroup from 'Views/_Components/ContentGroup';
import {VocabularyCategory} from 'Providers/Models/type';
import {KeyNavigate} from 'Providers/Navigates/Params';
import ControlBar from './ControlBar';
import LayoutItemCategory from 'Views/_Layouts/LayoutItemCategory';
import LayoutControlBar from 'Views/_Layouts/LayoutControlBar';
import ContentItemCategory from 'Views/_Components/ContentItemCategory';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from 'assets/Colors';
import {ActionParamCategories} from 'Providers/Services/Gateways/type';
import createModelFormContent, {ModalForm} from 'Views/_Components/ModalForm';
import {Config} from 'assets/Config';

const FormCategory = createModelFormContent<VocabularyCategory>({
  Image: {
    Type: 'Image',
    option: {},
  },
  Name: {
    Type: 'Default',
    option: {},
  },
  NameVN: {Type: 'Default', option: {}},
  IsShare: {
    Type: 'CheckBox',
    option: {},
  },
});

class GroupDetail extends PureComponent<PropsGroupDetail> {
  private isOwner = false;
  private DataButton: DataControlBar[];
  private refModal = createRef<ModalForm<VocabularyCategory>>();
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
      this.DataButton.push(
        {
          icon: 'edit',
          ComponentIcon: MaterialIcons,
          onPress: this.onPressEdit,
          ColorIcon: Colors.Orange,
          ColorBorder: Colors.Orange,
        },
        {
          icon: 'delete',
          ComponentIcon: MaterialIcons,
          onPress: this.onPressDelete,
          ColorIcon: Colors.Orange,
          ColorBorder: Colors.Orange,
        },
      );
  }
  onPressGroupItem = (item?: VocabularyCategory) => {
    const {navigation} = this.props;
    navigation?.navigate(KeyNavigate.CategoryDetail, {
      WordCategory: item,
      IsOwner: this.isOwner,
    });
  };
  onPressAddToList = () => {};
  onPressDelete = async (data: VocabularyCategory) => {
    Alert.alert('Delete', `Are you sure delete "${data.Name ?? ''}"?`, [
      {
        text: 'OK',
        style: 'destructive',
        onPress: async () => {
          await CategoryService.DeleteCategory(data)
            .then(this.props.refresh)
            .catch(() => {
              Alert.alert('Deletion is Failed!');
            });
        },
      },
      {
        text: 'cancel',
        style: 'cancel',
      },
    ]);
  };
  onPressEdit = (data: VocabularyCategory) => {
    const TempData = {Image: ''} as VocabularyCategory;
    Object.assign(TempData, data);
    TempData.Image =
      Config.API_URL + Config.PATH_CATEGORY_IMAGE + data.ImageUrl;

    console.log(TempData);

    this.refModal.current?.Show({
      data: TempData,
      onSubmit: this.onSubmitEdit,
    });
  };
  onSubmitEdit = async (data: VocabularyCategory) => {
    if (typeof data.Image === 'string') {
      delete data.Image;
    }
    await CategoryService.PutCategory(data.Id, data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('Putting is Failed!');
      });
    this.refModal.current?.close();
  };
  onPressAdd = () => {
    this.refModal.current?.Show({onSubmit: this.onSubmitAdd});
  };
  componentDidMount = async () => {};

  RenderCategoryItem = (item?: VocabularyCategory): JSX.Element => {
    return (
      <LayoutItemCategory
        Action={<LayoutControlBar item={item} DataButton={this.DataButton} />}
        Content={
          <ContentItemCategory
            onPress={() =>
              this.onPressGroupItem(Object.assign({}, this.props.data, item))
            }
            item={item}
          />
        }
      />
    );
  };
  onSubmitAdd = async (data: VocabularyCategory) => {
    await CategoryService.PostCategory(data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('addition is Failed!');
      });
    this.refModal.current?.close();
  };
  render() {
    const {route} = this.props;

    return (
      <View style={styles.container}>
        <ControlBar
          title={route?.params.GroupCategory?.Name}
          onPressAdd={this.isOwner ? this.onPressAdd : undefined}
        />
        <ContentGroup
          RenderItem={this.RenderCategoryItem}
          data={this.props.data ?? []}
        />
        <FormCategory
          ref={this.refModal}
          visible={true}
          animationType={'slide'}
        />
      </View>
    );
  }
}
export default HocServices<PropsGroupDetail, ActionParamCategories>(
  GroupDetail,
  {
    ActionService: [CategoryService.GetCategories],
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
  },
});
