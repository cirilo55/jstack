const userController = require('./controller/userController');

module.exports = [
    {
        endpoint: '/users',
        method: 'GET',
        handler: userController.listUsers,
    },
    {
        endpoint: '/users/:id',
        method: 'GET',
        handler: userController.getUserById,
    }


];