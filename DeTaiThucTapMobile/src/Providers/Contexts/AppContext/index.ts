import Context from '../Context';
import {IRefHeaderTitle} from 'Providers/SubComponents/type';

class AppContext extends Context {
  constructor() {
    super();
    this.HandleHeaderTitle = undefined;
  }
  public HandleHeaderTitle?: React.RefObject<IRefHeaderTitle>;

  public setHandHeaderTitle = (Handle: React.RefObject<IRefHeaderTitle>) => {
    if (this.HandleHeaderTitle === undefined) {
      this.HandleHeaderTitle = Handle;
    }
  };
  public releaseHeaderTitle() {
    this.HandleHeaderTitle = undefined;
  }
}

export default new AppContext();
