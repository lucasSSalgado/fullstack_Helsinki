import { render, screen } from '@testing-library/react-native';
import RepositoryItem from '../../components/RepositoryItem';

describe('RepositoryList', () => {
    describe('RepositoryListItem', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };

        repositories.edges.forEach((edge) => {
            const node = edge.node;
            render(<RepositoryItem repo={edge.node} />);

            const forkSanitize = node.forksCount > 1000 ? (node.forksCount/1000).toFixed(1) + 'K' : node.forksCount
            const stargazersSanitize = node.stargazersCount > 1000 ? (node.stargazersCount/1000).toFixed(1) + 'K' : node.stargazersCount

            expect(screen.getByText(node.fullName)).toBeDefined();
            expect(screen.getByText('Description: ' + node.description)).toBeDefined()
            expect(screen.getByText(String(forkSanitize))).toBeDefined()
            expect(screen.getByText(String(stargazersSanitize))).toBeDefined()
            expect(screen.getByText(String(node.reviewCount))).toBeDefined()
            expect(screen.getByText(String(node.ratingAverage))).toBeDefined()
        })

        
      });
  });
})
