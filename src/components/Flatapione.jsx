import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Flatapione = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=e287d98170a7a175bac2a9806082c07c',
        );
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  console.log('Data=====>', data);

  const renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
          />
        </View>
        <Text style={styles.titleText}>Title: {item.title}</Text>
        <Text style={styles.popularityText}>Popularity: {item.popularity}</Text>
        <Text style={styles.voteText}>Vote: {item.vote_average}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

export default Flatapione;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '47%',
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    borderRadius: 30,
    overflow: 'hidden',
    padding: 15,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 10,
  },
  popularityText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 3,
  },
  voteText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 3,
  },
});
