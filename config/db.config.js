const mysql = require('mysql2');
require('dotenv').config();

const db = 	mysql.createPool({
	//host 로컬 테스트를 위해선  IP , 서버에서는 localhost
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database,
	multipleStatements: true,
	dateStrings: "date"
});

function getConnection(callback) {
	db.getConnection((err, conn) => {
		if (err) {
			throw err;
		} else {
			callback(conn);
		}
	})
}

module.exports = getConnection;