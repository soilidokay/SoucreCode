import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {PropsLearningGoalDetail, DataControlBar} from 'Views/type';
import LearningGoalDetailService from 'Providers/Services/LearningGoalDetailService';
import HocServices from 'Providers/Services/HocServices';
import {ILGVocabularyParamRequest} from 'Providers/Services/type';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ContentCategory from 'Views/_Components/ContentCategory';
import LayoutItemVocabulary from 'Views/_Layouts/LayoutItemVocabulary';
import Colors from 'assets/Colors';
import {Vocabulary} from 'Providers/Models/type';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import TitleGroup from 'Views/_Components/TitleGroup';
import ViewIcon from 'Views/_Components/ViewIcon';
class LearningGoalDetail extends PureComponent<PropsLearningGoalDetail> {
  private DataButton?: DataControlBar[];
  constructor(props: PropsLearningGoalDetail) {
    super(props);
    // this.DataButton = [
    //   {
    //     icon: 'add-to-list',
    //     onPress: this.onPressAddToList,
    //   },
    // ];
    // this.DataButton.push({
    //   icon: 'delete',
    //   ComponentIcon: MaterialIcons,
    //   onPress: this.onPressDelete,
    //   ColorIcon: Colors.Orange,
    //   ColorBorder: Colors.Orange,
    // });
  }
  renderItemVocabulary = (item: Vocabulary) => {
    return (
      <LayoutItemVocabulary
        Image={
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: item.Image}}
          />
        }
        Action={
          <>
            <ViewIcon icon={'heart'} />
            <ButtonIcon
              onPress={this.onPressDelete}
              colorIcon={Colors.Orange}
              IconComponent={MaterialIcons}
              icon={'delete'}
            />
          </>
        }
        Content={
          <>
            <Text style={styles.Word}>{item?.Word}</Text>
            <Text style={styles.WordVn}>{item?.WordVN}</Text>
            <Text style={styles.Phrase}>{item?.Phrase}</Text>
          </>
        }
      />
    );
  };
  onPressDelete = () => {};
  onPressGroupItem = () => {};
  onPressAddToList = () => {};
  componentDidMount = async () => {};
  render() {
    const {route} = this.props;
    return (
      <View style={styles.container}>
        <TitleGroup ActionName={''}>
          Learning List - {route?.params.LearningGoal?.Name}
        </TitleGroup>
        <ContentCategory
          renderItem={this.renderItemVocabulary}
          data={this.props.data ?? []}
        />
      </View>
    );
  }
}
export default HocServices<PropsLearningGoalDetail, ILGVocabularyParamRequest>(
  LearningGoalDetail,
  {
    ActionService: [LearningGoalDetailService.GetVocabularies],
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
