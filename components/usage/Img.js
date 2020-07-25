import React, { useState } from 'react';
import { Image } from 'react-native';

export default function Img(props) {
  const [loading, setLoading] = useState(true);
  const image = props.img.uri
    ? loading
      ? require('../../assets/images/defaultLessons.png')
      : props.img
    : require('../../assets/images/defaultLessons.png');
  return (
    <>
      <Image source={image} onLoad={() => setLoading(false)} {...props} />
    </>
  );
}
