import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import BookCard from '../../components/usage/BookCard';
import Loader from '../../components/utilities/Loader';
import Error from '../../components/utilities/Error';
import newBooksAction from '../../redux/actions/books/newBooks';

import { useFocusEffect } from '@react-navigation/native';

const Books = ({
  addScreen,
  navigation: { navigate },
  newBooksAction: newBooks,
  newBooks: getBooks,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');
  const [booksData, setBooksData] = useState([]);
  const [fetchMore, setFetchMore] = useState(false);
  const [bookPage, setBookPage] = useState(1);
  const [allBooksLoaded, setAllBooksLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initiated, setInitiated] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      addScreen('New Releases');
      if (!initiated) {
        newBooks(bookPage);
        setLoading(true);
        setInitiated(true);
      }

      if (loading && getBooks.status === 'error') {
        const { error } = getBooks;
        if (error.status === 404) {
          setAllBooksLoaded(true);
        }

        if (error.status === 500) {
          setFetchMore(false);
        }
        setLoading(false);
        setErrorStatus(getBooks.error.status);
        setFetchMore(false);
      }

      if (loading && getBooks.status === 'success') {
        setBooksData([...booksData, ...getBooks.results]);
        setLoading(true);
        setFetchMore(false);
      }

      setRefreshing(false);
    }, [getBooks])
  );

  const onRefresh = () => {
    setRefreshing(true);
    newBooks(1);
    setBooksData([]);
  };

  const loadMore = () => {
    if (!allBooksLoaded) {
      newBooks(bookPage + 1);
      setBookPage(bookPage + 1);
      setFetchMore(true);
    }
  };

  const DisplayData = ({ children }) => {
    let data;
    if (errorStatus && bookPage === 1) {
      if (errorStatus === 404) {
        data = (
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Error
              title="No Data Found!"
              desc="No books added to the database yet."
              icon="book-open"
              marginTop="55%"
            />
          </View>
        );
      } else {
        data = (
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Error
              title="Error!"
              desc="Ooops! Unexpected Error occured, pull to refresh."
              icon="info"
              marginTop="55%"
            />
          </View>
        );
      }
    } else {
      if (booksData.length === 0) {
        data = (
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Loader text="New books..." marginTop="55%" />
          </View>
        );
      } else {
        data = (
          <>
            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 10,
              }}
            >
              {children}
            </View>
          </>
        );
      }
    }
    return data;
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#8c8c8c' }} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <DisplayData>
            <FlatList
              keyExtractor={(item) => {
                item._id;
              }}
              numColumns={3}
              initialNumToRender={9}
              horizontal={false}
              data={booksData}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      requestAnimationFrame(() => {
                        navigate('SingleBooksScreen', { item });
                      });
                    }}
                  >
                    <BookCard
                      title={item.bookTitle}
                      released={item.released}
                      rating={item.rating}
                      marginTop={2}
                      img={item.bookPicture}
                    />
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={() =>
                allBooksLoaded ? null : (
                  <Loader text="Loading more..." marginTop="3%" />
                )
              }
              onEndReached={() => loadMore()}
              onEndReachedThreshold={0.3}
            />
          </DisplayData>
        </ScrollView>
      </View>
    </>
  );
};

const mapStateToProps = ({ newBooks }) => ({ newBooks });

export default connect(mapStateToProps, { newBooksAction })(Books);