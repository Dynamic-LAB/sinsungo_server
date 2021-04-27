const mysql = require('mysql2');

const db = 	mysql.createPool({
	host: "localhost",
	user: "sinseon0204",
	password: "sinseongo^^**!0204",
	database: "sinseongodb",
	multipleStatements: true,
	dateStrings: "date"
});

function getConnection(callback) {
	db.getConnection((err, conn) => {
		if (err) {
			throw error;
		} else {
			callback(conn);
		}
	})
}

module.exports = getConnection;