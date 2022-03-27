const { FoodList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    // USER RESOLVERS
    fastFoods: () => {
      return FoodList;
    },
    fastFood: (parent, args) => {
      const name = args.name;
      const food = _.find(FoodList, { name });
      return food;
    },
  },

  Mutation: {
    createFastFood: (parent, args) => {
      const food = args.input;
      const lastId = FoodList[FoodList.length - 1].id;
      food.id = lastId + 1;
      FoodList.push(food);
      return food;
    },

    updatePrice: (parent, args) => {
      const { id, price } = args.input;
      let priceUpdated;
      FoodList.forEach((food) => {
        if (food.id === Number(id)) {
          food.price = price;
          priceUpdated = food;
        }
      });

      return priceUpdated;
    },

    deleteFood: (parent, args) => {
      const id = args.id;
      _.remove(FoodList, (food) => food.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
