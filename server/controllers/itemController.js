const itemStore = require('../utils/itemStore');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');

exports.createItem = asyncErrorHandler(async (req, res, next) => {
    const { name, price } = req.body;
    const item = itemStore.create({ name, price });
    res.status(201).json({ success: true, item });
});

exports.getItems = asyncErrorHandler(async (req, res, next) => {
    if (req.params.id) {
        const item = itemStore.findById(Number(req.params.id));
        if (!item) return next(new ErrorHandler('Item not found', 404));
        return res.status(200).json({ success: true, item });
    }

    const { page, limit } = req.query;
    const data = itemStore.findAll({ page, limit });
    res.status(200).json({ success: true, ...data });
});

exports.updateItem = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.body;
    const updated = itemStore.update(id, req.body);
    if (!updated) return next(new ErrorHandler('Item not found', 404));
    res.status(200).json({ success: true, item: updated });
});

exports.deleteItem = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const ok = itemStore.delete(Number(id));
    if (!ok) return next(new ErrorHandler('Item not found', 404));
    res.status(200).json({ success: true, message: 'Item deleted' });
});