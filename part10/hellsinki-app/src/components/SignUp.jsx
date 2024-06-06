import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const handleCreateUser = async () => {
        try {
          const response = await signUp({ username: formik.values.username, password: formik.values.password });
          if (response.data?.createUser) {
            const { data } = await signIn({ username: formik.values.username, password: formik.values.password });
            console.log(data?.authenticate?.accessToken);
            await authStorage.setAccessToken(data?.authenticate?.accessToken);
            apolloClient.resetStore();
            navigate('/');
          }
        } catch (e) {
          console.log(e);
        }
      };

    const initialValues = {
        username: '',
        password: '',
        confPassword: ''
    }
    const validationSchema = yup.object().shape({
        username: yup.string().required('username is required'),
        password: yup.string().required('password is required'),
        confPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleCreateUser
    })

    return (
    <View style={styles.container}>
        <TextInput 
            style={styles.input}
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
            <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
        )}
        <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
            <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
        )}
        <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Confirm Password"
            value={formik.values.confPassword}
            onChangeText={formik.handleChange('confPassword')}
        />
        {formik.touched.confPassword && formik.errors.confPassword && (
            <Text style={{ color: 'red' }}>{formik.errors.confPassword}</Text>
        )}
        <Pressable style={styles.submitBtn} onPress={formik.handleSubmit}>
            <Text style={styles.submitText}>Sign Up</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {  
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: 300,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    error: {
      height: 40,
      width: 300,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'red',
      padding: 10,
    },
    submitBtn: {
      backgroundColor: 'blue',
      color: 'white',
      width: 100,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 12,
    },
    submitText: {
      color: 'white',
    }
});


export default SignUp