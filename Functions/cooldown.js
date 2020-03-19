let users = new Array();
function add(id) {
    users.push(id);
}

function remove(id) {
    users.splice(users.indexOf(id), 1);
}

function is(id) {
    return users.includes(id);
}

module.exports = {
    add,
    remove,
    is
}