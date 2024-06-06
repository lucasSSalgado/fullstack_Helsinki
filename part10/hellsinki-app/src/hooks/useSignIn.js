import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGNIN_MUTATION);
  
    const signIn = async ({ username, password }) => {
      // call the mutate function here with the right arguments
      return await mutate({ variables: { credentials: { username, password } } });
    };
  
    return [signIn, result];
};

export default useSignIn