import React from 'react'
import { TextView } from 'react-native'
import styles from '../styles'

export default class Info extends React.Component {
    render() {
        type = styles[type]
        return (
            <TextView style={[styles.info, type]}>{this.renderContents()}</TextView>
        )
    }
    renderContents() {
        if (typeof(this.props.children) === 'string')  {
            return (
                <Text>{this.props.children.toUpperCase()}</Text>
            )
        } else {
            return this.props.children
        }
    }
}