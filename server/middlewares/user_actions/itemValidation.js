const { z } = require('zod');

const getItemSchema = z.object({id: z.coerce.number().int().nonnegative()});

const getItemsSchema = z.object({
    page: z.coerce.number().int().nonnegative().optional().default(1),
    limit: z.coerce.number().int().nonnegative().optional().default(10),
});

const createItemSchema = z.object({
    name: z.string().nonempty(),
    price: z.number().nonnegative(),
});

const updateItemSchema = z.object({
    name: z.string().nonempty().optional(),
    price: z.number().nonnegative().optional(),
});

function validate(schema) {
    return function (req, res, next) {
        try {
            if (schema === getItemSchema) {
                req.params = schema.parse(req.params);
            } else {
                const source = req.method === 'GET' ? req.query : req.body;
                const parsed = schema.parse(source);
                if (req.method === 'GET') req.query = parsed;
                else req.body = parsed;
            }
            next();
        } catch (err) {
            return res.status(400).json({success: false, message: err.errors});
        }
    };
}

module.exports = {
    getItemSchema,
    getItemsSchema,
    createItemSchema,
    updateItemSchema,
    validate,
};
