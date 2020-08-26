import React, {FC, useState, useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {IPronunciationControl, IPronunciationControlState} from '../type';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';
import DocumentPicker from 'react-native-document-picker';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import {Config} from 'assets/Config';
import RNFS from 'react-native-fs';
import SingleSound from 'Providers/CustomLibrary/Sound';
SingleSound.setCategory('Playback');
SingleSound.setMode('SpokenAudio');
const PATH_SOUND =
  RNFS.DocumentDirectoryPath + '/' + Config.PATH_SOUND_TEMP + '/';

const chooseAudio = async () => {
  const response = await DocumentPicker.pick({
    type: [DocumentPicker.types.audio],
  });
  return {
    uri: response.uri,
    type: response.type,
    name: response.name,
  };
};
const PronunciationControl: FC<IPronunciationControl> = (props) => {
  const [state, setState] = useState<IPronunciationControlState>({
    sourceDefault: props.Value || undefined,
  });
  const ref = useRef<{Sound?: SingleSound}>({Sound: undefined});
  useEffect(() => {
    return () => {
      ref?.current.Sound?.release();
    };
  }, []);
  return (
    <View style={[styles.container, {minHeight: props.minHeight}]}>
      <ContainerBox style={styles.WrapBox}>
        <View style={styles.WrapImage}>
          <ButtonIcon
            disabled={
              state.source === undefined && state.sourceDefault === undefined
            }
            onPress={() => {
              ref.current.Sound?.release();
              ref.current.Sound = new SingleSound(
                typeof state.source === 'undefined'
                  ? state.sourceDefault
                  : PATH_SOUND + state.source?.name,
                undefined,
                (err) => {
                  if (err) {
                    ref.current.Sound?.release();
                  } else {
                    ref.current.Sound?.play().then(() =>
                      ref.current.Sound?.release(),
                    );
                  }
                },
              );
            }}
            colorIcon={Colors.Orange}
            sizeIcon={50}
            icon={'volume-up'}
          />
        </View>
        <ContainerBox>
          <ButtonIcon
            style={{backgroundColor: Colors.CustomWhite}}
            IconComponent={Entypo}
            sizeIcon={30}
            icon={'folder-music'}
            onPress={async () => {
              ref.current.Sound?.release();
              try {
                const source = await chooseAudio();

                let isExist = await RNFS.exists(PATH_SOUND + source?.name);
                if (!isExist) {
                  await RNFS.mkdir(PATH_SOUND);
                }
                await RNFS.unlink(
                  PATH_SOUND + state.source?.uri ?? 'test.txt',
                  // eslint-disable-next-line no-console
                ).catch(console.log);
                await RNFS.copyFile(
                  source?.uri ?? '',
                  PATH_SOUND + source?.name,
                );
                if (source) {
                  props.ActionEvent.onChangValue(source);
                  setState((st) => ({...st, source: source}));
                }
              } catch {
                return undefined;
              }
            }}
          />
        </ContainerBox>
      </ContainerBox>
    </View>
  );
};
PronunciationControl.defaultProps = {};
export default PronunciationControl;

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
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  Touch: {
    height: 50,
  },
});
