import { StyleSheet } from 'react-native'

const manifest = require('./manifest.json')

const foreColor = '#000000'

const backColor = '#ffffff'

const primaryColor = manifest.brand.primary.light

const borderRadius = 28

export default StyleSheet.create({
    button: {
        borderWidth: 3,
        borderRadius: borderRadius,
        padding: 5,
        paddingLeft: 12,
        paddingRight: 12,
    },
    buttonDefault: {
        borderColor: foreColor
    },
    buttonInverseText: {
        color: backColor
    },
    buttonText: {
        color: foreColor
    },
    header: {
        backgroundColor: '#558B2F'
    },
    title: {
        color: '#ffffff'
    },
    buttonPrimary: {
        borderColor: primaryColor,
        backgroundColor: primaryColor
    },
    buttonText: {
        color: 'white'
    },
    buttonInverse: {
        borderColor: backColor,
    },
    box: {
    },
    boxHeader: {
        backgroundColor: '#ffffff88',
        padding: 12
    },
    boxHeaderText: {
        color: primaryColor
    },
    boxContent: {
        backgroundColor: '#ffffffcc',
        padding: 12
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        backgroundColor: '#B2EBF2'
    },
    infoText: {
    
    },
    warning: {
        backgroundColor: '#FFF9C4'
    },
    error: {
        backgroundColor: manifest.brand.error.dark,
        color: manifest.brand.error.light,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    }
})