import { View, Text, Image, StyleSheet } from 'react-native';
import { Character } from '../types';

type CharacterListItem = {
  character: Character;
};

const CharacterListItem = ({ character }: CharacterListItem) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{character.name}</Text>
      <Image source={{ uri: character.image }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkslategrey',
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default CharacterListItem;
