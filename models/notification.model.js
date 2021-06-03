const db = require('../config/db.config');

module.exports = class Notification {
    constructor(notification) {
        this.content = notification.content;
        this.refrigerator_id = notification.refrigerator_id;
    }

    static create(notifications, result) {
        db((conn) => {
            conn.query("INSERT INTO `notification`(`content`, `refrigerator_id`) VALUES ?",
                [notifications],
                (err, res) => {
                    if (err) {
                        result(err, null);
                        return;
                    }
                    result(null);
                });
            conn.release();
        });
    }

    static findAll(id, result) {
        db((conn) => {
            conn.execute("SELECT `id`,`content` FROM `notification` WHERE `refrigerator_id` = ?", [id], (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }

                result(null, res);
            });
            conn.release();
        });
    };
    static delete(id, result) {
        db((conn) => {
            conn.execute("DELETE FROM `notification` WHERE (`id` = ?)", [id], (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                result(null, res);
            });
            conn.release();
        });
    };
};