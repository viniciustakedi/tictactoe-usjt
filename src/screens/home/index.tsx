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
  ImageBackground,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Player} from '../../contexts/types/game';
import {useAtom} from 'jotai';
import {
  currentPlayerAtom,
  gameTableAtom,
  remainingMovesAtom,
} from '../../contexts/game';
import GameIcon from '../../components/game-icons';

function Home({navigation}: {navigation: NavigationProp<any>}) {
  const [_, setCurrentPlayer] = useAtom(currentPlayerAtom);
  const [__, setRemainingMoves] = useAtom(remainingMovesAtom);
  const [___, setGameTable] = useAtom(gameTableAtom);

  const initGame = (player: Player) => {
    setCurrentPlayer(player);
    setRemainingMoves(9);
    setGameTable([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    navigation.navigate('Game');
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={require('../../assets/bg/bg.jpeg')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Projeto sobre Matrizes - USJT</Text>
        </View>
        <View>
          <Text style={styles.chosePlayerText}>
            Jogador 1, escolha seu lado.
          </Text>
          <View style={styles.chosePlayerContainer}>
            <TouchableOpacity
              onPress={() => initGame(Player.X)}
              style={styles.symbolButton}>
              <GameIcon symbol={Player.X} width={80} height={80} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => initGame(Player.O)}
              style={styles.symbolButton}>
              <GameIcon symbol={Player.O} width={80} height={80} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
  },
  chosePlayerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    height: 100,
  },
  chosePlayerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 18,
    color: Colors.white,
  },
  symbolButton: {
    padding: 5,
    borderRadius: 50,
  },
});

export default Home;
