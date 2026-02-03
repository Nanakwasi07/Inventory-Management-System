const Item = require('../models/item.model');

class ItemService {
    async getAllItems() {
        try {
            const items = await Item.find();
            return { success: true, items };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async getItemById(sku) {
        try {
            const item = await Item.findById(sku);
            if (!item) return { success: false, message: 'Item not found', status: 404 };
            return { success: true, item };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async createItem(itemData) {
        try {
            const existingItem = await Item.findOne({ name: itemData.name });
            if (existingItem) {
                return { success: false, message: 'Item already exists', status: 400 };
            }
            const newItem = await new Item({ ...itemData }).save();
            return { success: true, data: newItem, message: 'Item created successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async updateItem(sku, itemData) {
        try {
            const updatedItem = await Item.findByIdAndUpdate(sku, itemData, { new: true });
            if (!updatedItem) {
                return { success: false, message: 'Item not found', status: 404 };
            }
            return { success: true, data: updatedItem, message: 'Item updated successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async deleteItem(sku) {
        try {
            const deletedItem = await Item.findByIdAndDelete(sku);
            if (!deletedItem) {
                return { success: false, message: 'Item not found', status: 404 };
            }
            return { success: true, data: deletedItem, message: 'Item deleted successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new ItemService();
