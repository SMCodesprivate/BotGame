let users = new Array();
function add(id, type) {
    users.push({ id, type, level: 0 });
    return users[is(id).position];
}

function remove(id) {
    var { position } = is(id);
    users.splice(position, 1);
    return users[position];
}

function is(id) {
    var tt = false,
    position = -1;
    for(var x = 0;x <= users.length-1;x++) {
        if(users[x].id == id) {
            tt = true;
            position = x;
        }
    }
    var infos = { tt, position, infos: users[position] };
    return infos;
}

function up(id) {
    var { tt, position } = is(id);
    if(tt === false && position === -1) return;
    users[position].level += 1;
    return users[position];
}

module.exports = {
    add,
    remove,
    is,
    up
}