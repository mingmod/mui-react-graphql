import { gql } from "@apollo/client";

export const GET_ALL_STATIONS = gql`
  query getStations {
    stations {
      id
      name
      metrics {
        volume
        margin
        profit
      }
    }
  }
`;
