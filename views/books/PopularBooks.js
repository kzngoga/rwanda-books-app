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
import popularBooksAction from '../../redux/actions/books/popularBooks';

import { useFocusEffect } from '@react-navigation/native';

const Books = ({
  addScreen,
  navigation: { navigate },
  popularBooksAction: popularBooks,
  popularBooks: getBooks,
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
      addScreen('Popular Books');
      if (!initiated) {
        popularBooks(bookPage);
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
        setBooksData([...booksData, ...getBooks.results.books]);
        setLoading(true);
        setFetchMore(false);
      }

      setRefreshing(false);
    }, [getBooks])
  );

  const loadMore = () => {
    if (!allBooksLoaded) {
      popularBooks(bookPage + 1);
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
              desc="No popular books retrieved for now."
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
            <Loader text="Popular books..." marginTop="55%" />
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
                item._id.Book;
              }}
              numColumns={3}
              initialNumToRender={12}
              horizontal={false}
              data={booksData}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      requestAnimationFrame(() => {
                        navigate('SingleBooksScreen', {
                          item,
                          type: 'popular',
                        });
                      });
                    }}
                  >
                    <BookCard
                      title={item.title}
                      released={item.released}
                      type="popular"
                      rating={item.rating}
                      marginTop={2}
                      img={item.picture}
                      reads={item.allTimeReads}
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

const mapStateToProps = ({ popularBooks }) => ({ popularBooks });

export default connect(mapStateToProps, { popularBooksAction })(Books);
