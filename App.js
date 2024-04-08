import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowUp, faArrowDown, faArrowLeft, faWalking } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [currentMazeIndex, setCurrentMazeIndex] = useState(0);


  const mazes = [
    [
      [0, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 0, 0]
    ],
    [
      [0, 1, 1, 1, 1],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 0, 0]
    ],
    [
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 0, 0]
    ],
    [
      [0, 1, 1, 1, 1],
      [0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0]
    ],
    [
      [0, 1, 1, 1, 1],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 0, 0]
    ]
  ];

  const isPositionValid = (x, y) => {
    const maze = mazes[currentMazeIndex];
    return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && maze[x][y] === 0;
  };

  const movePlayer = (direction) => {
    let newPosition = { ...playerPosition };

    switch (direction) {
      case 'up':
        if (isPositionValid(newPosition.x - 1, newPosition.y)) newPosition.x -= 1;
        break;
      case 'down':
        if (isPositionValid(newPosition.x + 1, newPosition.y)) newPosition.x += 1;
        break;
      case 'left':
        if (isPositionValid(newPosition.x, newPosition.y - 1)) newPosition.y -= 1;
        break;
      case 'right':
        if (isPositionValid(newPosition.x, newPosition.y + 1)) newPosition.y += 1;
        break;
      default:
        break;
    }

    if (newPosition.x === mazes[currentMazeIndex].length - 1 && newPosition.y === mazes[currentMazeIndex][0].length - 1) {
      setShowCongratulations(true);
    }

    if (isPositionValid(newPosition.x, newPosition.y)) {
      setPlayerPosition(newPosition);
    }
  };

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setShowCongratulations(false);
    setCurrentMazeIndex(0);
  };

  useEffect(() => {
    if (showCongratulations && currentMazeIndex < mazes.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentMazeIndex(currentMazeIndex + 1);
        setPlayerPosition({ x: 0, y: 0 });
        setShowCongratulations(false);
      }, 2000); // Mudança de fase após 2 segundos

      return () => clearTimeout(timeout);
    } else if (currentMazeIndex === mazes.length - 1 && showCongratulations) {
      Alert.alert('Parabéns', 'Você completou todos os percursos!');
    }
  }, [showCongratulations, currentMazeIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Labirinto</Text>
      <View style={styles.maze}>
        {mazes[currentMazeIndex].map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <View style={[styles.cell, cell === 1 && styles.wall]} key={cellIndex}></View>
            ))}
          </View>
        ))}
        <View
          style={{
            ...styles.player,
            left: playerPosition.y * 60,
            top: playerPosition.x * 60
          }}
        >
          <View style={styles.playerIconContainer}>
            <FontAwesomeIcon icon={faWalking} style={styles.playerIcon} size={36} />
          </View>
        </View>
      </View>
      {showCongratulations && (
        <Text style={styles.congratulationsText}>Parabéns você conseguiu!</Text>
      )}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={() => movePlayer('up')}>
          <View style={styles.controlIconContainer}>
            <FontAwesomeIcon icon={faArrowUp} style={styles.controlIcon} size={36} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => movePlayer('down')}>
          <View style={styles.controlIconContainer}>
            <FontAwesomeIcon icon={faArrowDown} style={styles.controlIcon} size={36} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => movePlayer('left')}>
          <View style={styles.controlIconContainer}>
            <FontAwesomeIcon icon={faArrowLeft} style={styles.controlIcon} size={36} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => movePlayer('right')}>
          <View style={styles.controlIconContainer}>
            <FontAwesomeIcon icon={faArrowRight} style={styles.controlIcon} size={36} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.restartButton} onPress={resetGame}><Text>Reiniciar Jogo</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  maze: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black'
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'black'
  },
  wall: {
    backgroundColor: 'black'
  },
  player: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerIcon: {
    color: '#E1374C' // Altere a cor conforme necessário
  },
  controls: {
    flexDirection: 'row'
  },
  controlButton: {
    marginHorizontal: 10
  },
  controlIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, // Largura e altura correspondem ao tamanho dos ícones
    height: 60,
  },
  controlIcon: {
    fontSize: 100 // Tamanho maior para o ícone de controle
  },
  restartButton: {
    marginTop: 10
  },
  congratulationsText: {
    fontSize: 20,
    marginTop: 20
  }
});

export default App;