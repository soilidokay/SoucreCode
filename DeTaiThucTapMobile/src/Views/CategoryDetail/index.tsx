import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {PropsCategoryDetail} from 'Views/type';
import CategoryDetailService from 'Providers/Services/CategoryDetailService';
import HocServices from 'Providers/Services/HocServices';
import {IVocabularyParamRequest} from 'Providers/Services/type';
import ContentCategory from 'Views/_Components/ContentCategory';
import {Vocabulary} from 'Providers/Models/type';
import LayoutItemVocabulary from 'Views/_Layouts/LayoutItemVocabulary';
import ViewIcon from 'Views/_Components/ViewIcon';
import Colors from 'assets/Colors';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class CategoryDetail extends PureComponent<PropsCategoryDetail> {
  private isOwner = false;
  constructor(props: PropsCategoryDetail) {
    super(props);
    const {route} = props;
    this.isOwner = route?.params.IsOwner ?? false;
  }
  onPressGroupItem = () => {};
  onPressAddToList = () => {};
  componentDidMount = async () => {};
  onPressDelete = () => {};
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
            {this.isOwner === true && (
              <ButtonIcon
                onPress={this.onPressDelete}
                colorIcon={Colors.Orange}
                IconComponent={MaterialIcons}
                icon={'delete'}
              />
            )}
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
  render() {
    return (
      <View style={styles.container}>
        <ContentCategory
          renderItem={this.renderItemVocabulary}
          data={this.props.data ?? []}
        />
      </View>
    );
  }
}
export default HocServices<PropsCategoryDetail, IVocabularyParamRequest>(
  CategoryDetail,
  {
    ActionService: [CategoryDetailService.GetVocabularies],
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
