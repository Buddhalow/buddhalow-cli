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
    {
        notifications {
            id,
            name,
            description,
            time
        }
    }
`

class Dashboard extends React.Component {
  static navigationOptions = {
     title: i18n.t('dashboard')
  };

  render() {
    if (this.props.loading) {
          return (
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
          )
    }
    if (this.props.error) {
        return (
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <Text>An error occured. Please try again soon</Text>
            </View>
          )
    }
    
    return (
        <View style={[styles.container, {height: '100%'}]}>
            <View elevation={2} style={{height: '100%', flex: 1, padding: 12}}>
                <View style={styles.box}>
                    <View style={styles.boxHeader}>
                        <Text style={styles.boxHeaderText}>{i18n.t('notifications')}</Text>
                    </View>
                    <View style={styles.boxContent}>   
                        <FlatList
                            keyExtractor={(item, i) => item.id}
                            data={this.props.data.notifications}
                            renderItem={({item, i}) => (
                            <Item
                                id={item.id}
                                onPress={(id) => {
                                    this.props.navigation.navigate('Notification', {id: id})
                                    console.log(id)
                                }}
                                name={item.name} 
                                description={item.description} 
                                time={item.time} />
                        )} />              
                    </View>
                </View>
            </View>
        </View>
    );
  }
}

export default graphql(query)(Dashboard)