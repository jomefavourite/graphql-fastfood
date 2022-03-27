const { gql } = require("apollo-server");

const typeDefs = gql`
  type FastFood {
    id: ID!
    image: String!
    name: String!
    price: Int!
    description: String!
  }

  input CreateFastFood {
    image: String!
    name: String!
    price: Int!
    description: String!
  }

  input UpdatePriceInput {
    id: ID!
    price: String!
  }

  type Query {
    fastFoods: [FastFood!]!
    fastFood(name: String!): FastFood!
  }

  type Mutation {
    createFastFood(input: CreateFastFood!): FastFood
    updatePrice(input: UpdatePriceInput!): FastFood
    deleteFood(id: ID!): FastFood
  }
`;

module.exports = { typeDefs };
