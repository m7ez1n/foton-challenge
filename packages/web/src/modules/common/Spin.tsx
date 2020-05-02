import React, { CSSProperties } from 'react';

import { Spin as SpinAntd } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  style?: CSSProperties;
}

const Spin: React.FC<Props> = ({ style }) => {
  const antIcon = <LoadingOutlined style={style} spin />;

  return <SpinAntd indicator={antIcon} />;
};

export default Spin;
