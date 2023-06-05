/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("users").insert([
    {
      id: 11,
      username: "coskun",
      password: "$2a$10$5n0/oFhAnll7q97m3i3zde.XpmiLDSs.V7tqieOQe4Rkh30446Gym",
    },
  ]);
};
