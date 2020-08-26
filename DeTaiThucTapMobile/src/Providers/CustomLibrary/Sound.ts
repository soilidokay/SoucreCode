import Sound from 'react-native-sound';
type FilenameType = string;

type FileType = any;

type BasePathType = string;

type CallbackType = (error: any) => void;
class SingleSound extends Sound {
  constructor(
    filenameOrFile: FilenameType | FileType,
    basePathOrCallback?: BasePathType | CallbackType,
    callback?: CallbackType,
  ) {
    super(filenameOrFile, basePathOrCallback, callback);
  }
  play() {
    SingleSound.CurrentSound?.release();
    return new Promise((resolve) => {
      SingleSound.CurrentSound = this;
      super.play(resolve);
    });
  }
  public static CurrentSound?: Sound;
}

export default SingleSound;
