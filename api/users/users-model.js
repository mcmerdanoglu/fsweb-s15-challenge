const db = require("../../data/dbConfig");

async function getAll() {
  return await db("users");
}

const getByFilter = async (filter) => {
  const user = await db("users").where(filter).first();
  return user;
};

const getByUsername = async (username) => {
  return await db("users").where("users.username", username).first();
};

async function getById(id) {
  return await db("users")
    //.select("user.id", "user.username")
    .where("users.id", id)
    .first();
}

async function add({ username, password }) {
  let created_user_id;
  await db.transaction(async (trx) => {
    const [id] = await trx("users").insert({
      username,
      password,
    });
    created_user_id = id;
  });
  return getById(created_user_id);
}

module.exports = {
  getAll,
  getByFilter,
  getByUsername,
  getById,
  add,
};
