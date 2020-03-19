const mongoose = require("mongoose");

const job = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    salary: Number,
    category: String,
    unique_commands: Array,
    level: Number
});

module.exports = mongoose.model("Job", job);