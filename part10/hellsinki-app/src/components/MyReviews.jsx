import { useQuery } from '@apollo/client'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { GET_ME } from '../graphql/queries'
import ReviewItem from './ReviewItem'

const MyReviews = () => {
    const { data, loading, error, refetch } = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
        variables: {
            includeReviews: true
        }
    })

    if (loading) return <View style={style.container}><Text>Loading...</Text></View>
    if (error) return 

    return (
        <View style={style.container}>
            <FlatList 
                data={ data.me.reviews.edges }
                renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
                keyExtractor={({ node: { id } }) => id}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default MyReviews