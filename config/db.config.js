const mysql = require('mysql2');

const db = 	mysql.createPool({
	//host 로컬 테스트를 위해선  IP , 서버에서는 localhost
	host: "158.247.218.140",
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