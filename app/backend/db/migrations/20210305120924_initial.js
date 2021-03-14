exports.up = function(knex) {
    return knex.schema
    .createTable('Entity', tbl => {
        tbl.increments();
        tbl.string('name')
            .notNullable();
        tbl.string('email')
            .notNullable()
            .unique()
        tbl.text('description');
        tbl.binary('image');
        tbl.timestamp('created_at')
            .defaultTo(knex.fn.now());
    })
    .createTable('User', tbl => {
        tbl.integer('id')
            .unsigned()
            .notNullable();
        tbl.string('password_hash')
            .notNullable();
        tbl.foreign('id')
            .references('Entity.id')
            .onDelete('CASCADE');
        tbl.primary('id');
    })
    .createTable('Group', tbl => {
        tbl.integer('id')
            .unsigned()
            .notNullable();
        tbl.foreign('id')
            .references('Entity.id')
            .onDelete('CASCADE');
        tbl.primary('id');
    })
    .createTable('Membership', tbl => {
        tbl.integer('user_id')
            .unsigned()
            .notNullable();
        tbl.integer('group_id')
            .unsigned()
            .notNullable();
        tbl.boolean('is_admin')
            .notNullable();
        tbl.timestamp('created_at')
            .defaultTo(knex.fn.now());
        tbl.foreign('user_id')
            .references('User.id')
            .onDelete('CASCADE');
        tbl.foreign('group_id')
            .references('Group.id')
            .onDelete('CASCADE');
        tbl.primary(['user_id', 'group_id']);
    })
    .createTable('FriendRequest', tbl => {
        tbl.integer('requester_id')
            .unsigned()
            .notNullable();
        tbl.integer('requested_id')
            .unsigned()
            .notNullable();
        tbl.boolean('is_accepted')
            .notNullable()
            .defaultTo(false);
        tbl.timestamp('created_at')
            .defaultTo(knex.fn.now());
        tbl.foreign('requester_id')
            .references('User.id')
            .onDelete('CASCADE');
        tbl.foreign('requested_id')
            .references('User.id')
            .onDelete('CASCADE');
        tbl.primary(['requester_id', 'requested_id']);
    })
    .createTable('ScheduleItem', tbl => {
        tbl.increments();
        tbl.integer('entity_id')
            .unsigned()
            .notNullable();
        tbl.string('title')
            .notNullable();
        tbl.text('description');
        tbl.foreign('entity_id')
            .references('Entity.id')
            .onDelete('CASCADE');
    })
    .createTable('ScheduleEvent', tbl => {
        tbl.integer('id')
            .unsigned()
            .notNullable();
        tbl.time('start')
            .notNullable();
        tbl.time('end')
            .notNullable();
        tbl.foreign('id')
            .references('ScheduleItem.id')
            .onDelete('CASCADE');
        tbl.primary('id');
    })
    .createTable('ScheduleTask', tbl => {
        tbl.integer('id')
            .unsigned()
            .notNullable();
        tbl.time('assigned')
            .notNullable();
        tbl.time('due')
            .notNullable();
        tbl.foreign('id')
            .references('ScheduleItem.id')
            .onDelete('CASCADE');
        tbl.primary('id');
    })
    .createTable('ScheduleReminder', tbl => {
        tbl.integer('id')
            .unsigned()
            .notNullable();
        tbl.time('time')
            .notNullable();
        tbl.integer('link_id')
            .unsigned();
        tbl.foreign('id')
            .references('ScheduleItem.id')
            .onDelete('CASCADE');
        tbl.foreign('link_id')
            .references('ScheduleItem.id')
            .onDelete('CASCADE');
        tbl.primary('id');
    })
    .createTable('Message', tbl => {
        tbl.increments('message_id');
        tbl.integer('sender_id')
            .unsigned()
            .notNullable();
        tbl.integer('receiver_id')
            .unsigned()
            .notNullable();
        tbl.text('content')
            .notNullable();
        tbl.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
        tbl.foreign('sender_id')
            .references('Entity.id')
            .onDelete('CASCADE');
        tbl.foreign('receiver_id')
            .references('Entity.id')
            .onDelete('CASCADE');
    })
    .createTable('Post', tbl => {
        tbl.increments('post_id');
        tbl.integer('creator_id')
            .unsigned()
            .notNullable();
        tbl.text('content')
            .notNullable();
        tbl.integer('context_id')
            .unsigned();
        tbl.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
        tbl.foreign('creator_id')
            .references('Entity.id')
            .onDelete('CASCADE');
        tbl.foreign('context_id')
            .references('Entity.id')
            .onDelete('CASCADE');
    })
};
    
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('ScheduleReminder')
    .dropTableIfExists('ScheduleEvent')
    .dropTableIfExists('ScheduleTask')
    .dropTableIfExists('ScheduleItem')
    .dropTableIfExists('Message')
    .dropTableIfExists('Post')
    .dropTableIfExists('Membership')
    .dropTableIfExists('FriendRequest')
    .dropTableIfExists('User')
    .dropTableIfExists('Group')
    .dropTableIfExists('Entity');
};
