import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './src/components/RepositoryList';
import AppBar from './src/components/AppBar';
import { NativeRouter, Route, Routes } from 'react-router-native';
import SignIn from './src/components/SignIn';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext'; 
import RepoPage from './src/components/RepoPage';
import ReviewFormPage from './src/components/ReviewFormPage';
import SignUp from './src/components/SignUp';
import MyReviews from './src/components/MyReviews';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <View style={styles.container}>
              <AppBar />
              <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/:id" element={<RepoPage />} />
                <Route path="/review" element={<ReviewFormPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/myreviews" element={<MyReviews />} />
              </Routes>
            </View>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
