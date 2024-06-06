import { View, StyleSheet, Image, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native';
import Text from './Text'

const RepositoryItem = ({ repo }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/${repo.id}`);
    }

    if (repo.stargazersCount > 1000) {
        repo.stargazersCount = (repo.stargazersCount/1000).toFixed(1) + 'K'
    }
    if (repo.forksCount > 1000) {
        repo.forksCount = (repo.forksCount/1000).toFixed(1) + 'K'
    }

    return (
      <Pressable onPress={ handleNavigation }>
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
        </View>
      </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2,
      gap: 10
    },
    main: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      gap: 10,
      width: '100%'
    },
    info: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 10,
      gap: 10
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
    },
    stats: {
      flexDirection: 'row',
      gap: 30,
      padding: 10,
    },
    center: {
      textAlign: 'center'
    }
});

export default RepositoryItem