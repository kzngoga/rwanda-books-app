import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import Img from './CategoryImg';
export default function LessonCard(props) {
  return (
    <View
      style={{
        width: 100,
        height: 115,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        ...props.style,
      }}
    >
      <Img
        type={props.type}
        style={{
          height: 80,
          width: 80,
          borderRadius: 10,
        }}
      />
      {props.font === 'bold-type' ? (
        <TitleBold numberOfLines={1}>{props.title}</TitleBold>
      ) : (
        <Title numberOfLines={1}>{props.title}</Title>
      )}
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
const TitleBold = styled.Text`
  color: #343a40;
  font-family: 'OpenSans-Bold';
  text-align: center;
  padding-top: 5px;
  font-size: 14px;
`;
