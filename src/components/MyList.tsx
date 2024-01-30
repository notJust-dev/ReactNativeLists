import character from '../data/character.json';
import CharacterListItem from './CharacterListItem';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const initialPage = 'https://rickandmortyapi.com/api/character';

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState('');

  const { width } = useWindowDimensions();

  const fetchPage = async (url: string) => {
    if (loading) {
      return;
    }

    console.log('Fetching: ', url);
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });
    setNextPage(responseJson.info.next);
    setLoading(false);
  };

  const onRefresh = () => {
    if (loading) {
      return;
    }
    setItems([]);
    // setNextPage(initialPage);
    fetchPage(initialPage);
  };

  useEffect(() => {
    fetchPage(initialPage);
  }, []);

  const renderItem = useCallback(
    ({ item }) => <CharacterListItem character={item} />,
    []
  );

  const itemHeight = width + 40;

  // Use case: increase impression count for posts
  // that are visible on the screen for more than 0.5 seconds
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: ({ changed, viewableItems }) => {
        changed.forEach((changedItem) => {
          if (changedItem.isViewable) {
            console.log('++ Impression for: ', changedItem.item.id);
          }
        });
      },
    },
  ]);

  if (items.length === 0) {
    // this is only to make the debug prop on FlatList Work
    return null;
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ gap: 5 }}
      onEndReached={() => fetchPage(nextPage)}
      onEndReachedThreshold={5}
      ListFooterComponent={() => loading && <ActivityIndicator />}
      refreshing={loading}
      onRefresh={onRefresh}
      debug
      // removeClippedSubviews={true}
      initialNumToRender={3}
      getItemLayout={(data, index) => ({
        length: itemHeight,
        offset: (itemHeight + 5) * index,
        index,
      })}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      numColumns={2}
    />
  );
};

export default MyList;
