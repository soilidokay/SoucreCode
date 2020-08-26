import React, {PureComponent, createRef} from 'react';
import {StyleSheet, ScrollView, Image, View, Alert} from 'react-native';
import {PropsVocabularyDetail, DataControlBar} from 'Views/type';
import VocabularyService from 'Providers/Services/VocabularyService';
import HocServices from 'Providers/Services/HocServices';
import Colors from 'assets/Colors';
import {ActionParamVocabulary} from 'Providers/Services/Gateways/type';
import ContainerBox from 'Layouts/ContainerBox';
import {Config} from 'assets/Config';
import {Text} from 'react-native-elements';
import ControlBar from 'Views/GroupDetail/ControlBar';
import {Phrase, Pronunciation} from 'Providers/Models/type';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import LayoutControlBar from 'Views/_Layouts/LayoutControlBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import createModelFormContent, {ModalForm} from 'Views/_Components/ModalForm';
import SingleSound from 'Providers/CustomLibrary/Sound';

SingleSound.setCategory('Playback', false);
const FormPhrase = createModelFormContent<Phrase>({
  Content: {Type: 'Default', option: {}},
  ContentVN: {Type: 'Default', option: {}},
  Sentence: {Type: 'Default', option: {}},
  SentenceVN: {Type: 'Default', option: {}},
});
const FormPro = createModelFormContent<Pronunciation>({
  Audio: {Type: 'Pronunciation', option: {}},
  Transcription: {Type: 'Default', option: {}},
  Type: {Type: 'Default', option: {}},
});
class VocabularyDetail extends PureComponent<PropsVocabularyDetail> {
  private DataButtonPhrase: DataControlBar[];
  private DataButtonPro: DataControlBar[];
  private isOwner = false;
  private refPhraseModal = createRef<ModalForm<Phrase>>();
  private refProModal = createRef<ModalForm<Pronunciation>>();
  constructor(props: PropsVocabularyDetail) {
    super(props);
    const {route} = props;
    this.isOwner = route?.params.IsOwner ?? false;
    this.DataButtonPhrase = [];
    this.DataButtonPro = [];
    this.isOwner &&
      this.DataButtonPhrase.push(
        {
          icon: 'edit',
          ComponentIcon: MaterialIcons,
          onPress: this.onPressPhraseEdit,
          ColorIcon: Colors.Orange,
          ColorBorder: Colors.Orange,
        },
        {
          icon: 'delete',
          ComponentIcon: MaterialIcons,
          onPress: this.onPressPhraseDelete,
          ColorIcon: Colors.Orange,
          ColorBorder: Colors.Orange,
        },
      );
    this.isOwner &&
      this.DataButtonPro.push(
        {
          icon: 'edit',
          ComponentIcon: MaterialIcons,
          onPress: this.onPressProEdit,
          ColorIcon: Colors.Orange,
          ColorBorder: Colors.Orange,
        },
        {
          icon: 'delete',
          ComponentIcon: MaterialIcons,
          onPress: this.onPressProDelete,
          ColorIcon: Colors.Orange,
          ColorBorder: Colors.Orange,
        },
      );
  }
  onPressProEdit = (data: Pronunciation) => {
    const TempData = {Audio: ''} as Pronunciation;
    Object.assign(TempData, data);
    TempData.Audio =
      Config.API_URL + Config.PATH_VOCABULARY_SOUND + data.LinkFile;

    console.log(TempData);

    this.refProModal.current?.Show({
      data: TempData,
      onSubmit: this.onSubmitProEdit,
    });
  };
  onSubmitProEdit = async (data: Pronunciation) => {
    if (typeof data.Audio === 'string') {
      delete data.Audio;
    }
    await VocabularyService.PutPronunciation(data.Id, data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('Putting is Failed!');
      });

