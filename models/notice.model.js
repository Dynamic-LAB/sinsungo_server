const db = require('../config/db.config');

module.exports = class Notice {
    constructor(notice) {
        this.title = notice.title;
        this.content = notice.content;
        this.date = notice.date;
    }

    static findAll(result) {
        db((conn) => {
            conn.execute("SELECT `title`, `content`, `date` FROM `notice` ORDER BY `date` DESC LIMIT 20",
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
};