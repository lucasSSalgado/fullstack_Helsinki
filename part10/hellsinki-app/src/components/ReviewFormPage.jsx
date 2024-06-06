import { View, TextInput, Pressable, Text, StyleSheet } from "react-native"
import { useFormik } from 'formik';
import { useMutation } from "@apollo/client";
import * as yup from 'yup';
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from 'react-router-native';

const ReviewFormPage = () => {
    const [mutate] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();

    const createReview = async () => {
        const numRating = Number(formik.values.rating)
        const text = formik.values.review ? formik.values.review : ""

        try {
            const { data } = await mutate({
                variables: {
                    review: {
                        ownerName: formik.values.owner,
                        repositoryName: formik.values.name,
                        rating: numRating,
                        text: text
                    }
                }
            })

            navigate(`/${data.createReview.repositoryId}`);

        } catch(e) {
            console.log("error")
            console.log(e);
        }
    }

    const validationSchema = yup.object().shape({
        owner: yup.string().required('repository owner is required'),
        name: yup.string().required('repository name is required'),
        rating: yup.number().min(0).max(100).required('rating is required'),
        review: yup.string().optional()
    });

    const initialValues = {
        owner: '',
        name: '',
        rating: '',
        review: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: createReview,
    });

    return (
        <View style={style.container}>
            <View>
                <TextInput
                    style={style.input}
                    placeholder="Repository owner name"
                    value={formik.values.owner}
                    onChangeText={formik.handleChange('owner')}
                />
                {formik.touched.owner && formik.errors.owner && (
                    <Text style={{ color: 'red' }}>{formik.errors.owner}</Text>
                )}
                <TextInput
                    style={style.input}
                    placeholder="Repository name"
                    value={formik.values.name}
                    onChangeText={formik.handleChange('name')}
                />
                {formik.touched.name && formik.errors.name && (
                    <Text style={{ color: 'red' }}>{formik.errors.name}</Text>
                )}
                <TextInput
                    style={style.input}
                    placeholder="Rating between 0 and 100"
                    value={formik.values.rating}
                    onChangeText={formik.handleChange('rating')}
                />
                {formik.touched.rating && formik.errors.rating && (
                    <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
                )}
                <TextInput
                    style={style.input}
                    placeholder="Review"
                    value={formik.values.review}
                    onChangeText={formik.handleChange('review')}
                />
                <Pressable onPress={formik.handleSubmit} style={style.submitBtn}>
                    <Text style={style.txtSubmit}>Create a review</Text>
                </Pressable>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    submitBtn: {
        backgroundColor: 'blue',
        color: 'white',
        width: '100%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        padding: 10
    },
    txtSubmit: {
        color: 'white'
    }
})

export default ReviewFormPage