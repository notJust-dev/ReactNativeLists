import character from '../data/character.json';
import CharacterListItem from './CharacterListItem';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(
    'https://rickandmortyapi.com/api/character'
  );

  const fetchNextPage = async () => {
    setLoading(true);
    const response = await fetch(nextPage);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });
    setNextPage(responseJson.info.next);
    setLoading(false);
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{ gap: 10 }}
      ListFooterComponent={() => (
        <View>
          {loading && <ActivityIndicator />}

          <Text
            onPress={fetchNextPage}
            style={{ alignSelf: 'center', fontSize: 20, color: 'blue' }}
          >
            Load more
          </Text>
        </View>
      )}
    />
  );
};

export default MyList;
