import { gql } from "@apollo/client";

export const FETCH_CATEGORIES = gql`
  query {
    categoryResolver {
      id
      name
      videos {
        id  
        title
        url
      }
    }
  }
`;

export const UPLOAD_VIDEO = gql`
  mutation ($input: CreateVideoInput!) {
    createVideo(input: $input) {
        video {
            id  
            title
            url
        }
    }
  }
`;
