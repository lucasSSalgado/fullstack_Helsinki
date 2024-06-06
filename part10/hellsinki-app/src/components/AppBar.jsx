import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
  },
  press: {
    flexGrow: 1,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const isLoged = ( data?.me === null) ? false : true;
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleLogOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return ( 
    <View style={styles.container}>
      <ScrollView horizontal>
          <Link to="/" style={styles.press}>
              <Text style={styles.text}>Repository</Text>
          </Link>
          { 
            isLoged && 
            <Link to="/review" style={styles.press}>
              <Text style={styles.text}>Create a review</Text>
          </Link>  
          }
          {
            isLoged && 
            <Link to="/myreviews" style={styles.press}>
              <Text style={styles.text}>My reviews</Text>
            </Link>
          }
          <Link to="/signin" style={styles.press}>
              { 
                isLoged ? 
                <Pressable onPress={ handleLogOut }>
                  <Text style={styles.text}>Sign out</Text> 
                </Pressable> :
                <Text style={styles.text}>Sign in</Text> 
              }
          </Link>
          {
            !isLoged &&
            <Link to="/signup" style={styles.press}>
              <Text style={styles.text}>Sign up</Text>
            </Link>
          }
      </ScrollView>
    </View>
  );
};


export default AppBar;