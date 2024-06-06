import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
//import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { GET_REPOS_BY_CRITERIA, GET_REPOS_BY_KEYWORD } from '../graphql/queries';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    width: '100%',
    backgroundColor: '#eee',
  },
  search: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const pickerOptions = ['Last repositories', 'Highest rate', 'Lowest rate'];
  const [order, setOrder] = useState('Last repositories');
  const [search, setSearch] = useState('');
  const [value] = useDebounce(search, 500);
  //tell from which query we are refetching. 0 - by criteria, 1 - by keyword
  const [origen, setOrigen] = useState(0);
  
  const { data: criteriaSearch, loading: criteriaLoading, error: criteriaError, refetch: criteriaRefetch } = useQuery(GET_REPOS_BY_CRITERIA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: order,
      orderDirection: 'DESC',
    }
  }); 

  const { data: keywordSearch, loading: keywordLoading, error: keywordError } = useQuery(GET_REPOS_BY_KEYWORD, {
    fetchPolicy: 'cache-and-network',
    variables: {
      searchKeyword: value
    }
  });

  useEffect(() => {
    if (value) {
      setOrigen(1);
    } else {
      setOrigen(0);
    }
  }, [value])

  useEffect(() => {
    const refechFunc = async () => {
      switch (order) {
        case pickerOptions[0]:
          await criteriaRefetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
          break;
        case pickerOptions[1]:
          await criteriaRefetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
          break;
        case pickerOptions[2]:
          await criteriaRefetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
          break;
        default:
          await criteriaRefetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
          break;
      }
      setOrigen(0);
    }
    refechFunc()
  }, [order]);


  let repositoryNodes = [];
  if (origen === 0 && criteriaSearch && !criteriaError && !criteriaLoading) {
    repositoryNodes = criteriaSearch.repositories.edges.map(edge => edge.node);
  } else if (origen === 1 && keywordSearch && !keywordLoading && !keywordError) {
    repositoryNodes = keywordSearch.repositories.edges.map(edge => edge.node);
  }

  return (
    <>
      <TextInput
        style={styles.search}
        placeholder='search'
        value={ search }
        onChangeText={ text => setSearch(text) }
      />
      <Picker
        style={styles.picker}
        selectedValue={ order }
        mode='dropdown'
        // eslint-disable-next-line no-unused-vars
        onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
      >
        { pickerOptions.map(option => <Picker.Item key={option} label={option} value={option} />) }
      </Picker>
      <FlatList 
        style={style.separator}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem repo={item} />}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const style = StyleSheet.create({
  separator: {
    backgroundColor: '#e1e4e8'
  },
});
  

export default RepositoryList;