import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import Img from './BookImg';
import Rating from '../utilities/Rating';
import displayBookDate from '../../helpers/displayBookDate';

export default function LessonCard(props) {
  return (
    <View
      style={{
        width: 100,
        height: 170,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        ...props.style,
      }}
    >
      <Img
        img={{ uri: props.img }}
        style={{ height: 100, width: 100, borderRadius: 10 }}
      />
      <Title numberOfLines={1}>{props.title}</Title>
      <Artist numberOfLines={1}>{displayBookDate(props.released)}</Artist>
      <Rating ratingValue={props.rating} marginTop={props.marginTop} />
    </View>
  );
}

const Title = styled.Text`
  color: #343a40;
  font-family: 'OpenSans-Regular';
  text-align: center;
  padding-top: 5px;
  font-size: 14px;
`;

const Artist = styled.Text`
  color: #c4c4c4;
  font-family: 'OpenSans-Regular';
  text-align: center;
  font-size: 10px;
`;
