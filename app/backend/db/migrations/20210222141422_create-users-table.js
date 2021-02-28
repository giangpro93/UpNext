
exports.up = function(knex) {
return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('firstName')
            .notNullable();
        tbl.string('lastName')
            .notNullable();
        tbl.string('email')
            .notNullable()
            .unique();
        tbl.string('passwordHash')
            .notNullable();
        tbl.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};
