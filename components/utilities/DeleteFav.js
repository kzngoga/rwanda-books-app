import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import Btn from '../utilities/CustomButton';
import Icon from '../utilities/Icon';
import LoaderButton from '../utilities/LoaderButton';
import deleteFavoriteAction from '../../redux/actions/favorites/deleteFavorite';

const DeleteFav = ({
  deleteFavoriteAction: deleteFavorite,
  deleteFavorite: deletedFavorite,
  refetch,
  item,
}) => {
  const [submiting, setSubmiting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setSubmiting(false);
      if (deletedFavorite.status === 'success') {
        setModalOpen(false);
        setSubmiting(false);
        refetch();
      }
      if (deletedFavorite.status === 'error') {
        setSubmiting(false);
        return setError([deletedFavorite.error.message]);
      }
    }, [deletedFavorite])
  );

  const handleSubmit = () => {
    deleteFavorite(item._id);
    return setSubmiting(true);
  };

  return (
    <View style={{ marginTop: 4, alignItems: 'center' }}>
      <Btn
        width={80}
        text="Remove"
        color="#f56363"
        tColor="white"
        padding={6}
        marginTop={0}
        radius={5}
        onPress={() => setModalOpen(true)}
      />
      <Modal
        onRequestClose={() => setModalOpen(false)}
        transparent={true}
        visible={modalOpen}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        >
          <View
            style={{
              width: 300,
              height: 200,
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>Remove Book</Text>
              </View>
              <View style={{ position: 'absolute', right: 20, top: -5 }}>
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={() => setModalOpen(false)}
                >
                  <Icon name="cross" width={16} height={16} color="#343a40" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 10,
                paddingTop: 20,
              }}
            >
              <Text
                style={{
                  color: '#343a40',
                  fontSize: 14,
                  textAlign: 'center',
                  fontFamily: 'OpenSans-Regular',
                }}
              >
                Are You Sure You Want To Remove
              </Text>
              <Text
                style={{
                  padding: 10,
                  color: '#343a40',
                  fontSize: 16.5,
                  textAlign: 'center',
                  fontFamily: 'OpenSans-Bold',
                }}
              >
                {item.bookTitle}
              </Text>
              {submiting ? (
                <LoaderButton
                  width={83}
                  fontSize={15}
                  loaderColor="#ffffff"
                  color="#8c8c8c"
                  disabledColor="#8c8c8c"
                  padding={8}
                  loaderSize="small"
                  marginTop={8}
                  radius={5}
                />
              ) : (
                <Btn
                  width={83}
                  text="Proceed"
                  color="#83bb44"
                  tColor="white"
                  padding={8}
                  marginTop={8}
                  radius={5}
                  onPress={handleSubmit}
                />
              )}
              <Text
                style={{
                  color: '#f56363',
                  fontSize: 14,
                  fontFamily: 'OpenSans-Bold',
                }}
              >
                {error}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    color: '#343a40',
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

const mapStateToProps = ({ deleteFavorite }) => ({ deleteFavorite });

export default connect(mapStateToProps, {
  deleteFavoriteAction,
})(DeleteFav);
