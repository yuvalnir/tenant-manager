const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({ 
    tenantmanager: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    phonenumber: String,
    address: String, 
    debt: Number });

module.exports = mongoose.model('Tenant', tenantSchema)