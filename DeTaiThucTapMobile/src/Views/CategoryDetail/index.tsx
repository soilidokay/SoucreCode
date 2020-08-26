import React, {PureComponent, createRef} from 'react';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {PropsCategoryDetail} from 'Views/type';
import VocabularyService from 'Providers/Services/VocabularyService';
import HocServices from 'Providers/Services/HocServices';
import ContentCategory from 'Views/_Components/ContentCategory';
import {Vocabulary} from 'Providers/Models/type';
import LayoutItemVocabulary from 'Views/_Layouts/LayoutItemVocabulary';
import ViewIcon from 'Views/_Components/ViewIcon';
import Colors from 'assets/Colors';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ControlBar from 'Views/GroupDetail/ControlBar';
import {ActionParamVocabularies} from 'Providers/Services/Gateways/type';
import createModelFormContent, {ModalForm} from 'Views/_Components/ModalForm';
import {Config} from 'assets/Config';
import {KeyNavigate} from 'Providers/Navigates/Params';

const FormVocabulary = createModelFormContent<Vocabulary>({
  Image: {
    Type: 'Image',
    option: {},
  },
  Word: {
    Type: 'Default',
    option: {},
  },
  WordVN: {Type: 'Default', option: {}},
  IsShare: {
    Type: 'CheckBox',
    option: {},
  },
});

class CategoryDetail extends PureComponent<PropsCategoryDetail> {
  private refModal = createRef<ModalForm<Vocabulary>>();
  private isOwner = false;
  constructor(props: PropsCategoryDetail) {
    super(props);
    const {route} = props;
    this.isOwner = route?.params.IsOwner ?? false;
  }
  onPressItem = (item: Vocabulary) => {
    const {navigation} = this.props;
    navigation?.navigate(KeyNavigate.VocabularyDetail, {
      Vocabulary: item,
      IsOwner: this.isOwner,
    });
  };
  onPressAddToList = () => {};
  componentDidMount = async () => {};
  onPressDelete = (data: Vocabulary) => {
    Alert.alert('Delete', `Are you sure delete "${data.Word ?? ''}"?`, [
      {
        text: 'OK',
        style: 'destructive',
        onPress: async () => {
          await VocabularyService.DeleteVocabulary(data)
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
  onPressEdit = (data: Vocabulary) => {
    const TempData = {Image: ''} as Vocabulary;
    Object.assign(TempData, data);
    TempData.Image =
      Config.API_URL + Config.PATH_VOCABULARY_IMAGE + data.ImageUrl;

    console.log(TempData);

    this.refModal.current?.Show({
      data: TempData,
      onSubmit: this.onSubmitEdit,
    });
  };
  onSubmitEdit = async (data: Vocabulary) => {
    if (typeof data.Image === 'string') {
      delete data.Image;
    }
    await VocabularyService.PutVocabulary(data.Id, data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('Putting is Failed!');
      });
    this.refModal.current?.close();
  };
  renderItemVocabulary = (item: Vocabulary) => {
    const {Phrases} = item;
    const FirstPhrase = Phrases ? Phrases[0] : undefined;
    return (
      <LayoutItemVocabulary
        onPress={() => this.onPressItem(item)}
        Image={
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{
              uri:
                Config.API_URL + Config.PATH_VOCABULARY_IMAGE + item.ImageUrl,
            }}
          />
        }
        Action={
          <>
            {this.isOwner === true && (
              <>
                <ButtonIcon
                  onPress={() => this.onPressEdit(item)}
                  colorIcon={Colors.Orange}
                  IconComponent={MaterialIcons}
                  icon={'edit'}
                />
                <ButtonIcon
                  onPress={() => this.onPressDelete(item)}
                  colorIcon={Colors.Orange}
                  IconComponent={MaterialIcons}
                  icon={'delete'}
                />
              </>
            )}
            <ViewIcon icon={'heart'} />
          </>
        }
        Content={
          <>
            <Text style={styles.Word}>{item?.Word}</Text>
            <Text style={styles.WordVn}>{item?.WordVN}</Text>
            <Text style={styles.Phrase}>{FirstPhrase?.Sentence ?? ''}</Text>
            <Text style={styles.Phrase}>{FirstPhrase?.SentenceVN ?? ''}</Text>
          </>
        }
      />
    );
  };
  onPressAdd = () => {
    this.refModal.current?.Show({onSubmit: this.onSubmitAdd});
  };
  onSubmitAdd = async (data: Vocabulary) => {
    const {route} = this.props;
    data.VocabularyCategoryId = route?.params.WordCategory?.Id;
    await VocabularyService.PostVocabulary(data)
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
          title={route?.params.WordCategory?.Name}
          onPressAdd={this.isOwner ? this.onPressAdd : undefined}
        />
        <ContentCategory
          renderItem={this.renderItemVocabulary}
          data={this.props.data ?? []}
        />
        <FormVocabulary
          ref={this.refModal}
          visible={true}
          animationType={'slide'}
        />
      </View>
    );
  }
}
export default HocServices<PropsCategoryDetail, ActionParamVocabularies>(
  CategoryDetail,
  {
    ActionService: [VocabularyService.GetVocabularies],
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
  },
  Word: {fontWeight: 'bold', fontSize: 15},
  WordVn: {fontSize: 15},
  Phrase: {
    borderTopWidth: 1,
    fontSize: 15,
    color: Colors.Gray,
    borderColor: Colors.LightGray,
  },
  image: {
    flex: 1,
  },
});
