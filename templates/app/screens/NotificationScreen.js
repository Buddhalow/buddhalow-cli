import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';
import i18n from '../i18n'

import { MonoText } from '../components/StyledText';

import Item from '../components/Item'
import Post from '../components/Post'
import Background from '../components/Background'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import styles from '../styles'

let query = gql`
    query notification($id: String!) {
        notification(id: $id) {
            name,
            description,
            time
        }
    }
`

class Notification extends React.Component {
  static navigationOptions = {
     title: i18n.t('notification')
  };

  render() {
    if (!this.props.data || this.props.data.error) {
        console.log(this.props.data)
        return (
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <Text>An error occured. Please try again soon</Text>
            </View>
          )
    }
    
    if (this.props.data.loading) {
          return (
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
          )
    }
   
    return (
      <View style={[styles.container, {height: '100%'}]}>
                   
      </View>
    );
  }
}

export default graphql(query, {
    options: (ownProps) => ({
        variables: {
            id: ownProps.navigation.state.params.id
        }
    }),
    props: ({ data }) => ({
        data
    }),
    
})(Notification)