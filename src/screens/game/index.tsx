import { useAtom } from 'jotai';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'; import { Colors } from "react-native/Libraries/NewAppScreen";
import { currentPlayerAtom, gameTableAtom, remainingMovesAtom } from '../../contexts/game';
import { Player } from '../../contexts/types/game';
import { NavigationProp } from '@react-navigation/native';

function Game(
  { navigation }: { navigation: NavigationProp<any> }

) {
  const [tableGame, setTableGame] = useAtom(gameTableAtom);
  const [currentPlayer, setCurrentPlayer] = useAtom(currentPlayerAtom);
  const [remainingMoves, setRemainingMoves] = useAtom(remainingMovesAtom);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const play = (row: number, column: number) => {
    tableGame[row][column] = currentPlayer;
    setTableGame([...tableGame]);

    setCurrentPlayer(state => state === Player.X ? Player.O : Player.X);
    checkWinner(tableGame, row, column);
  }

  const checkWinner = (tableGame: Array<Array<string>>, row: number, column: number) => {
    if (
      tableGame[row][0] !== '' &&
      tableGame[row][0] === tableGame[row][1] &&
      tableGame[row][1] === tableGame[row][2]
    ) {
      return endGame(tableGame[row][0]);
    }

    if (
      tableGame[0][column] !== '' &&
      tableGame[0][column] === tableGame[1][column] &&
      tableGame[1][column] === tableGame[2][column]
    ) {
      return endGame(tableGame[0][column]);
    }

    if (
      tableGame[0][0] !== '' &&
      tableGame[0][0] === tableGame[1][1] &&
      tableGame[1][1] === tableGame[2][2]
    ) {
      return endGame(tableGame[0][0]);
    }

    if (
      tableGame[0][2] !== '' &&
      tableGame[0][2] &&
      tableGame[1][1] &&
      tableGame[1][1] === tableGame[2][0]
    ) {
      return endGame(tableGame[0][2]);
    }

    if (remainingMoves - 1 === 0) {
      return endGame('');
    }

    setRemainingMoves(state => state - 1);
  }

  const endGame = (winner: string) => {
    let modalTitle = "Jogo finalizado!";
    let modalMessage = `Parabéns jogador ${winner}!`;

    if (winner === '') {
      modalMessage = "Deu velha!";
    }

    return Alert.alert(modalTitle, modalMessage, [
      { text: "Voltar ao menu", onPress: () => navigation.navigate("Home") },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.title}>Jogo da Velha</Text>

      {
        tableGame.map((row, rowNumber) => {
          return (
            <View key={rowNumber} style={styles.inLineItems}>
              {
                row.map((column, columnNumber) => {
                  return (
                    <TouchableOpacity
                      key={columnNumber}
                      style={styles.boxJogador}
                      onPress={() => play(rowNumber, columnNumber)}
                      disabled={column !== ''}>
                      <Text
                        style={column === Player.X ? styles.jogadorX : styles.jogadorO}
                      >
                        {column}
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          )
        })
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
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
    backgroundColor: '#f3f3f3',
    margin: 5,
  },
  jogadorX: {
    fontSize: 40,
    color: '#553FDA',
  },
  jogadorO: {
    fontSize: 40,
    color: '#DA3F3F',
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
  }
});

export default Game;
