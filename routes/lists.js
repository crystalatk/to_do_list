const express = require('express'),
    router = express.Router();
    ListModel = require("../models/lists")

router.get('/:list_id', async (req, res) => {
    const listID = req.params.list_id,
        listData = await ListModel.getAllItems(listID);
    
    res.render('template', {
        locals: {
            title: listData.name,
            listData
        },
        partials: {
            body: 'partials/list_details',
        }
    });
});

router.post('/newlist:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { name } = req.body;
    const newList = await ListModel.addNewList(user_id, name);
    res.render('/${newList.id}');
});

router.post('/newitem:list_id', async (req, res) => {
    const { list_id } = req.params;
    const { name } = req.body;
    const newItem = await ListModel.addNewItem(list_id, name);
    res.render('/${list_id}');
})

module.exports = router;