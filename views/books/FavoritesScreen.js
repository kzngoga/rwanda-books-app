import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import FavoritesCard from '../../components/usage/FavoritesCard';
import Loader from '../../components/utilities/Loader';
import Error from '../../components/utilities/Error';
import { useFocusEffect } from '@react-navigation/native';
import fetchFavoritesAction from '../../redux/actions/favorites/fetchFavorites';

const Books = ({
  addScreen,
  navigation: { navigate },
  fetchFavorites: getFavorites,
  fetchFavoritesAction: fetchFavorites,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState('initial');
  const [booksData, setBooksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      addScreen('Favorite Books');
      if (status === 'initial') {
        fetchFavorites();
        setStatus('fetching');
      }
      if (getFavorites.status === 'error') {
        const { error } = getFavorites;
        if (error.status === 500) {
          setStatus('unknown_error');
        }
        if (error.status === 404) {
          setStatus('no_data');
        }
      }
      if (getFavorites.status === 'success') {
        setStatus('success');
        setBooksData(getFavorites.results[0].books);
      }
      setRefreshing(false);
    }, [getFavorites])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavorites();
    setStatus('fetching');
  };

  const refetch = () => {
    fetchFavorites();
    setStatus('fetching');
  };

  const books =
    booksData && searchTerm
      ? booksData.filter((book) =>
          book.bookTitle.toUpperCase().includes(searchTerm.toUpperCase())
        )
      : booksData;

  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = (
          <>
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
              {children}
            </View>
          </>
        );
        break;
      case 'fetching':
        data = (
          <>
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Loader text="Loading favorites..." marginTop="35%" />
            </View>
          </>
        );
        break;
      case 'no_data':
        data = (
          <View style={{ alignItems: 'center' }}>
            <Error
              desc="Your Favorite books will appear here."
              title="No Data Found!"
              marginTop="45%"
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
              marginTop="45%"
              icon="info"
            />
          </View>
        );
        break;
      default:
        data = (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Loader text="Loading favorites..." marginTop="35%" />
          </View>
        );
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
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'OpenSans-Bold',
                fontSize: 18,
                marginTop: 20,
                color: '#343a40',
              }}
            >
              My Favorites
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.inputField}
              placeholder="Type a book's name..."
              placeholderTextColor="#727075"
              onChangeText={(text) => {
                setSearchTerm(text);
              }}
            />
          </View>
          <DisplayData>
            <Text>Books</Text>
            <FlatList
              keyExtractor={(item) => {
                item._id;
              }}
              numColumns={3}
              horizontal={false}
              data={books}
              renderItem={({ item }) => {
                return (
                  <FavoritesCard
                    title={item.bookTitle}
                    released={item.released}
                    rating={item.rating}
                    marginTop={2}
                    img={item.bookPicture}
                    refetch={refetch}
                    item={item}
                    navigate={navigate}
                  />
                );
              }}
            />
            <>
              <View style={{ alignItems: 'center' }}>
                {books.length === 0 && searchTerm ? (
                  <Error
                    desc={`
                  No results found for " ${searchTerm} " , try another search`}
                    marginTop="45%"
                    title="No Results Found!"
                    icon="book"
                  />
                ) : null}
              </View>
            </>
          </DisplayData>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputField: {
    width: '90%',
    height: 45,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#f0f2f4',
    borderStyle: 'solid',
    color: '#727075',
    fontFamily: 'OpenSans-Regular',
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 13,
    marginTop: 18,
  },
});

const mapStateToProps = ({ fetchFavorites }) => ({ fetchFavorites });

export default connect(mapStateToProps, { fetchFavoritesAction })(Books);
