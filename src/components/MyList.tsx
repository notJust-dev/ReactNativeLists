import character from '../data/character.json';
import CharacterListItem from './CharacterListItem';

const MyList = () => {
  return <CharacterListItem character={character.results[0]} />;
};

export default MyList;
