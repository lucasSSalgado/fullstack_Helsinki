import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';


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

const SignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const validationSchema = yup.object().shape({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  });
  const initialValues = {
    username: '',
    password: '',
  };
  const signin = async () => {
    try {
      const { data } = await signIn({ username: formik.values.username, password: formik.values.password });
      console.log(data?.authenticate?.accessToken);
      await authStorage.setAccessToken(data?.authenticate?.accessToken);
      apolloClient.resetStore();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: signin,
  });

  return (
    <View style={styles.container}>
      { 
        (formik.touched.username && formik.errors.username) ? 
        <TextInput
          style={styles.error}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        /> :
        <TextInput 
          style={styles.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
      }
      
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}

      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        value={formik.values.height}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.submitBtn} onPress={formik.handleSubmit}>
        <Text style={styles.submitText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;