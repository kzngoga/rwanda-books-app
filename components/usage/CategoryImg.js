import React from 'react';
import { Image } from 'react-native';

export default function Img(props) {
  let image;

  if (props.type === 'all') {
    image = require('../../assets/images/allBooks.png');
  }
  if (props.type === 'fav') {
    image = require('../../assets/images/favBook.png');
  }
  if (props.type === 'category') {
    image = require('../../assets/images/categoryBook.png');
  }
  if (props.type === 'popular') {
    image = require('../../assets/images/popularBook.png');
  }
  if (props.type === 'new') {
    image = require('../../assets/images/newBook.png');
  }
  if (props.type === 'paid') {
    image = require('../../assets/images/paidBook.png');
  }
  if (props.type === 'free') {
    image = require('../../assets/images/freeBook.png');
  }
  return (
    <>
      <Image source={image} {...props} />
    </>
  );
}
