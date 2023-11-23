const { ApolloServer } = require("apollo-server");// Initialize Apollo Server
const { importSchema } = require("graphql-import");// Import schema
const EtherDataSource = require("./datasource/ethDatasource");// Initialize data source
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();






const resolvers = {
  Query: {
    etherBalanceByAddress: (
      root,
      _args,
      { dataSources } // Get ether balance by address
    ) => dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (
      root,
      _args,
      { dataSources } // Get total ether supply
    ) => dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (
      root,
      _args,
      { dataSources } // Get latest ether price
    ) => dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (
      root,
      _args,
      { dataSources } // Get block confirmation time
    ) => dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // Initialize EtherDataSource
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0
server.timeout = 0;

// Start server on port 9000
server.listen("9000").then(({ url }) => {
  // Log message when server is ready
  console.log(`🚀 Server ready at ${url}`);
});
