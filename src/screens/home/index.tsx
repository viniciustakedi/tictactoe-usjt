import { NavigationProp } from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Player, gameTableInitialValue } from '../../contexts/types/game';
import { useAtom } from 'jotai';
import {
  currentPlayerAtom,
  gameTableAtom,
  remainingMovesAtom
} from '../../contexts/game';

function Home(
  { navigation }: { navigation: NavigationProp<any> }
) {
  const [_, setCurrentPlayer] = useAtom(currentPlayerAtom);
  const [__, setRemainingMoves] = useAtom(remainingMovesAtom);
  const [___, setGameTable] = useAtom(gameTableAtom);

  const initGame = (player: Player) => {
    setCurrentPlayer(player);
    setRemainingMoves(9);
    setGameTable(gameTableInitialValue);

    navigation.navigate("Game");
  }

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
      <View style={styles.title}>
        <Text>
          Jogo da velha
        </Text>
        <Text>
          Jogador 1, escolha seu lado.
        </Text>
      </View>
      <View style={styles.chosePlayerContainer}>
        <TouchableOpacity
          onPress={() => initGame(Player.X)}
          style={styles.symbolButton}
        >
          <Text>
            X
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => initGame(Player.O)}
          style={styles.symbolButton}
        >
          <Text>
            O
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    alignItems: "center",
    height: 300
  },
  chosePlayerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    height: 200
  },
  symbolButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red"
  },
});

export default Home;
