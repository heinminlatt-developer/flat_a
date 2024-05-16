import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';

const Flatapi = () => {
  [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://pokeapi.co/api/v2/ability/?limit=20&offset=20',
      );
      const data = await response.json();
      setData(data.results);
    };
    fetchData();
  }, []);

  console.log(data);

  const pokimonShow = () => {};
  return (
    <View>
      <FlatList data={data} renderItem={pokimonShow} />
    </View>
  );
};
export default Flatapi;

const styles = StyleSheet.create({});
