import React from 'react'
import moment from 'moment'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles'
import i18n from '../i18n'

export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }
    _onPress() {
        if (this.props.onPress instanceof Function) {
            this.props.onPress(this.props.id)
        }
    }
    render() {
        let {name, description, time} = this.props
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View elevation={2} style={{height: '100%', flex: 1, padding: 12}}>
                    <View style={styles.box}>
                        <View style={styles.boxHeader}>
                            <Text style={styles.boxHeaderText}>{name}</Text>
                        </View>
                        <View style={styles.boxContent}>   
                            
                            <Text style={{flex: 1}}>{description}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1}}></View>
                                {time &&
                                    <Text style={{opacity: 0.5}}>{moment(time).fromNow()}</Text>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}