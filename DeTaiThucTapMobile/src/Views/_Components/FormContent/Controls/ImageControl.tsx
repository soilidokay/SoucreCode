import React, {FC, useState} from 'react';
import {StyleSheet, View, Alert, Image, Pressable} from 'react-native';
import {IImageControl, IImageControlState} from '../type';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';
// import ImagePicker from 'react-native-image-picker';
import images from 'assets/images';
import DocumentPicker from 'react-native-document-picker';

// const chooseImageV1 = (): Promise<ImageURISource | undefined> => {
//   let options = {
//     title: 'Select Image',
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };

//   return new Promise((resolve, reject) => {
//     ImagePicker.showImagePicker(options, (response) => {
//       if (response.didCancel) {
//         resolve();
//       } else if (response.error) {
//         reject(response.error);
//       } else {
//         const source = {
//           uri: response.uri,
//           name: response.fileName,
//           type: response.type,
//         };
//         resolve(source);
//       }
//     });
//   });
// };
const chooseImage = async () => {
  const response = await DocumentPicker.pick({
    type: [DocumentPicker.types.images],
  });
  return {
    uri: response.uri,
    type: response.type,
    name: response.name,
  };
};
const ImageControl: FC<IImageControl> = (props) => {
  const [state, setState] = useState<IImageControlState>({
    sourceDefault: props.Value ? {uri: props.Value} : images.ImageDefault,
  });
  return (
    <View style={[styles.container, {minHeight: props.minHeight}]}>
      <ContainerBox style={styles.WrapBox}>
        <Pressable
          onPress={async () => {
            const source = await chooseImage().catch(() => {
              Alert.alert('failed photo selection');
              return undefined;
            });
            if (source) {
              props.ActionEvent.onChangValue(source);
              setState((st) => ({...st, source: source}));
            }
          }}
          style={styles.WrapImage}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={state.source ?? state.sourceDefault}
          />
        </Pressable>
      </ContainerBox>
    </View>
  );
};
ImageControl.defaultProps = {};
export default ImageControl;

const styles = StyleSheet.create({
  container: {},
  WrapBox: {
    backgroundColor: Colors.White,
    borderRadius: 5,
    margin: 5,
    padding: 2,
  },
  content: {
    flex: 75,
    margin: 5,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  WrapImage: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  image: {height: 200, width: 200},
  Touch: {
    height: 50,
  },
});
