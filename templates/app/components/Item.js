import React from 'react'
import moment from 'moment'
import { TouchableOpacity, View, Text } from 'react-native'

export default class Item extends React.Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }
    _onPress() {
        if (this.props.onPress instanceof Function)
        console.log("ID", this.props.id)
        this.props.onPress(this.props.id)
    }
    render() {
        let {onPress, name, description, time } = this.props
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={{flexDirection: 'column', padding: 12}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                    {time &&
                        <Text style={{opacity: 0.5}}>{moment(time).fromNow()}</Text>
                    }
                    </View>
                    <Text>{name}</Text>
                    <Text style={{flex: 1}}>{description}</Text>
                </View>
            </TouchableOpacity>
        )

    }
}