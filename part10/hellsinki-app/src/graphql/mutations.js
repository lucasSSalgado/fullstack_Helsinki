import { gql } from '@apollo/client';

export const SIGNIN_MUTATION = gql`mutation ($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
        accessToken
    }
}`;

export const CREATE_REVIEW = gql`mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
        repositoryId
    }
}`;

export const CREATE_USER = gql`mutation ($user: CreateUserInput) {
    createUser(user: $user) {
        id
    }
}`;

export const DELETE_REVIEW = gql`mutation ($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId) 
}`