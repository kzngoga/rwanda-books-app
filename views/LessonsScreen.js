import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import LessonCard from '../components/usage/LessonCard';
import Loader from '../components/utilities/Loader';
import Error from '../components/utilities/Error';
import { useFocusEffect } from '@react-navigation/native';
import fetchLessonsAction from '../redux/actions/lessons/fetchLessons';

const LessonsScreen = ({
  addScreen,
  navigation: { navigate },
  fetchLessons: getLessons,
  fetchLessonsAction: fetchLessons,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState('initial');
  const [lessonsData, setLessonsData] = useState([]);
  const [searchLesson, setSearchLesson] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      addScreen('Lessons', 'no-back');
      if (status === 'initial') {
        fetchLessons();
        setStatus('fetching');
      }
      if (getLessons.status === 'error') {
        const { error } = getLessons;
        if (error.status === 500) {
          setStatus('unknown_error');
        }
        if (error.status === 404) {
          setStatus('no_data');
        }
      }
      if (getLessons.status === 'success') {
        setStatus('success');
        setLessonsData(getLessons.results);
      }
      setRefreshing(false);
    }, [getLessons])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchLessons();
    setStatus('fetching');
  };

  const lessons =
    lessonsData && searchLesson
      ? lessonsData.filter((lesson) =>
          lesson.name.toUpperCase().includes(searchLesson.toUpperCase())
        )
      : lessonsData;

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
              <Loader text="Loading lessons..." marginTop="35%" />
            </View>
          </>
        );
        break;
      case 'no_data':
        data = (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Error
              desc="No Lessons added to the database yet."
              marginTop="45%"
              title="No data Found!"
              icon="book"
            />
          </View>
        );
        break;
      case 'unknown_error':
        data = (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
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
            <Loader text="Loading lessons..." marginTop="35%" />
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
              All Lessons
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.inputField}
              placeholder="Type a lesson's name..."
              placeholderTextColor="#727075"
              onChangeText={(text) => {
                setSearchLesson(text);
              }}
            />
          </View>
          <DisplayData>
            <FlatList
              keyExtractor={(item) => {
                item._id;
              }}
              numColumns={3}
              horizontal={false}
              data={lessons}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      requestAnimationFrame(() => {
                        navigate('SingleLessonsScreen', { item });
                      });
                    }}
                  >
                    <LessonCard
                      style={{
                        margin: 5,
                      }}
                      title={item.name}
                      price={item.price}
                      img={item.contentPicture}
                    />
                  </TouchableOpacity>
                );
              }}
            />
            <>
              {lessons.length === 0 && searchLesson ? (
                <Error
                  desc={`
                  No results found for " ${searchLesson} " , try another search`}
                  marginTop="30%"
                  title="No Results Found!"
                  icon="book"
                />
              ) : null}
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

const mapStateToProps = ({ fetchLessons }) => ({ fetchLessons });

export default connect(mapStateToProps, { fetchLessonsAction })(LessonsScreen);
