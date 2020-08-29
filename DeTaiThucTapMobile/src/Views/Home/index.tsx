import React, {PureComponent, createRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  PropsHome,
  FlatListHomeProp,
  FlatListHome,
  StateHome,
  ModeActive,
} from 'Views/type';
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
  Vocabulary,
} from 'Providers/Models/type';
import LayoutItemCategory from 'Views/_Layouts/LayoutItemCategory';
import ContentItemCategory from '../_Components/ContentItemCategory';
import LayoutControlBar from 'Views/_Layouts/LayoutControlBar';
import AppContext from 'Providers/Contexts/AppContext';
import LearningGoalService from 'Providers/Services/LearningGoalService';
import {MenuModel} from 'Views/_Components/MenuModel';
import {Text} from 'react-native-elements';
import CarouselTinder, {ShadowDirectType} from 'Commons/CarouselTinder';
import {} from 'react-native-gesture-handler';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import Colors from 'assets/Colors';
import VocabularyService from 'Providers/Services/VocabularyService';
import {
  widthScreen,
  heightScreen,
} from 'Commons/CarouselTinder/SupportCarousel';
import ContainerBox from 'Layouts/ContainerBox';
import {Config} from 'assets/Config';
export class Home extends PureComponent<PropsHome, StateHome> {
  private ConfigFlatList: FlatListHomeProp;
  private refMenu = createRef<MenuModel>();
  constructor(props: PropsHome) {
    super(props);
    const {data, navigation} = props;
    navigation?.addListener('focus', this.onFocus);
    this.state = {
      modeActive: ModeActive.carousel,
    };
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
  onPressMode = (modeActive: ModeActive) => {
    this.setState({modeActive});
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
  LoadMoreAsync = () => {
    return VocabularyService.GetVocabularies();
  };
  renderItemCarousel = (data: {item: Vocabulary; index: number}) => {
    const {Phrases} = data.item;
    const FirstPhrase = Phrases ? Phrases[0] : undefined;
    return (
      <View
        style={{
          flex: 1,
          margin: 3,
          // backgroundColor: Colors.White,
          borderRadius: 5,
        }}>
        <ContainerBox style={styles.WrapContent}>
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={{
              uri:
                Config.API_URL +
                Config.PATH_VOCABULARY_IMAGE +
                data.item.ImageUrl,
            }}
          />
          <View style={styles.WrapText}>
            <Text style={styles.Word}>{data.item.Word}</Text>
            <Text style={styles.WordVn}>{data.item.WordVN}</Text>
          </View>
          <View style={styles.WrapText}>
            <Text style={styles.Word}>{FirstPhrase?.Content}</Text>
            <Text style={styles.WordVn}>{FirstPhrase?.ContentVN}</Text>
          </View>
          <View style={styles.WrapText}>
            <Text style={styles.Word}>{FirstPhrase?.Sentence}</Text>
            <Text style={styles.WordVn}>{FirstPhrase?.SentenceVN}</Text>
          </View>
        </ContainerBox>
      </View>
    );
  };
  render() {
    const {theme} = this.props;

    return (
      <View style={theme?.containerStyle}>
        <View style={styles.containerDirect}>
          <ButtonIcon
            onPress={() => this.onPressMode(ModeActive.carousel)}
            style={[
              styles.btnDirect,
              {
                backgroundColor:
                  this.state.modeActive === ModeActive.carousel
                    ? Colors.Orange
                    : undefined,
              },
            ]}
            icon={'clone'}
          />
          <ButtonIcon
            onPress={() => this.onPressMode(ModeActive.List)}
            style={[
              styles.btnDirect,
              {
                backgroundColor:
                  this.state.modeActive === ModeActive.List
                    ? Colors.Orange
                    : undefined,
              },
            ]}
            icon={'grip-lines'}
          />
        </View>
        {this.state.modeActive === ModeActive.List && (
          <FlatListHome {...this.ConfigFlatList} />
        )}
        <MenuModel ref={this.refMenu} />
        {this.state.modeActive === ModeActive.carousel && (
          <CarouselTinder
            // ref={_refTinder}
            data={this.props.data ? this.props.data[2] : []}
            amountDisplay={5}
            ShadowDirect={ShadowDirectType.Bottom}
            HeightContainer={(heightScreen - 100) * 0.8}
            WidthContainer={widthScreen * 0.95}
            FetchData={this.LoadMoreAsync}
            renderItem={this.renderItemCarousel}
            // DisableRemove={{
            //   Down: true,
            //   Up: true,
            // }}
            // onLeft={_onDislike}
            // onRight={_onLike}
            // ComponentLoading={<LastMealItem refresh={refreshData} />}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textMenu: {
    textAlign: 'center',
  },
  containerDirect: {height: 50, flexDirection: 'row', justifyContent: 'center'},
  btnDirect: {
    margin: 5,
    backgroundColor: Colors.CustomWhite,
    borderRadius: 5,
  },
  WrapContent: {
    flex: 1,
    minHeight: 200,
    borderRadius: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: Colors.White,
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
});
export default HocServices<PropsHome>(Home, {
  ActionService: [
    HomeService.GetGroupCategories,
    LearningGoalService.GetLearningGoals,
    VocabularyService.GetVocabularies,
  ],
});
