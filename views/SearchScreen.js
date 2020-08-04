import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import BookCard from '../components/usage/BookCard';
import Loader from '../components/utilities/Loader';
import Icon from '../components/utilities/Icon';
import Error from '../components/utilities/Error';
import { useFocusEffect } from '@react-navigation/native';
import searchBookAction from '../redux/actions/books/searchBook';

const SearchScreen = ({
  addScreen,
  navigation: { navigate },
  searchBook: search,
  searchBookAction: searchBook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [booksData, setBooksData] = useState([]);
  const [fetchMore, setFetchMore] = useState(false);
  const [bookPage, setBookPage] = useState(1);
  const [allBooksLoaded, setAllBooksLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [searching, setSearching] = useState(false);

  const image = require('../assets/images/bookSearch.png');
  useFocusEffect(
    React.useCallback(() => {
      addScreen('Search Books', 'no-back');
      if (loading && search.status === 'error') {
        const { error } = search;
        if (error.status === 404) {
          setAllBooksLoaded(true);
        }

        if (error.status === 500) {
          setFetchMore(false);
        }
        setLoading(false);
        setErrorStatus(search.error.status);
        setFetchMore(false);
        setSearching(false);
      }

      if (loading && search.status === 'success') {
        setBooksData([...booksData, ...search.results]);
        setLoading(true);
        setFetchMore(false);
        setSearching(false);
      }
    }, [search])
  );

  const handleSearch = () => {
    requestAnimationFrame(() => {
      setLoading(true);
      setInitiated(true);
      setSearching(true);
      setCurrentQuery(searchQuery);
      Keyboard.dismiss();
      return searchBook('title', searchQuery, bookPage);
    });
  };

  const handleChange = (value) => {
    if (booksData.length || errorStatus) {
      setInitiated(false);
      setErrorStatus('');
      setBooksData([]);
    }
    setSearchQuery(value);
  };

  const loadMore = () => {
    if (!allBooksLoaded) {
      searchBook('title', searchQuery, bookPage + 1);
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
              desc={`No search results retrieved for "${currentQuery}"`}
              icon="book"
              marginTop="45%"
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
              marginTop="45%"
            />
          </View>
        );
      }
    } else {
      if (searching) {
        data = (
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Loader text="Searching books..." marginTop="45%" />
          </View>
        );
      } else {
        data = <>{children}</>;
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
          <Search>
            <SearchSection>
              <TextInput
                style={styles.inputField}
                placeholder="Search a book..."
                placeholderTextColor="#727075"
                onChangeText={handleChange}
              />
              <View>
                <TouchableOpacity
                  style={{
                    height: 44,
                    justifyContent: 'center',
                    width: 45,
                    alignItems: 'center',
                    backgroundColor: '#83bb44',
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                  onPress={handleSearch}
                  disabled={
                    !searchQuery || searchQuery === currentQuery ? true : false
                  }
                >
                  <Icon name="search" color="#343a40" width="25" height="25" />
                </TouchableOpacity>
              </View>
            </SearchSection>
          </Search>
          {initiated ? (
            <DisplayData>
              <View style={{ marginTop: '8%', paddingHorizontal: 10 }}>
                <Text
                  style={{ fontFamily: 'OpenSans-Bold', fontSize: 15 }}
                >{`Found results for "${currentQuery}"`}</Text>
                <View style={{ marginTop: 20 }}>
                  <FlatList
                    keyExtractor={(item) => {
                      item._id;
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
                        <View style={{ marginBottom: 20 }}>
                          <Loader text="Loading more..." marginTop="3%" />
                        </View>
                      )
                    }
                    onEndReached={() => loadMore()}
                    onEndReachedThreshold={0.3}
                  />
                </View>
              </View>
            </DisplayData>
          ) : (
            <View style={{ alignItems: 'center', marginTop: '40%' }}>
              <Image source={image} style={{ width: 120, height: 100 }} />
              <View
                style={{
                  marginTop: 15,
                  paddingHorizontal: 30,
                  fontFamily: 'OpenSans-Regular',
                  textAlign: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                  }}
                >
                  You can search for any book here on Rwanda books!
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputField: {
    width: '85%',
    height: 45,
    backgroundColor: '#ffffff',

    borderRightColor: '#83bb44',
    borderLeftColor: '#f0f2f4',
    borderTopColor: '#f0f2f4',
    borderBottomColor: '#f0f2f4',
    borderRightWidth: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderStyle: 'solid',
    color: '#727075',
    fontFamily: 'OpenSans-Regular',
    paddingLeft: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 0,
    fontSize: 13,
    marginTop: 0,
  },
});

const Search = styled.View`
  padding: 10px 10px 0 10px;
`;

const SearchSection = styled.View`
  height: 45px;
  border-radius: 5px;
  border-width: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const mapStateToProps = ({ searchBook }) => ({ searchBook });

export default connect(mapStateToProps, { searchBookAction })(SearchScreen);
