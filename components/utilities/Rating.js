import React from 'react';
import { View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const StarRating = ({ ratingValue, marginTop }) => {
  return (
    <View style={{ marginTop: marginTop }}>
      <AirbnbRating
        count={5}
        defaultRating={ratingValue}
        size={10}
        showRating={false}
        isDisabled
      />
    </View>
  );
};

export default StarRating;
