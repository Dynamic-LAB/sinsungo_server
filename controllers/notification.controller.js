const Notification = require('../models/notification.model');

exports.findAll = (req, res) => {
    Notification.findAll(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        } else res.status(200).json(data);
    });
};