import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MyToast from '../utilities/MyToast';
import Img from '../usage/BookImg';
import Btn from '../utilities/CustomButton';
import LoaderButton from '../utilities/LoaderButton';
import IconButton from '../utilities/IconButton';
import StarRating from '../utilities/StarRating';
import generateReads from '../../helpers/generateReads';
import { useFocusEffect } from '@react-navigation/native';
import singleBookAction from '../../redux/actions/books/singleBook';
import addFavoritesAction from '../../redux/actions/favorites/addFavorites';
import Loader from '../utilities/Loader';
import Error from '../utilities/Error';

const Books = ({
  singleBook: getBook,
  singleBookAction: singleBook,
  id,
  addFavoritesAction: addFavorites,
  addFavorites: favorites,
}) => {
  const [bookData, setBookData] = useState({});
  const [status, setStatus] = useState('initial');
  const [saveBtn, setSaveBtn] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (getBook.status === 'clear_fetch_book') {
        setBookData({});
        setStatus('fetching');
      }
      if (status === 'initial') {
        singleBook(id);
        setStatus('fetching');
      }
      if (getBook.status === 'error') {
        const { error } = getBook;
        if (error.status === 500) {
          setStatus('unknown_error');
        }
        if (error.status === 404) {
          setStatus('no_data');
        }
      }
      if (getBook.status === 'success') {
        setStatus('success');
        setBookData(getBook.results.book);
      }

      // Add To Favorites
      if (favorites.status === 'success') {
        setSaveBtn(true);
        setSubmiting(false);
      }
      if (favorites.status === 'error') {
        setSubmiting(false);
      }
    }, [getBook, favorites])
  );

  const handleAddToFav = () => {
    addFavorites(id);
    return setSubmiting(true);
  };

  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'fetching':
        data = (
          <>
            <View style={{ alignItems: 'center' }}>
              <Loader text="Loading Book..." marginTop="55%" />
            </View>
          </>
        );
        break;
      case 'no_data':
        data = (
          <View style={{ alignItems: 'center' }}>
            <Error
              desc="The book you're looking for wasn't found."
              marginTop="55%"
              title="No data Found!"
              icon="book"
            />
          </View>
        );
        break;
      case 'unknown_error':
        data = (
          <View style={{ alignItems: 'center' }}>
            <Error
              desc="Ooops! Unexpected Error occured, pull to refresh."
              title="Error!"
              marginTop="55%"
              icon="info"
            />
          </View>
        );
        break;
      default:
        data = (
          <View style={{ alignItems: 'center' }}>
            <Loader text="Loading Book..." marginTop="55%" />
          </View>
        );
    }
    return data;
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <MyToast />
        <DisplayData>
          <Artist>
            <Img
              img={{ uri: bookData.bookPicture }}
              style={{
                height: 230,
                width: 250,
                borderRadius: 0,
              }}
            />
          </Artist>
          <View style={{ marginTop: 15 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontFamily: 'OpenSans-Bold',
                color: '#343a40',
                paddingHorizontal: 10,
              }}
            >
              {bookData.bookTitle}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 13,
                fontFamily: 'OpenSans-Regular',
                color: '#8c8c8c',
                marginTop: 5,
                paddingHorizontal: 20,
              }}
            >
              {bookData.bookDescr}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 13,
                fontFamily: 'OpenSans-Regular',
                marginTop: 5,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'OpenSans-Bold',
                  color: '#343a40',
                }}
              >
                Author:
              </Text>
              <Text
                style={{
                  color: '#343a40',
                }}
              >
                {` ${bookData.authorFirstName} ${bookData.authorLastName} `}
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              flex: 1,
              marginHorizontal: 15,
            }}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flexDirection: 'column', marginTop: 5 }}>
                <Text
                  style={{ textAlign: 'center', fontFamily: 'OpenSans-Bold' }}
                >
                  {generateReads(getBook.results.allTimeReads) || ''}
                </Text>
                <Text
                  style={{ textAlign: 'center', fontFamily: 'OpenSans-Bold' }}
                >
                  Reads
                </Text>
              </View>
            </View>
            <View style={{ flex: 3 }}>
              <StarRating
                marginTop={4}
                isRated={bookData.isRated}
                bookId={id}
              />
            </View>
            <View style={{ flex: 3 }}>
              {submiting ? (
                <LoaderButton
                  width={143}
                  fontSize={15}
                  loaderColor="#ffffff"
                  color="#8c8c8c"
                  disabledColor="#8c8c8c"
                  padding={10}
                  loaderSize="small"
                  marginTop={0}
                  radius={5}
                />
              ) : bookData.isFav || saveBtn ? (
                <IconButton
                  width={143}
                  text="Favorite"
                  color="#83bb44"
                  disabledColor="#8c8c8c"
                  tColor="white"
                  padding={10}
                  marginTop={0}
                  radius={5}
                  validity={true}
                />
              ) : (
                <Btn
                  width={143}
                  text="Add To Favorites"
                  color="#83bb44"
                  tColor="white"
                  padding={10}
                  marginTop={0}
                  radius={5}
                  onPress={handleAddToFav}
                />
              )}
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'OpenSans-Bold',
                fontSize: 18,
              }}
            >
              Book File Here!
            </Text>
          </View>
        </DisplayData>
      </View>
    </>
  );
};

const Artist = styled.View`
  align-items: center;
  margin-top: 40px;
`;

const mapStateToProps = ({ singleBook, addFavorites }) => ({
  singleBook,
  addFavorites,
});

export default connect(mapStateToProps, {
  singleBookAction,
  addFavoritesAction,
})(Books);
