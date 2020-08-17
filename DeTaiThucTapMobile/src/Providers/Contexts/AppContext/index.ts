import {IRefHeaderTitle} from 'Providers/SubComponents/type';
import {TAppContext} from '../type';
import React from 'react';
class AppContext implements TAppContext {
  public HandleHeaderTitle?: React.RefObject<IRefHeaderTitle>;
  public HeightTabNavigate?: number;
  constructor() {
    this.HandleHeaderTitle = undefined;
  }

  public setHandHeaderTitle(Handle: React.RefObject<IRefHeaderTitle>) {
    if (this.HandleHeaderTitle === undefined) {
      this.HandleHeaderTitle = Handle;
    }
  }
  public releaseHeaderTitle() {
    this.HandleHeaderTitle = undefined;
  }
}

export default new AppContext();
