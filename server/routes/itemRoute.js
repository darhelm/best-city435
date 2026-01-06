const express = require('express');
const {
    createItem,
    getItems,
    updateItem,
    deleteItem,
} = require('../controllers/itemController');
const {
    getItemsSchema,
    createItemSchema,
    updateItemSchema,
    getItemSchema,
    validate,
} = require('../middlewares/user_actions/itemValidation');

const router = express.Router();

router
    .route('/items')
    .get(validate(getItemsSchema), getItems)
    .post(validate(createItemSchema), createItem);

router
    .route('/items/:id')
    .get(validate(getItemSchema), getItems)
    .put(validate(updateItemSchema), updateItem)
    .delete(validate(getItemSchema), deleteItem);

module.exports = router;
