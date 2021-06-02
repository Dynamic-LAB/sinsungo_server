const RefrigeratorIngredient = require('../models/refrigeratoringredient.model');
const groupBy = require('json-groupby');
const sendPush = require('../utils/fcm');

module.exports = expiration = () => {
    RefrigeratorIngredient.findAll((err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            const expirations = groupBy(data.filter(ingredient => ingredient.expiration_type === '유통기한')
                .map(expiration => dataProcessing(expiration))
                .filter(data => data.date <= 3 && data.date >= 0), ['refrigerator_id', 'date']);
            sendPush(expirations);
        }
    });
};

// 날짜 차이 계산
function dateDiff(date1, date2) {
    let today = new Date(date1);
    let expirationDate = new Date(date2);

    today =new Date(today.getFullYear(), today.getMonth(), today.getDate());
    expirationDate =new Date(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate());

    let diff = expirationDate.getTime() - today.getTime();
    diff = Math.ceil(diff / (1000 * 3600 * 24));

    return diff;
}

// 데이터 가공
function dataProcessing(data) {
    const newData = {};
    newData["refrigerator_id"] = data.refrigerator_id;
    newData["name"] = data.name;
    newData["date"] = dateDiff(data.today, data.expiration_date);

    return newData;
}