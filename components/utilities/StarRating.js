import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import rateBookAction from '../../redux/actions/rating/rateBook';

const StarRating = ({
  marginTop,
  isRated,
  rateBookAction: rateBook,
  rateBook: ratedBook,
  bookId,
}) => {
  const [isRating, setIsRating] = useState(false);
  const [rated, setRated] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setRated(false);
      setIsRating(false);
      if (ratedBook.status === 'clear_rating') {
        setRated(false);
      }
      if (ratedBook.status === 'success') {
        setRated(true);
        setIsRating(false);
      }
      if (ratedBook.status === 'error') {
        setIsRating(false);
        setCurrentRating(0);
      }
    }, [ratedBook])
  );

  const ratingCompleted = (rating) => {
    setCurrentRating(rating);
    const data = { rating: rating };
    rateBook(data, bookId);
    return setIsRating(true);
  };

  let RateText;
  if (rated || isRated !== false) {
    if (isRated !== false) {
      RateText = 'Rated' + ' ' + isRated + '/5';
    } else {
      RateText = 'Rated' + ' ' + currentRating + '/5';
    }
  } else {
    if (isRating) {
      RateText = 'Rating' + ' ' + currentRating + '/5';
    } else {
      RateText = 'Rate Book';
    }
  }

  return (
    <View style={{ marginTop: marginTop, alignItems: 'center' }}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Bold' }}>
          {RateText}
        </Text>
        <AirbnbRating
          count={5}
          defaultRating={isRated !== false ? isRated : currentRating}
          size={15}
          showRating={false}
          isDisabled={
            rated || isRated !== false ? true : isRating ? true : false
          }
          onFinishRating={ratingCompleted}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({ rateBook }) => ({ rateBook });

export default connect(mapStateToProps, {
  rateBookAction,
})(StarRating);
