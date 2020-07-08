import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const LoaderButton = (props) => {
  const content = (
    <View
      style={[
        styles.buttonStyle,
        {
          borderRadius: props.radius || 5,
          borderColor: props.borderColor || 'transparent',
          borderWidth: 2,
          backgroundColor: props.validity ? props.disabledColor : props.color,
          marginTop: props.marginTop,
          marginRight: props.marginRight,
          width: props.width,
          height: props.height,
          marginBottom: props.marginBottom,
          padding: props.padding || 15,
          margin: props.margin,
        },
      ]}
    >
      <Text
        style={[
          styles.btnText,
          {
            color: props.validity ? '#666666' : '#ffffff',
            fontSize: props.fontSize,
          },
        ]}
      >
        {props.text}
      </Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.validity ? true : false}
      >
        {content}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5,
    padding: 10,
  },

  btnText: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
});

export default LoaderButton;
