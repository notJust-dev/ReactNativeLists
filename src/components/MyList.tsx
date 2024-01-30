import character from '../data/character.json';
import CharacterListItem from './CharacterListItem';
import { FlatList, Text } from 'react-native';

const MyList = () => {
  // return <CharacterListItem character={character.results[0]} />;

  return (
    <FlatList
      data={character.results}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};

export default MyList;
