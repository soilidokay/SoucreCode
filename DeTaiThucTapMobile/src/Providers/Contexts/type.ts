import {ContextType, Context} from 'react';
import {IRefHeaderTitle} from 'Providers/SubComponents/type';

export declare type TAppContext = {
  HandleHeaderTitle?: React.RefObject<IRefHeaderTitle>;
};

export declare type TContextType = ContextType<Context<TAppContext>>;
