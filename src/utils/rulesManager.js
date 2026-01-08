// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under Apache 2.0 with Commons Clause - see LICENSE file
// GitHub: https://github.com/AshhLattee/AshhLattee-Rules

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/rules.json');

class RulesManager {
    constructor() {
        this.ensureDataFile();
    }

    ensureDataFile() {
        const dataDir = path.join(__dirname, '../../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        if (!fs.existsSync(DATA_FILE)) {
            const defaultData = {
                categories: [],
                config: {
                    channelId: null,
                    messageId: null
                }
            };
            fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
        }
    }

    loadData() {
        this.ensureDataFile();
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    }

    saveData(data) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    }

    getCategories() {
        const data = this.loadData();
        return data.categories;
    }

    getCategory(id) {
        const categories = this.getCategories();
        return categories.find(cat => cat.id === id);
    }

    addCategory(category) {
        const data = this.loadData();
        data.categories.push(category);
        this.saveData(data);
    }

    updateCategory(id, updatedCategory) {
        const data = this.loadData();
        const index = data.categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
            data.categories[index] = { ...data.categories[index], ...updatedCategory };
            this.saveData(data);
            return true;
        }
        return false;
    }

    deleteCategory(id) {
        const data = this.loadData();
        data.categories = data.categories.filter(cat => cat.id !== id);
        this.saveData(data);
    }

    getConfig() {
        const data = this.loadData();
        return data.config;
    }

    setConfig(config) {
        const data = this.loadData();
        data.config = { ...data.config, ...config };
        this.saveData(data);
    }
}

module.exports = new RulesManager();
