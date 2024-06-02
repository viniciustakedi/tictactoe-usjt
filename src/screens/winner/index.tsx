import {NavigationProp} from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Player} from '../../contexts/types/game';
import {useAtom} from 'jotai';
import {
  currentPlayerAtom,
  gameTableAtom,
  remainingMovesAtom,
  winnerAtom,
} from '../../contexts/game';
import GameIcon from '../../components/game-icons';

function Winner({navigation}: {navigation: NavigationProp<any>}) {
  const [winner, setWinner] = useAtom(winnerAtom);

  const goHome = () => {
    setWinner(null);
    navigation.navigate('Home');
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 48}}>
          {winner?.winner ? (
            <Image
              source={require('../../assets/icons-png/winner.png')}
              style={{width: 100, height: 100}}
            />
          ) : (
            <Image
            source={require('../../assets/icons-png/draw.png')}
            style={{width: 100, height: 100}}
          />
          )}
        </Text>   
        <Text style={{fontSize: 22, marginTop: 10}}>{winner?.message}</Text>
        <TouchableOpacity style={styles.buttonBack} onPress={goHome}>
          <Text style={{fontSize: 18, color: Colors.white, fontWeight: 'bold'}}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonBack: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#4fd1d9',
    borderRadius: 10,
    height: 40,
    width: '50%',
    marginTop: 20,
  },
});

export default Winner;
