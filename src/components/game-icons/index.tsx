import {Image} from 'react-native';
import {Player} from '../../contexts/types/game';
import {FC} from 'react';

interface GameIconProps {
  symbol: Player;
  height?: number;
  width?: number;
}

const GameIcon: FC<GameIconProps> = ({symbol, height, width}) => {
  return (
    <>
      {symbol === Player.X ? (
        <Image
          source={require('../../assets/icons-png/letter-x.png')}
          style={{width: width || 100, height: height || 100}}
        />
      ) : (
        <Image
          source={require('../../assets/icons-png/letter-o.png')}
          style={{width: width || 100, height: height || 100}}
        />
      )}
    </>
  );
};

export default GameIcon;
