const db = require('../config/db.config');

module.exports = class Notice {
    constructor(notice) {
        this.title = notice.title;
        this.content = notice.content;
        this.date = notice.date;
    }

    static findAll(result) {
        db((conn) => {
            conn.execute("SELECT `id`,`title`, `content`, `date` FROM `notice` ORDER BY `date` DESC",
                (err, res) => {
                    if (err) {
                        result(err, null);
                        return;
                    }

                    result(null, res);
            });
            conn.release();
        });
    };
    static findOne(id,result) {
        db((conn) => {
            conn.execute("SELECT `id`,`title`, `content`, `date` FROM `notice` WHERE `id`= ?",[id],
                (err, res) => {
                    if (err) {
                        result(err, null);
                        return;
                    }

                    result(null, res[0]);
            });
            conn.release();
        });
    };
};