    this.refProModal.current?.close();
  };
  onPressProDelete = (data: Pronunciation) => {
    Alert.alert(
      'Delete',
      `Are you sure delete "${data.Transcription ?? ''}"?`,
      [
        {
          text: 'OK',
          style: 'destructive',
          onPress: async () => {
            await VocabularyService.DeletePronunciation(data)
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
      ],
    );
  };

  onPressAddPhrase = () => {
    this.refPhraseModal.current?.Show({onSubmit: this.onSubmitPhraseAdd});
  };
  onSubmitPhraseAdd = async (data: Phrase) => {
    const {route} = this.props;
    data.VocabularyId = route?.params.Vocabulary?.Id ?? '';
    await VocabularyService.PostPhrase(data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('addition is Failed!');
      });
    this.refPhraseModal.current?.close();
  };
  onPressAddPro = () => {
    this.refProModal.current?.Show({onSubmit: this.onSubmitProAdd});
  };
  onSubmitProAdd = async (data: Pronunciation) => {
    const {route} = this.props;
    data.VocabularyId = route?.params.Vocabulary?.Id ?? '';
    await VocabularyService.PostPronunciation(data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('addition is Failed!');
      });
    this.refPhraseModal.current?.close();
  };
  GeneratePhrase = (Phrases: Phrase[]) => {
    return Phrases.map((item, index) => {
      return (
        <View key={'key' + index} style={styles.ContainerPhrase}>
          <View style={styles.WrapContentPhrase}>
            <Text style={styles.PhraseContent}>{item.Content}</Text>
            <Text style={styles.PhraseContentVN}>{item.ContentVN}</Text>
          </View>
          <Text style={styles.PhraseSentence}>{item.Sentence}</Text>
          <Text style={styles.PhraseSentenceVN}>{item.SentenceVN}</Text>
          <LayoutControlBar item={item} DataButton={this.DataButtonPhrase} />
        </View>
      );
    });
  };
  GeneratePronunciation = (Pronunciations: Pronunciation[]) => {
    return Pronunciations.map((item, index) => {
      console.log(
        Config.API_URL + Config.PATH_VOCABULARY_SOUND + item.LinkFile,
      );
      return (
        <View key={'key' + index} style={styles.WrapPro}>
          <View style={styles.Pro}>
            <Text style={styles.PhraseContent}>
              {item.Type}:
              <Text style={styles.PhraseSentenceVN}>
                /{item.Transcription}/
              </Text>
            </Text>
          </View>
          <View style={styles.ActionInfo}>
            <LayoutControlBar item={item} DataButton={this.DataButtonPro} />
          </View>
          <View style={styles.Volume}>
            <ButtonIcon
              colorIcon={Colors.Orange}
              onPress={() => {
                const sound = new SingleSound(
                  Config.API_URL + Config.PATH_VOCABULARY_SOUND + item.LinkFile,
                  undefined,
                  (err) => {
                    if (err) {
                      sound.release();
                    } else {
                      sound.play().then(() => {
                        sound.release();
                      });
                    }
                  },
                );
              }}
              icon="volume-up"
            />
          </View>
        </View>
      );
    });
  };
  onPressPhraseDelete = async (data: Phrase) => {
    Alert.alert('Delete', `Are you sure delete "${data.Content ?? ''}"?`, [
      {
        text: 'OK',
        style: 'destructive',
        onPress: async () => {
          await VocabularyService.DeletePhrase(data)
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
  onPressPhraseEdit = (data: Phrase) => {
    this.refPhraseModal.current?.Show({
      data: data,
      onSubmit: this.onSubmitPhraseEdit,
    });
  };
  onSubmitPhraseEdit = async (data: Phrase) => {
    await VocabularyService.PutPhrase(data.Id, data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('Putting is Failed!');
      });
    this.refPhraseModal.current?.close();
  };
  componentWillUnmount() {
    SingleSound.CurrentSound?.release();
  }
  render() {
    const {data} = this.props;
    console.log({data});
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentScroll}>
        <ContainerBox style={styles.WrapContent}>
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={{
              uri:
                Config.API_URL + Config.PATH_VOCABULARY_IMAGE + data?.ImageUrl,
            }}
          />
          <View style={styles.WrapText}>
            <Text style={styles.Word}>{data?.Word}</Text>
            <Text style={styles.WordVn}>{data?.WordVN}</Text>
          </View>
        </ContainerBox>
        <ContainerBox style={styles.WrapContent}>
          <ControlBar
            title={'Pronunciation'}
            onPressAdd={this.isOwner ? this.onPressAddPro : undefined}
          />
          {this.GeneratePronunciation(data?.Pronunciations || [])}
        </ContainerBox>
        <ContainerBox style={styles.WrapContent}>
          <ControlBar
            title={'Phrase'}
            onPressAdd={this.isOwner ? this.onPressAddPhrase : undefined}
          />
          {this.GeneratePhrase(data?.Phrases || [])}
        </ContainerBox>
        <FormPhrase ref={this.refPhraseModal} />
        <FormPro ref={this.refProModal} />
      </ScrollView>
    );
  }
}
export default HocServices<PropsVocabularyDetail, ActionParamVocabulary>(
  VocabularyDetail,
  {
    ActionService: [VocabularyService.GetVocabulary],
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  WrapContent: {
    flex: 1,
    minHeight: 200,
    borderRadius: 5,
    marginVertical: 3,
  },
  WrapText: {
    padding: 10,
    backgroundColor: Colors.CustomWhite,
    borderRadius: 5,
    margin: 5,
  },
  Word: {fontWeight: 'bold', fontSize: 20, color: Colors.CustomGreen},
  WordVn: {fontSize: 15, color: Colors.LightGreen},
  image: {flex: 1, margin: 10, height: 250},
  contentScroll: {
    padding: 5,
    borderRadius: 5,
  },
  WrapGroup: {
    height: 50,
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.CustomLightBlue,
    borderRadius: 5,
    flexDirection: 'row',
  },
  TitleGroup: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.CustomGreen,
  },
  ContainerPhrase: {
    minHeight: 50,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    padding: 3,
    borderRadius: 5,
  },
  WrapContentPhrase: {
    flex: 1,
    padding: 3,
    borderRadius: 5,
    backgroundColor: Colors.CustomWhite,
  },
  PhraseContent: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.Green,
    textAlign: 'justify',
  },
  PhraseContentVN: {
    color: Colors.Green,
    fontSize: 15,
    textAlign: 'justify',
  },
  PhraseSentence: {fontWeight: 'bold', fontSize: 15, textAlign: 'justify'},
  PhraseSentenceVN: {
    fontSize: 15,
    textAlign: 'justify',
  },
  WrapPro: {
    height: 40,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 5,
    flexDirection: 'row',
  },
  Pro: {flex: 70, justifyContent: 'center', marginHorizontal: 5},
  Volume: {marginHorizontal: 20},
  ActionInfo: {width: 100, justifyContent: 'center'},
});
