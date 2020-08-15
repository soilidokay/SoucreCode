import React, {ComponentType, PureComponent} from 'react';
import {
  HocComponentProps,
  HocComponentState,
  HocOption,
  SwitchRenderType,
  HocComponentStatus,
} from './type';
import {PropComponentApp} from '../../../Views/type';
import Loading from 'Providers/Components/Loading';

function HocService<ComponentProps, ParamRequest = {} | null>(
  WrappedComponent: ComponentType<PropComponentApp>,
  option?: HocOption,
) {
  const SwitchRender: SwitchRenderType<ComponentProps> = {
    Loaded: (state, props) => {
      const {data} = state;
      return (
        <WrappedComponent
          data={data.length === 1 ? data[0] : data}
          {...props}
        />
      );
    },
    Loading: () => <Loading />,
  };
  class HocComponent extends PureComponent<
    HocComponentProps<ComponentProps, ParamRequest>,
    HocComponentState
  > {
    private isMount = false;
    constructor(props: HocComponentProps<ComponentProps, ParamRequest>) {
      super(props);
      this.state = {
        data: [],
        status: HocComponentStatus.Loading,
      };
      this.isMount = true;
    }
    componentWillUnmount() {
      this.isMount = false;
    }
    UpdateStatus(status: HocComponentStatus, data: any[]) {
      if (!this.isMount) {
        return;
      }
      this.setState({status, data});
    }
    componentDidMount = async () => {
      if (option) {
        const data = await Promise.all(
          option.ActionService.map((action) => action()),
        );
        this.UpdateStatus(HocComponentStatus.Loaded, data);
      }
    };
    render() {
      const {status} = this.state;
      return SwitchRender[status](this.state, this.props);
    }
  }

  return HocComponent;
}

export default HocService;
