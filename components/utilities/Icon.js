import React from 'react';
import Icons from '../../assets/Icons';

export default ({ name, width, height, color }) => {
  const Icon = Icons[name];
  return <Icon width={width} height={height} color={color} />;
};
