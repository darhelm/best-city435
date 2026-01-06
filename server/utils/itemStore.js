const items = new Map();
let nextId = 1;

const itemStore = {
    create({ name, price }) {
        const item = { id: nextId++, name, price, createdAt: new Date() };
        items.set(item.id, item);
        return item;
    },

    findAll({ page = 1, limit = 10 } = {}) {
        const all = [...items.values()];
        const start = (page - 1) * limit;
        return {
            items: all.slice(start, start + limit),
            total: all.length,
            page,
            limit,
            totalPages: Math.ceil(all.length / limit),
        };
    },

    findById(id) {
        return items.get(id) || null;
    },

    update(id, updates) {
        const item = items.get(id);
        if (!item) return null;
        const updated = { ...item, ...updates };
        items.set(id, updated);
        return updated;
    },

    delete(id) {
        return items.delete(id);
    },
};

module.exports = itemStore;