const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove
}

function find() {
    return db("users");
}

function findById(id) {
    return db.select('*').from('users').where({id}).first();
} 

function findPosts(id) {
    return  db("users as u")
    .join("posts as p", "p.user_id", "u.id")
    .select("p.id", "u.username", "p.contents")
    .where({user_id: id})
}

function add(user) {
     return db('users').insert(user)
     .then(ids => {
         return findById(ids[0]);
     });
}

function update(changes, id) {
    return db("users")
    .where({id})
    .update(changes)
    .then(count => {return findById(id)})
}

function remove(id){
    return  db("users")
    .where({ id })
    .del();
}