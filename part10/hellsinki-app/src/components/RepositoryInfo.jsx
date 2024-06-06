import { View, StyleSheet, Image, Text, Pressable } from 'react-native'
import * as Linking from 'expo-linking';

const RepositoryInfo = ({ repository }) => {
    const repo = repository.data.repository;

    const handleGitNavegation = () => {
        Linking.openURL(repo.url);
    }
    
    if (repo.stargazersCount > 1000) {
        repo.stargazersCount = (repo.stargazersCount/1000).toFixed(1) + 'K'
    }
    if (repo.forksCount > 1000) {
        repo.forksCount = (repo.forksCount/1000).toFixed(1) + 'K'
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image style={styles.logo} source={{uri: repo.ownerAvatarUrl}}></Image>
                <View style={styles.info}>
                    <Text color={'primary'}>{repo.fullName}</Text>
                    <Text>Description: {repo.description}</Text>
                </View>
            </View>
            <Text style={styles.language}>{repo.language}</Text>
            <View style={styles.stats}>
                <View>
                    <Text style={styles.center}>{repo.stargazersCount}</Text>
                    <Text>Stars</Text>
                </View>
                <View>
                    <Text style={styles.center}>{repo.forksCount}</Text>
                    <Text>Forks</Text>
                </View>
                <View>
                    <Text style={styles.center}>{repo.reviewCount}</Text>
                    <Text>Review</Text>
                </View>
                <View>
                    <Text style={styles.center}>{repo.ratingAverage}</Text>
                    <Text>Rating</Text>
                </View>
            </View>

            <Pressable onPress={ handleGitNavegation } style={styles.btnLink}>
                <Text style={styles.txt}>Open on Github</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    main: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      marginTop: 15,
    },
    info: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 5,
    },
    language: {
      backgroundColor: 'blue',
      color: 'white',
      padding: 5,
      borderRadius: 5,
      marginTop: 10,
    },
    stats: {
      flex: 1,
      flexDirection: 'row',
      gap: 30,
      padding: 10,
    },
    center: {
      textAlign: 'center'
    },
    btnLink: {
      backgroundColor: 'blue',
      color: 'white',
      padding: 20,
      borderRadius: 10,
    },
    txt: {
      color: 'white',
      textAlign: 'center'
    }
});

export default RepositoryInfo