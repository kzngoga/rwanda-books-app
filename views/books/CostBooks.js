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
import searchBookAction from '../../redux/actions/books/searchBook';

import { useFocusEffect } from '@react-navigation/native';

const Books = ({
  addScreen,
  navigation,
  searchBookAction: searchBook,
  searchBook: getBooks,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');
  const [booksData, setBooksData] = useState([]);
  const [fetchMore, setFetchMore] = useState(false);
  const [bookPage, setBookPage] = useState(1);
  const [allBooksLoaded, setAllBooksLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const { category } = navigation.state.params;

  useFocusEffect(
    React.useCallback(() => {
      addScreen(category + ' ' + 'Books' || 'Cost Books');
      if (!initiated) {
        searchBook('availability', category, bookPage);
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

  const loadMore = () => {
    if (!allBooksLoaded) {
      searchBook('availability', category, bookPage + 1);
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
              desc={`No ${category} books added to the database yet.`}
              icon="book"
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
              desc="Ooops! Your internet connection is slow, please try again later."
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
            <Loader text={`${category} books...`} marginTop="55%" />
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
        <ScrollView>
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
                        navigation.navigate('SingleBooksScreen', { item });
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
                  <View style={{ marginBottom: 20 }}>
                    <Loader text="Loading more..." marginTop="3%" />
                  </View>
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

const mapStateToProps = ({ searchBook }) => ({ searchBook });

export default connect(mapStateToProps, { searchBookAction })(Books);
