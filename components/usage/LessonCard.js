import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import Img from './Img';
import NumberFormat from 'react-number-format';
export default function LessonCard(props) {
  const RnNumberFormat = (value) => {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'RWF'}
        renderText={(formattedValue) => <Text>{formattedValue}</Text>}
      />
    );
  };

  return (
    <View
      style={{
        width: 100,
        height: 150,
        marginLeft: 5,
        marginRight: 5,
        ...props.style,
      }}
    >
      <Img
        img={{ uri: props.img }}
        style={{ height: 100, width: 100, borderRadius: 10 }}
      />
      <Title numberOfLines={1}>{props.title}</Title>
      <Artist numberOfLines={1}>{RnNumberFormat(props.price)}</Artist>
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
