import I18n from 'react-native-i18n'

I18n.fallbacks = true
console.log(I18n.locale)
// I18n.js
I18n.translations = {
  en: require('./lang/en.json'),
  sv: require('./lang/sv.json'),
  ar: require('./lang/ar.json'),
  fa: require('./lang/fa.json')
}

export default I18n
