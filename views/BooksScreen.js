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
import Loader from '../components/utilities/Loader';
import Error from '../components/utilities/Error';
import { useFocusEffect } from '@react-navigation/native';
import fetchCategoriesAction from '../redux/actions/categories/fetchCategories';

const BooksScreen = ({
  addScreen,
  navigation: { navigate },
  fetchCategories,
  fetchCategoriesAction: getCategories,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState('initial');
  const [categoriesData, setCategoriesData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      addScreen('Books', 'no-back');
      if (status === 'initial') {
        getCategories();
        setStatus('fetching');
      }
      if (fetchCategories.status === 'error') {
        const { error } = fetchCategories;
        if (error.status === 500) {
          setStatus('unknown_error');
        }
        if (error.status === 404) {
          setStatus('no_data');
        }
      }
      if (fetchCategories.status === 'success') {
        setStatus('success');
        setCategoriesData(fetchCategories.results);
      }
      setRefreshing(false);
    }, [fetchCategories])
  );

  const onRefresh = () => {
    setRefreshing(true);
    getCategories();
    setStatus('fetching');
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
              <Loader text="Loading categories..." marginTop="4%" />
            </View>
          </>
        );
        break;
      case 'no_data':
        data = (
          <View style={{ alignItems: 'center' }}>
            <Error
              desc="No Categories added to the database yet."
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
            <Loader text="Loading categories..." marginTop="4%" />
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
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 5,
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                requestAnimationFrame(() => {
                  navigate('AllBooksScreen');
                });
              }}
            >
              <CategoryCard title="All Books" type="all" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                requestAnimationFrame(() => {
                  navigate('FavoritesScreen');
                });
              }}
            >
              <CategoryCard title="Favorite Books" type="fav" />
            </TouchableOpacity>
          </View>

          {/* Category Books */}
          <View style={{ marginTop: 0 }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                color: '#343a40',
                paddingLeft: 15,
                fontSize: 16.5,
                marginTop: 10,
              }}
            >
              Category Books
            </Text>
            <DisplayData>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  marginTop: 12,
                }}
              >
                <FlatList
                  keyExtractor={(item) => {
                    item._id;
                  }}
                  numColumns={3}
                  horizontal={false}
                  data={categoriesData}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          requestAnimationFrame(() => {
                            navigate('CategoryBooksScreen', {
                              category: item.categName,
                            });
                          });
                        }}
                      >
                        <CategoryCard title={item.categName} type="category" />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </DisplayData>
          </View>

          {/* Popular & New Books */}
          <View style={{ marginTop: 0 }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                color: '#343a40',
                paddingLeft: 15,
                fontSize: 16.5,
                marginTop: 10,
              }}
            >
              Popular & New Books
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 5,
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  requestAnimationFrame(() => {
                    navigate('NewBooksScreen');
                  });
                }}
              >
                <CategoryCard title="New Books" type="new" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  requestAnimationFrame(() => {
                    navigate('PopularBooksScreen');
                  });
                }}
              >
                <CategoryCard title="Popular Books" type="popular" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Paid & Free Books */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                color: '#343a40',
                paddingLeft: 15,
                fontSize: 16.5,
                marginTop: 10,
              }}
            >
              Paid & Free Books
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 5,
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  requestAnimationFrame(() => {
                    navigate('CostBooksScreen', {
                      category: 'Paid',
                    });
                  });
                }}
              >
                <CategoryCard title="Paid Books" type="paid" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  requestAnimationFrame(() => {
                    navigate('CostBooksScreen', {
                      category: 'Free',
                    });
                  });
                }}
              >
                <CategoryCard title="Free Books" type="free" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const mapStateToProps = ({ fetchCategories }) => ({ fetchCategories });

export default connect(mapStateToProps, { fetchCategoriesAction })(BooksScreen);
