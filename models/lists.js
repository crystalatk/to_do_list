const db = require('./conn.js');

class Lists {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static async getAllItems(list_id) {
        try {
            const response = await db.any(`SELECT * FROM items WHERE list_id = '${list_id}';`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addNewList(user_id, name) {
        const query = `INSERT INTO lists (name, user_id) 
        VALUES ('${name}', ${user_id});`;
        try {
            const response = await db.one(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addNewItem(list_id, name) {
        const query = `INSERT INTO items (name, list_id, is_completed) 
        VALUES ('${name}', '${list_id}', FALSE);`;
        try {
            const response = await db.one(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }
};

module.exports = Lists;