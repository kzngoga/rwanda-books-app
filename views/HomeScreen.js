import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import CategoryCard from '../components/usage/bookCategoryCard';
import BookCard from '../components/usage/BookCard';
import Loader from '../components/utilities/Loader';
import Btn from '../components/utilities/CustomButton';
import Error from '../components/utilities/Error';
import { useFocusEffect } from '@react-navigation/native';
import popularBooksAction from '../redux/actions/books/popularBooks';
import newBooksAction from '../redux/actions/books/newBooks';

const HomeScreen = ({
  addScreen,
  navigation: { navigate },
  popularBooks: popular,
  newBooks: getNewBooks,
  popularBooksAction: popularBooks,
  newBooksAction: newBooks,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState('initial');
  const [popularStatus, setPopularStatus] = useState('initial');
  const [popularData, setPopularData] = useState([]);
  const [newBooksData, setNewBooksData] = useState([]);

  const serviceData = [
    { _id: 'servType1', title: '100% Safe', type: 'percentage' },
    { _id: 'servType2', title: 'Learn Now', type: 'bulb' },
    { _id: 'servType3', title: 'Good Quality', type: 'like' },
    { _id: 'servType4', title: 'Learn Kinya', type: 'globe' },
  ];
  useFocusEffect(
    React.useCallback(() => {
      addScreen('Welcome to Rwanda Books', 'no-back');
      if (status === 'initial') {
        newBooks(1);
        setStatus('fetching');
      }
      if (popularStatus === 'initial') {
        popularBooks(1);
        setPopularStatus('fetching');
      }

      // New Books
      if (getNewBooks.status === 'error') {
        const { error } = getNewBooks;
        if (error.status === 500) {
          setStatus('unknown_error');
        }
        if (error.status === 404) {
          setStatus('no_data');
        }
      }
      if (getNewBooks.status === 'success') {
        setStatus('success');
        setNewBooksData(getNewBooks.results.slice(0, 3));
      }

      // Popular Books
      if (popular.status === 'error') {
        const { error } = popular;
        if (error.status === 500) {
          setPopularStatus('unknown_error');
        }
        if (error.status === 404) {
          setPopularStatus('no_data');
        }
      }
      if (popular.status === 'success') {
        setPopularStatus('success');
        setPopularData(popular.results.books.slice(0, 3));
      }
      setRefreshing(false);
    }, [popular, getNewBooks])
  );

  const onRefresh = () => {
    setRefreshing(true);
    newBooks(1);
    setStatus('fetching');
    popularBooks(1);
    setPopularStatus('fetching');
  };

  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = (
          <>
            <View style={{ alignItems: 'center' }}>{children}</View>
          </>
        );
        break;
      case 'fetching':
        data = (
          <>
            <View style={{ alignItems: 'center' }}>
              <Loader text="New books..." marginTop="4%" />
            </View>
          </>
        );
        break;
      case 'no_data':
        data = (
          <View style={{ alignItems: 'center' }}>
            <Error
              desc="No Books added to the database yet."
              marginTop="4%"
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
              marginTop="4%"
              icon="info"
            />
          </View>
        );
        break;
      default:
        data = (
          <View style={{ alignItems: 'center' }}>
            <Loader text="New books..." marginTop="4%" />
          </View>
        );
    }
    return data;
  };

  const DisplayPopularData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = (
          <>
            <View style={{ alignItems: 'center' }}>{children}</View>
          </>
        );
        break;
      case 'fetching':
        data = (
          <>
            <View style={{ alignItems: 'center' }}>
              <Loader text="Popular books..." marginTop="4%" />
            </View>
          </>
        );
        break;
      case 'no_data':
        data = (
          <View style={{ alignItems: 'center' }}>
            <Error
              desc="No popular books retrieved for now."
              marginTop="4%"
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
              marginTop="4%"
              icon="info"
            />
          </View>
        );
        break;
      default:
        data = (
          <View style={{ alignItems: 'center' }}>
            <Loader text="Popular books..." marginTop="4%" />
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
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                color: '#343a40',
                paddingLeft: 15,
                fontSize: 16.5,
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              New Books
            </Text>
            <DisplayData>
              <FlatList
                keyExtractor={(item) => {
                  item._id;
                }}
                numColumns={3}
                horizontal={false}
                data={newBooksData}
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
              />
              <View style={{ alignItems: 'center' }}>
                <Btn
                  onPress={() => {
                    requestAnimationFrame(() => {
                      navigate('NewBooksScreen');
                    });
                  }}
                  width={170}
                  text="View All"
                  color="#83bb44"
                  tColor="white"
                  padding={10}
                  marginTop={10}
                  radius={20}
                />
              </View>
            </DisplayData>
          </View>
          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                color: '#343a40',
                paddingLeft: 15,
                fontSize: 16.5,
                marginTop: 10,
              }}
            >
              Our Features
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 5,
                marginTop: 12,
              }}
            >
              <FlatList
                keyExtractor={(item, index) => {
                  item._id;
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={serviceData}
                renderItem={({ item }) => {
                  return (
                    <CategoryCard
                      title={item.title}
                      type={item.type}
                      font="bold-type"
                    />
                  );
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 25, marginBottom: 15 }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                color: '#343a40',
                paddingLeft: 15,
                fontSize: 16.5,
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              Current Top 3 Books
            </Text>
            <DisplayPopularData>
              <FlatList
                keyExtractor={(item) => {
                  item._id.Book;
                }}
                numColumns={3}
                horizontal={false}
                data={popularData}
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
              />
              <View style={{ alignItems: 'center' }}>
                <Btn
                  onPress={() => {
                    requestAnimationFrame(() => {
                      navigate('PopularBooksScreen');
                    });
                  }}
                  width={170}
                  text="View All"
                  color="#83bb44"
                  tColor="white"
                  padding={10}
                  marginTop={10}
                  marginBottom={10}
                  radius={20}
                />
              </View>
            </DisplayPopularData>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const mapStateToProps = ({ popularBooks, newBooks }) => ({
  popularBooks,
  newBooks,
});

export default connect(mapStateToProps, { popularBooksAction, newBooksAction })(
  HomeScreen
);
