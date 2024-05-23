import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Pokimon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('');
  const [rairty, setRarity] = useState('');
  const [set, setSet] = useState('');
  const [searchPokimon, setSearchPokimon] = useState('');
  const [filteredPokimon, setFilteredPokimon] = useState([]);

  useEffect(() => {
    const getPokimon = () => {
      axios
        .get('https://api.pokemontcg.io/v2/cards?page=1&pageSize=20')
        .then(res => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          console.log('Pokimon Error is', err);
          setError(err);
          setLoading(false);
        });
    };
    getPokimon();
  }, []);

  console.log('Data=>>>>', data);

  const handleRarityChange = value => {
    setRarity(value);
  };
  const handleSetChange = value => {
    setSet(value);
  };
  const handleTypeChange = value => {
    setType(value);
  };
  const handleSearchChange = value => {
    setSearchPokimon(value);

    setTimeout(() => {
      const formattedValue = value.toLowerCase();
      const filteredData = data.filter(pokemon =>
        pokemon.name.toLowerCase().includes(formattedValue),
      );
      setFilteredPokimon(filteredData);
      setData(filteredPokimon);
    }, 800);
  };

  const pokimonView = ({item}) => {
    return (
      <View style={styles.pokimonContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.images.large}} style={styles.image} />
        </View>
        <View style={styles.opacityContainer}>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 21,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              marginBottom: 10,
              color: 'steelblue',
              fontWeight: '900',
              fontSize: 16,
            }}>
            {item.rarity}
          </Text>
          <View style={styles.costContain}>
            <Text style={{color: 'grey', fontSize: 16, fontWeight: '500'}}>
              <Text style={{color: 'gold', marginRight: 5}}>$</Text>
              {item.set.printedTotal}
            </Text>
            <Text style={{color: 'grey', fontSize: 16, fontWeight: '500'}}>
              Left: {item.set.total}
            </Text>
          </View>
          <Pressable style={{opacity: 1}}>
            <Text style={styles.selectText}>Select Card</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  // const ListHeaderComponent = () => (
  //   <View>
  //     <View style={styles.headerContainer}>
  //       <Text style={styles.headerText}>TCG Marketplace</Text>
  //       <Image
  //         source={{
  //           uri: 'https://s.yimg.com/ny/api/res/1.2/WZjfc1SW3vlhLcIeXvEkPw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTM1MjtjZj13ZWJw/https://media.zenfs.com/en/business-wire.com/12aab0420191f74386634e5de1ccd6ab',
  //         }}
  //         style={styles.logoImage}
  //       />
  //     </View>
  //     <View style={styles.searchContainer}>
  //       <TextInput
  //         style={styles.searchBox}
  //         placeholder="name"
  //         value={searchPokimon}
  //         onChangeText={text => {
  //           handleSearchChange(text);
  //         }}
  //       />
  //     </View>
  //     <View style={styles.pickerContainer}>
  //       <View style={styles.pickerWrapper}>
  //         <Picker
  //           selectedValue={type}
  //           style={styles.picker}
  //           onValueChange={handleTypeChange}>
  //           <Picker.Item label="Type" value="" />
  //           <Picker.Item label="Common" value="Common" />
  //           <Picker.Item label="Uncommon" value="Uncommon" />
  //           <Picker.Item label="Rare" value="Rare" />
  //           <Picker.Item label="Ultra Rare" value="Ultra Rare" />
  //         </Picker>
  //       </View>
  //       <View style={styles.pickerWrapper}>
  //         <Picker
  //           selectedValue={rairty}
  //           style={styles.picker}
  //           onValueChange={handleRarityChange}>
  //           <Picker.Item label="Rairty" value="" />
  //           <Picker.Item label="Common" value="Common" />
  //           <Picker.Item label="Uncommon" value="Uncommon" />
  //           <Picker.Item label="Rare" value="Rare" />
  //           <Picker.Item label="Ultra Rare" value="Ultra Rare" />
  //         </Picker>
  //       </View>
  //       <View style={styles.pickerWrapper}>
  //         <Picker
  //           itemStyle={{fontSize: 10}}
  //           selectedValue={set}
  //           style={styles.picker}
  //           onValueChange={handleSetChange}>
  //           <Picker.Item label="Set" value="" />
  //           <Picker.Item label="Common" value="Common" />
  //           <Picker.Item label="Uncommon" value="Uncommon" />
  //           <Picker.Item label="Rare" value="Rare" />
  //           <Picker.Item label="Ultra Rare" value="Ultra Rare" />
  //         </Picker>
  //       </View>
  //     </View>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        ListHeaderComponent={
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>TCG Marketplace</Text>
              <Image
                source={{
                  uri: 'https://s.yimg.com/ny/api/res/1.2/WZjfc1SW3vlhLcIeXvEkPw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTM1MjtjZj13ZWJw/https://media.zenfs.com/en/business-wire.com/12aab0420191f74386634e5de1ccd6ab',
                }}
                style={styles.logoImage}
              />
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchBox}
                placeholder="name"
                value={searchPokimon}
                onChangeText={text => {
                  handleSearchChange(text);
                }}
              />
            </View>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={type}
                  style={styles.picker}
                  onValueChange={handleTypeChange}>
                  <Picker.Item label="Type" value="" />
                  <Picker.Item label="Common" value="Common" />
                  <Picker.Item label="Uncommon" value="Uncommon" />
                  <Picker.Item label="Rare" value="Rare" />
                  <Picker.Item label="Ultra Rare" value="Ultra Rare" />
                </Picker>
              </View>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={rairty}
                  style={styles.picker}
                  onValueChange={handleRarityChange}>
                  <Picker.Item label="Rairty" value="" />
                  <Picker.Item label="Common" value="Common" />
                  <Picker.Item label="Uncommon" value="Uncommon" />
                  <Picker.Item label="Rare" value="Rare" />
                  <Picker.Item label="Ultra Rare" value="Ultra Rare" />
                </Picker>
              </View>
              <View style={styles.pickerWrapper}>
                <Picker
                  itemStyle={{fontSize: 10}}
                  selectedValue={set}
                  style={styles.picker}
                  onValueChange={handleSetChange}>
                  <Picker.Item label="Set" value="" />
                  <Picker.Item label="Common" value="Common" />
                  <Picker.Item label="Uncommon" value="Uncommon" />
                  <Picker.Item label="Rare" value="Rare" />
                  <Picker.Item label="Ultra Rare" value="Ultra Rare" />
                </Picker>
              </View>
            </View>
          </View>
        }
        ListHeaderComponentStyle={styles.headerText}
        renderItem={pokimonView}
        data={data}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Pokimon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  pokimonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
    backgroundColor: 'lightgrey',
  },
  imageContainer: {
    backgroundColor: 'orange',
    borderRadius: 5,
    flex: 1,
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  opacityContainer: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
    zIndex: -3,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 10,
    top: 235,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  costContain: {
    width: 150,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
  },
  selectText: {
    position: 'absolute',
    bottom: -27,
    alignSelf: 'center',
    backgroundColor: 'orange',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 17,
    fontWeight: 'bold',
    opacity: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  logoImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    marginBottom: -30,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  searchContainer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  searchBox: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: 'grey',
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerWrapper: {
    width: '33%',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: 'grey',
    justifyContent: 'center',
  },
  picker: {
    fontSize: 5,
    width: '100%',
    height: 40,
  },
  pickerItem: {
    fontSize: 5,
  },
});
