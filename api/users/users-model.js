const db = require("../../data/dbConfig");

async function getAll() {
  return await db("users");
}

// const getByFilter = async (filter) => {
//   const user = await db("users").where(filter).first();
//   return user;
// };

const getByUsername = async (username) => {
  return await db("users").where("username", username).first();
};

async function getById(id) {
  return await db("users")
    //.select("user.id", "user.username")
    .where("users.id", id)
    .first();
}

async function add(insertedModel) {
  await db("users").insert(insertedModel);
  return getByUsername(insertedModel.username);
}

module.exports = {
  getAll,
  //getByFilter,
  getByUsername,
  getById,
  add,
};
