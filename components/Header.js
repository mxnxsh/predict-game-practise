import React from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import Colors from '../constants/colors'
import TitleText from './TitleText'
const Header = props => {
  return (
    <View style={{
      ...styles.headerBase,
      ...Platform.select({
        ios: styles.headerIOS,
        android: styles.headerAndroid
      })
    }}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerIOS: {
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.primary
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? 'black' : 'white',
    fontWeight: 'bold',
  }
})
export default Header