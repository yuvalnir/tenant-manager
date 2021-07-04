const Tenant = require('../models/tenantModel')

const createTenant = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({error: 'Please fill all the fields'})
    }

    const tenant = new Tenant(body)

    try {
        tenant.save();
        return res.status(201).json({
            tenant: tenant,
            message: 'Tenant created!',
        });
    } catch (exception) {
        console.log(exception);
        return res.status(400).json({message: 'Tenant not created!'});
    }
}

const updateTenant = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({ message: 'You must provide a body to update'});
    }

    try {
        const updatedTenant = await Tenant.findOneAndUpdate({ _id: body.id }, body, { new: true });
        console.log("Updated tenant successfully", updatedTenant);
        return res.status(201).json(updatedTenant);
    } catch (exception) {
        console.error(exception);
        return res.status(404).json({ message: 'Tenant not found' })
    }
}

const deleteTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findOneAndDelete({ _id: req.params.id });
        console.log("Deleted tenant", tenant);
        return res.status(200).json(tenant);
    }
    catch (exception) {
        console.error(exception);
        return res.status(404).json({ message: 'Tenant not found' })
    }
}

const getAllTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find({tenantmanager: req.params.tenantmanager});
        return res.status(200).json({ data: tenants });
    } catch (exception) {
        console.error(exception);
        return res.status(404).json({ message: 'Error trying to get Tenants' });
    }
}

module.exports = {
    createTenant,
    updateTenant,
    deleteTenant,
    getAllTenants,
}