import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Debug logging
console.log('GraphQL API URL:', graphqlAPI);

// Add URL validation with better error messages
if (!graphqlAPI) {
  console.error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined in environment');
  throw new Error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined');
}

// Ensure the URL is absolute with better error messages
if (!graphqlAPI.startsWith('http://') && !graphqlAPI.startsWith('https://')) {
  console.error('Invalid GraphQL API URL:', graphqlAPI);
  throw new Error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT must be an absolute URL starting with http:// or https://');
}

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query);
    console.log('Posts Result:', result); // Add debugging
    return result.postsConnection.edges;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  try {
    // Verify the graphqlAPI URL
    if (!graphqlAPI) {
      console.error('GraphQL API endpoint is undefined');
      return [];
    }
    
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: { categories_some: { slug: $slug } }) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;

    // Add error handling and logging
    try {
      const result = await request(graphqlAPI, query, { slug });
      return result.postsConnection.edges;
    } catch (error) {
      console.error('GraphQL request failed:', error);
      console.error('GraphQL API URL:', graphqlAPI);
      console.error('Query variables:', { slug });
      return [];
    }
  } catch (error) {
    console.error('getCategoryPost error:', error);
    return [];
  }
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(
        orderBy: createdAt_DESC
        first: 3
      ) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          photo {
            url
          }
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query);
    console.log('Recent Posts Result:', result); // Add this for debugging
    return result.posts;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
};
