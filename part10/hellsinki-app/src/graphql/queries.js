import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
              id
              ownerAvatarUrl
              forksCount
              stargazersCount
              fullName
              description
              language
              reviewCount
              ratingAverage
            }
        }
    }
  }
`;

export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      ownerAvatarUrl
      forksCount
      stargazersCount
      fullName
      description
      language
      reviewCount
      ratingAverage
      url
    }
  }
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query ($id: ID!, $first: Int = 3, $after: String) {
    repository(id: $id) {
      id
      reviews (first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        },
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  },
`;

export const GET_REPOS_BY_CRITERIA = gql`
  query ($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          id
          ownerAvatarUrl
          forksCount
          stargazersCount
          fullName
          description
          language
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const GET_REPOS_BY_KEYWORD = gql`
  query ($searchKeyword: String) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          ownerAvatarUrl
          forksCount
          stargazersCount
          fullName
          description
          language
          reviewCount
          ratingAverage
        }
      }
  }
}`;