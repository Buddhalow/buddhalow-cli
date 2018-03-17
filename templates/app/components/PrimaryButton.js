import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import styles from '../styles'

export default class PrimaryButton extends React.Component {
    render() {
        let style = this.props.style || {}
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.button, styles.buttonPrimary]}>
                    {this.renderContents()}
                </View>
            </TouchableOpacity>
        )
    }
    renderContents() {
        if (typeof(this.props.children) === 'string')  {
            return (
                <Text style={styles.buttonPrimaryText}>{this.props.children.toUpperCase()}</Text>
            )
        } else {
            return this.props.children
        }
    }
} 