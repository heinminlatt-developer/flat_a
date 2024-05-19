import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Flatapi = () => {
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
  console.log('Data=>>>>>', data);

  const photoShow = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
            }}
            style={styles.image}
          />
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>FlatList</Text>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={data}
          renderItem={photoShow}
        />
      </SafeAreaView>
    </View>
  );
};

export default Flatapi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  flatListContainer: {
    backgroundColor: '#70a1ff',
    width: '100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
    borderRadius: 30,
  },
  image: {
    width: '100%',
    borderRadius: 0,
    height: 220,
    marginTop: 0,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 0,
    paddingTop: 30,
  },
});
