import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Button from '../components/Button'
import { View, Text, AsyncStorage } from 'react-native'

import i18n from '../i18n'

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t('account'),
  };
  async _onLogoutClicked() {
    await AsyncStorage.removeItem('session')
  }
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Button onPress={this._onLogoutClicked} title={i18n.t('logout')}>{i18n.t('logout')}</Button>
      </View>
    )
  }
}