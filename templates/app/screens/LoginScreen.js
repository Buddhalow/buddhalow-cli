import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ActivityIndicator
} from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import Button from '../components/Button'
import PrimaryButton from '../components/PrimaryButton'
import Background from '../components/Background'
import Item from '../components/Item'
import Info from '../components/Info'

import buddhalow from '../buddhalow'
import i18n from '../i18n'
import styles from '../styles'

export default class LoginScreen extends React.Component {
  state = {
      username: '',
      password: '',
      loading: false
  }
  constructor(props) {
      super(props)
      this._onLoginButtonPress = this._onLoginButtonPress.bind(this)
  }
  async _onLoginButtonPress() {
      this.setState({
          loading: true
      })
      let session = await buddhalow.logIn(this.state.username, this.state.password)
      if (!session) {
        this.setState({
            loading: false,
            error: 'error'
        })
        return
      }
      if (this.props.onLoggedIn instanceof Function) {
          this.props.onLoggedIn(session)
      }
  }
  renderContents() {
    if (this.state.loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        )
    }
    return (
        <View style={[styles.center, styles.box, { width: '100%'}]}>
            <View>
                <Text style={{color: 'white'}}>{i18n.t('username')}</Text>
                <TextInput
                    value={this.state.username}
                    style={{color: 'white'}}
                    onChangeText={(username)=> this.setState({username})} />
                <Text style={{color: 'white'}}>{i18n.t('password')}</Text>
                <TextInput
                    value={this.state.password}
                    style={{color: 'white'}}
                    onChangeText={(password)=> this.setState({password})} />
                <PrimaryButton onPress={this._onLoginButtonPress}>{i18n.t('login')}</PrimaryButton>
                <Text style={{color: 'white'}}>{i18n.t('forgot-password')}</Text>
            </View>
        </View>
      )
    }
    render() {
        return (
            <View style={[styles.container, styles.center, { width: '100%'}]}>
                <Background source={require('../assets/images/studying.jpg')} />
                <Image style={{width: '50%', resizeMode: 'contain'}} source={require('../assets/images/logotype.png')} />
                {this.state.error && 
                    <Info type="error">{i18n.t(this.state.error)}</Info>            
                }
                {this.renderContents()}
                <View style={{flex: 1}}></View>
                <Text style={{color: 'white'}}>Version 0.2.8. Developed by Buddhalow</Text>
            </View>
        );
    }
}
