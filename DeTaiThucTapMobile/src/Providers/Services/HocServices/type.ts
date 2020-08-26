export enum HocComponentStatus {
  Loading = 'Loading',
  Loaded = 'Loaded',
}

export declare type HocComponentProps<ComponentProps, ParamRequest = {}> = {
  ParamRequests?: ParamRequest[];
} & ComponentProps;
// export interface HocComponentProps<ComponentProps> extends T<ComponentProps> {

// }

export type dataType<TypeOfData = any> = [TypeOfData];

export interface HocComponentState {
  data: dataType[] | dataType;
  status: HocComponentStatus;
}
export declare type ActionServiceType<TypeOfData = any, Param = any> = (
  ...param: Param[]
) => Promise<TypeOfData[]> | TypeOfData[];
export interface HocOption {
  ActionService: ActionServiceType[];
}

export declare type SwitchRenderType<ComponentProps> = {
  [key in HocComponentStatus]: (
    state: HocComponentState,
    props: HocComponentProps<ComponentProps>,
    options: {
      refresh: () => void;
    },
  ) => JSX.Element;
};
