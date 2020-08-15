import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {PropsGroupDetail} from 'Views/type';
import GroupDetailService from 'Providers/Services/GroupDetailService';
import HocServices from 'Providers/Services/HocServices';
import {IVocabularyCategoriesParamRequest} from 'Providers/Services/type';
import ContentGroup from 'Views/Layouts/ContentGroup';

class GroupDetail extends PureComponent<PropsGroupDetail> {
  constructor(props: PropsGroupDetail) {
    super(props);
  }
  onPressGroupItem = () => {};
  onPressAddToList = () => {};
  componentDidMount = async () => {};
  render() {
    return (
      <View style={styles.container}>
        <ContentGroup
          onPressItem={this.onPressGroupItem}
          onPressAddToList={this.onPressAddToList}
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
