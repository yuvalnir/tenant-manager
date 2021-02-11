const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const TenantController = require('../controllers/tenantController.js')
const config = require('../config.properties')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, config.secretKey);

protectedRouter.post('/tenant', TenantController.createTenant)
protectedRouter.put('/tenant', TenantController.updateTenant)
protectedRouter.delete('/tenant/:id', TenantController.deleteTenant)
protectedRouter.get('/tenants/:tenantmanager', TenantController.getAllTenants)

module.exports = router