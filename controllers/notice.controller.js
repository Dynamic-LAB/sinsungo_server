const Notice = require('../models/notice.model');

exports.findAll = (req, res) => {
    Notice.findAll((err, data) => {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        } else res.status(200).json(data);
    });
};