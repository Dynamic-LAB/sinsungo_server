const Diet = require('../models/diet.model');
const groupBy = require('json-groupby');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "empty body"
        });
    }

    const diet = new Diet({
        id: req.body.id,
        memo: req.body.memo,
        date: req.body.date,
        menu1: req.body.menus[0],
        menu2: req.body.menus[1],
        menu3: req.body.menus[2],
        menu4: req.body.menus[3],
        menu5: req.body.menus[4],
        menu6: req.body.menus[5],
        menu7: req.body.menus[6],
        menu8: req.body.menus[7],
        menu9: req.body.menus[8],
        menu10: req.body.menus[9]
    });

    // diet 테이블에 먼저 삽입
    Diet.create(diet, async (err, data) => {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        } else {
            
            let values = []
            // dietingredient 테이블에 삽입 될 재료 값 가공
            req.body.ingredients.map(ingredient => {values.push([data.id, ingredient.id])});
            // 가공 한 재료 값들 dietingredient 테이블에 삽입
            
            if (values.length > 0) {
                await Diet.createPivot(values, (err) => {
                    if (err) {
                        res.status(500).json({
                            message: err.message
                        });
                    } else {
                        data.ingredients = req.body.ingredients;
                        res.status(201).json(data);
                    }
                });
            } else {
                res.status(201).json(data);
            }
        }
    });
};

exports.findOne = (req, res) => {
    Diet.findOne(req.params.id, (err, data) => {
        if (err) {
            if (err.message == "not found") {
                res.status(404).json({
                    message: err.message
                });
            } else {
                res.status(500).json({
                    message: err.message
                });
            }
        } else res.status(200).json(dataProcessing(data));
    });
};

exports.findAll = (req, res) => {
    Diet.findAll(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        } else res.status(200).json(dataProcessing(data));
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "empty body"
        });
    }

    /*
    * req.body는 길이 2인 배열로 받음.
    * req.body[0]은 바뀌기 전 식단 데이터
    * req.body[1]은 바뀐 후 식단 데이터
    * */

    const diet = new Diet({
        id: req.body[1].id,
        memo: req.body[1].memo,
        date: req.body[1].date,
        menu1: req.body[1].menus[0],
        menu2: req.body[1].menus[1],
        menu3: req.body[1].menus[2],
        menu4: req.body[1].menus[3],
        menu5: req.body[1].menus[4],
        menu6: req.body[1].menus[5],
        menu7: req.body[1].menus[6],
        menu8: req.body[1].menus[7],
        menu9: req.body[1].menus[8],
        menu10: req.body[1].menus[9]
    });

    // diet 테이블의 row 먼저 수정
    Diet.update(req.params.id, diet, (err, data) => {
        if (err) {
            if (err.message == "not found") {
                res.status(404).json({
                    message: err.message
                });
            } else {
                res.status(500).json({
                    message: err.message
                });
            }
        } else {
            // 새로 추가 된 재료 목록 (레시피id , 재료id)
            let inserts = req.body[1].ingredients.filter(x => !req.body[0].ingredients.includes(x)).map(x => [data.id, x.id]);
            // 제거 된 재료 목록
            let deletes = req.body[0].ingredients.filter(x => !req.body[1].ingredients.includes(x)).map(x => x.id);

            // dietingredient 테이블에서 삽입 또는 삭제
            Diet.updateIngredients(data.id, inserts, deletes, (err) => {
                if (err) {
                    if (err.message == "not found") {
                        res.status(404).json({
                            message: err.message
                        });
                    } else {
                        res.status(500).json({
                            message: err.message
                        });
                    }
                } else {
                    res.status(200).json(req.body[1]); // 모든 작업이 성공하면 바뀐 후의 데이터인 req.body[1] 반환
                }
            });
        }
    });
};

exports.delete = (req, res) => {
    Diet.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.message == "not found") {
                res.status(404).json({
                    message: err.message
                });
            } else {
                res.status(500).json({
                    message: err.message
                });
            }
        } else res.status(200).json({ message: "delete success"});
    });
};

/*
* 원하는 형태로 response 값을 주기 위해 데이터를 가공하는 함수
* menu1~10까지는 menus라는 배열로 가공
* 재료 속성만 뽑아 재료 객체를 만들고 재료 배열 ingredients로 가공
* */
const dataProcessing = (data) => {
    const diets = []
    const dietData = Object.entries(groupBy(data, ['id']));

    dietData.forEach(x => {
        const diet = {
            id: x[1][0].id,
            memo: x[1][0].memo,
            date: x[1][0].date,
            menus: [],
            ingredients: []
        };

        for (let key in x[1][0]) {
            if (key.includes("menu")) diet.menus.push(x[1][0][key]);
        }

        x[1].forEach(d => {
            const ingredient = {
                id: d.ingredient_id,
                category: d.category,
                name: d.name,
                amount: d.amount,
                unit: d.unit,
                expiration_type: d.expiration_type,
                expiration_date: d.expiration_date
            };

            if (ingredient.id != null) diet.ingredients.push(ingredient);
        });

        diets.push(diet);
    });

    return diets;
};
