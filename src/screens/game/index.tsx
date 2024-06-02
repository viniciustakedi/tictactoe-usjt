import {useAtom} from 'jotai';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationProp} from '@react-navigation/native';

import {
  currentPlayerAtom,
  gameTableAtom,
  remainingMovesAtom,
  winnerAtom,
} from '../../contexts/game';
import {Player} from '../../contexts/types/game';

import GameIcon from '../../components/game-icons';

function Game({navigation}: {navigation: NavigationProp<any>}) {
  const [currentPlayer, setCurrentPlayer] = useAtom(currentPlayerAtom);
  const [remainingMoves, setRemainingMoves] = useAtom(remainingMovesAtom);
  const [gameTable, setGameTable] = useAtom(gameTableAtom);
  const [winner, setWinner] = useAtom(winnerAtom);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const play = (row: number, column: number) => {
    gameTable[row][column] = currentPlayer;

    setGameTable([...gameTable]);
    setCurrentPlayer(state => (state === Player.X ? Player.O : Player.X));

    checkWinner(gameTable, row, column);
  };

  const checkWinner = (
    gameTable: Array<Array<string>>,
    row: number,
    column: number,
  ) => {
    if (
      gameTable[row][0] !== '' &&
      gameTable[row][0] === gameTable[row][1] &&
      gameTable[row][1] === gameTable[row][2]
    ) {
      return endGame(gameTable[row][0]);
    }

    if (
      gameTable[0][column] !== '' &&
      gameTable[0][column] === gameTable[1][column] &&
      gameTable[1][column] === gameTable[2][column]
    ) {
      return endGame(gameTable[0][column]);
    }

    if (
      gameTable[0][0] !== '' &&
      gameTable[0][0] === gameTable[1][1] &&
      gameTable[1][1] === gameTable[2][2]
    ) {
      return endGame(gameTable[0][0]);
    }

    if (
      gameTable[0][2] !== '' &&
      gameTable[0][2] === gameTable[1][1] &&
      gameTable[1][1] === gameTable[2][0]
    ) {
      return endGame(gameTable[0][2]);
    }

    if (remainingMoves - 1 === 0) {
      return endGame('');
    }

    setRemainingMoves(state => state - 1);
  };

  const endGame = (winner: string) => {
    let message = `Parabéns jogador ${winner}!`;
    const winnerEnum: Player | null =
      winner === Player.X ? Player.X : winner === Player.O ? Player.O : null;

    if (winner === '') {
      message = 'Deu velha!';
    }

    setWinner({winner: winnerEnum, message});
    navigation.navigate('Winner');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.title}>Jogo da Velha</Text>
      {gameTable.map((row, rowNumber) => {
        return (
          <View key={rowNumber} style={styles.inLineItems}>
            {row.map((column, columnNumber) => {
              return (
                <TouchableOpacity
                  key={columnNumber}
                  style={styles.boxJogador}
                  onPress={() => play(rowNumber, columnNumber)}
                  disabled={column !== ''}>
                  {column === Player.X ? (
                    <GameIcon symbol={Player.X} width={90} height={90} />
                  ) : column === Player.O ? (
                    <GameIcon symbol={Player.O} width={90} height={90} />
                  ) : (
                    <Text>{''}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    color: '#555',
    marginTop: 20,
  },
  boxJogador: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#f3f3f3',
    margin: 5,
  },
  inLineItems: {
    flexDirection: 'row',
  },
  btnMenu: {
    marginTop: 20,
  },
  txtBtnMenu: {
    color: '#4E6FE4',
  },
  ganhador: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Game;
