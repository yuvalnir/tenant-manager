const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({ 
    tenantmanager: { type: Schema.Types.ObjectId, ref: 'User' },
    name: 'string',
    phonenumber: 'string',
    address: 'string', 
    debt: Number });

module.exports = mongoose.model('Tenant', tenantSchema)