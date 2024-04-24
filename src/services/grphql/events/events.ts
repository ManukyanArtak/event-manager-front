import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query {
    getEvents {
      id
      name
      description
      date
    }
  }
`;

export const ADD_EVENT = gql`
  mutation ($name: String!, $description: String!, $date: String!) {
    createEvent(
      createEventData: { name: $name, description: $description, date: $date }
    ) {
      id
      name
      description
      date
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation (
    $id: Float!
    $name: String!
    $description: String!
    $date: String!
  ) {
    updateEvent(
      updateEventData: {
        id: $id
        name: $name
        description: $description
        date: $date
      }
    ) {
      id
      name
      description
      date
    }
  }
`;
