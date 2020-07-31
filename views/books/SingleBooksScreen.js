import React, { useState } from 'react';
import { View, SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Btn from '../../components/utilities/CustomButton';
import SingleBook from '../../components/display/SingleBook';
import Loader from '../../components/utilities/Loader';
import Error from '../../components/utilities/Error';
import { useFocusEffect } from '@react-navigation/native';
import readBookAction from '../../redux/actions/books/readBook';
import clearBookAction from '../../redux/actions/books/clearSingleBook';

const Books = ({
  addScreen,
  navigation,
  readBookAction: readBook,
  clearBookAction: clearBook,
  readBook: read,
}) => {
  const { item, type } = navigation.state.params;
  let bookId;
  if (type === 'popular') {
    bookId = item._id.Book;
  } else {
    bookId = item._id;
  }

  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState('initial');
  useFocusEffect(
    React.useCallback(() => {
      addScreen('Read Book');
      if (status === 'initial') {
        readBook(bookId);
        setStatus('fetching');
      }
      if (read.status === 'error') {
        const { error } = read;
        if (error.status === 500) {
          setStatus('unknown_error');
        }
        if (error.status === 404) {
          setStatus('no_data');
        }
        if (error.status === 402) {
          setStatus('no_payment');
        }
      }
      if (read.status === 'success') {
        setStatus('success');
      }

      if (read.status === 'clear_read') {
        setStatus('fetching');
      }
      setRefreshing(false);
      return () => {
        const isFocused = navigation.isFocused();
        if (!isFocused) {
          clearBook();
        }
      };
    }, [read])
  );

  const onRefresh = () => {
    setRefreshing(true);
    readBook(bookId);
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
              <Loader text="Wait a Bit..." marginTop="55%" />
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
      case 'no_payment':
        data = (
          <View style={{ alignItems: 'center' }}>
            <Error
              desc="To Read this Book you need to first subscribe."
              title="No Active subscription!"
              marginTop="55%"
              icon="subCard"
            />
            <Btn
              onPress={() => {
                requestAnimationFrame(() => {
                  navigation.navigate('MyWebView', {
                    title: 'Subsrciption Details',
                    url:
                      'http://rwanda-books.herokuapp.com/user/subscription-details',
                  });
                });
              }}
              width={180}
              text="Subscribe"
              color="#83bb44"
              tColor="white"
              padding={10}
              marginTop={20}
              radius={20}
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
            <Loader text="Wait a Bit..." marginTop="55%" />
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
          <DisplayData>
            <SingleBook id={bookId} />
          </DisplayData>
        </ScrollView>
      </View>
    </>
  );
};

const Artist = styled.View`
  align-items: center;
  margin-top: 40px;
`;

const mapStateToProps = ({ readBook }) => ({ readBook });

export default connect(mapStateToProps, { readBookAction, clearBookAction })(
  Books
);
