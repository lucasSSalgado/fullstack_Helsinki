import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const ReviewItem = ({ review, refetch }) => {
    const sanitizeDate = review.node.createdAt.slice(0, 10);
    const [mutate] = useMutation(DELETE_REVIEW); 
    const navigate = useNavigate();

    const handleAlert = () => {
        Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            {
              text: 'Delete', 
              onPress: async () => {
                try {
                    await handleDelete();
                  } catch (e) {
                    console.log(e);
                  }
                } 
            },
        ]);
    }
    const handleDelete = async () => {
        console.log('aqui')
        try {
            await mutate({ variables: { deleteReviewId: review.node.id } });
        } catch (e) {
            console.log(e);
        }
        await refetch();
    }
    const handleNavigation = () => {
        const navId = review.node.id.split('.')[1] + '.' + review.node.id.split('.')[2];
        navigate(`/${navId}`);
    }

    console.log(refetch)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.circle}>{review.node.rating}</Text>
                <Text>{review.node.user.username}</Text>
                <Text>{sanitizeDate}</Text>
            </View>
            <Text>{review.node.text}</Text>
            <View style={styles.btns}>
                <Pressable onPress={ handleNavigation } style={styles.view}>
                    <Text style={styles.btnText}>View repository</Text>
                </Pressable>
                <Pressable onPress={ handleAlert } style={styles.delete}>
                    <Text style={styles.btnText}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        marginTop: 15
    },
    header: {
        flexDirection: 'row',
        width: '95%',
        gap: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt: {
        textAlign: 'center'
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderBlockColor: 'blue',
        textAlign: 'center',
        lineHeight: 45,
        backgroundColor: 'white'
    },
    btns: {
        flexDirection: 'row',
        width: '95%',
        gap: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: 'white'
    },
    view: {
        backgroundColor: 'blue',
        width: 150,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        padding: 10
    },
    delete: {
        backgroundColor: 'red',
        width: 150,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        padding: 10
    }
})

export default ReviewItem