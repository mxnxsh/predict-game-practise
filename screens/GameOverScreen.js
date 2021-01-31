import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText> Game is over!!</TitleText>
      <View style={styles.imageContainer}>
        {/* <Image source={require('../assets/images/success.png')} style={styles.image} /> */}
        <Image source={{
          uri: 'https://i.insider.com/5a2586ab3339b038248b45ab?width=1100&format=jpeg&auto=webp'
        }} style={styles.image} />
      </View>
      <View style={styles.resultConatiner}>
        <BodyText style={styles.resultText}> Your phone needed<Text style={styles.highlight}> {props.roundsNumber}</Text> rounds to guess the number<Text style={styles.highlight}> {props.userNumber}</Text>.
      </BodyText>
        <BodyText style={styles.resultText}>You lie to the computer <Text style={styles.highlight}>{props.numberOfMistake}</Text> numbers of times.</BodyText>
      </View>

      <MainButton onPress={props.onRestart} >New Game</MainButton>
    </View>
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultConatiner: {
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
})
export default GameOverScreen
