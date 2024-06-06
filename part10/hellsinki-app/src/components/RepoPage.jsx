import { Text, FlatList, StyleSheet, View } from 'react-native'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY, GET_REPOSITORY_REVIEWS } from '../graphql/queries';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';

const RepoPage = () => {
    const { id } = useParams(); 
    const repository = useQuery(GET_REPOSITORY, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });

    const reviews = useQuery(GET_REPOSITORY_REVIEWS, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
        const canFetchMore = !reviews.loading && reviews.data.repository.reviews.pageInfo.hasNextPage;

        console.log(canFetchMore);
        if (!canFetchMore) {
        return;
        }

        reviews.fetchMore({
          variables: {
            after: reviews.data.repository.reviews.pageInfo.endCursor,
            variables: { id },
          },
        });
    };
    
    if (repository.error || reviews.error) {
        console.log(repository.error);
        return;
    } 
    if (repository.loading || reviews.loading) {
        return (
            <View style={styles.loading}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={ reviews.data.repository.reviews.edges }
            renderItem={({ item }) => <ReviewItem review={item}  />}
            keyExtractor={({ node: { id } }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
            onEndReached={ handleFetchMore }
            onEndReachedThreshold={0}
        />
    )
}

const styles = StyleSheet.create({
    loading: {
        fontSize: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default RepoPage