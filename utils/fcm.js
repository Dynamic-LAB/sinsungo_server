const User = require('../models/user.model');
const Notification = require('../models/notification.model');
const admin = require('firebase-admin');

module.exports = sendPush = (messageData) => {
    User.findAll(Object.keys(messageData), (err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            const tokens = data.map(d => d.map(d => d.push_token));
            sendNotification(tokens, messageData);
        }
    });
};

function sendNotification(tokens, data) {
    const notifications = [];

    Object.entries(data).forEach((d, i) => {
        if (tokens[i].length > 0) {
            Object.entries(d[1]).forEach(m => {
                const message = {};

                if (m.length === 1) {
                    message["data"] = {
                        title: "유통기한 알림",
                        body: `유통기한이 ${m[1][0].date}일 남은 ${m[1][0].name}이(가) 있습니다`
                    };
                } else {
                    message["data"] = {
                        title: "유통기한 알림",
                        body: `유통기한이 ${m[1][0].date}일 남은 재료들이 있습니다`
                    };
                }

                notifications.push([message["data"].body, d[0]]);

                admin.messaging()
                    .sendToDevice(tokens[i], message)
                    .then((res) => {
                        console.log("Successfully sent message : ", res);
                    })
                    .catch((err) => {
                        console.log("Error sending message : ", err);
                    });
            });
        }
    });

    Notification.create(notifications, (err) => {
       if (err) {
           console.log(err.message);
       }
    });
}