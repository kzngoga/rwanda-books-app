import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from './Icon';
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
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontFamily: 'OpenSans-Bold',
              marginRight: 10,
            }}
          >
            Favorite
          </Text>
          <Icon name="heart_2" width={26} height={23} color="#fff" />
        </View>
      </View>
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
