const itemService = require('../services/itemService');

const getItems = async (req, res) => {
    const result = await itemService.getAllItems();
    if (!result.success) return res.status(500).json({ message: result.message });
    res.status(200).json({ items: result.items });
};

const getItemById = async (req, res) => {
    const { sku } = req.params;
    const result = await itemService.getItemById(sku);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ item: result.item });
};

const createItem = async (req, res) => {
    const result = await itemService.createItem(req.body);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ data: result.data, message: result.message });
};

const updateItem = async (req, res) => {
    const { sku } = req.params;
    const result = await itemService.updateItem(sku, req.body);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ data: result.data, message: result.message });
};

const deleteItem = async (req, res) => {
    const { sku } = req.params;
    const result = await itemService.deleteItem(sku);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ data: result.data, message: result.message });
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}