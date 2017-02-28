'use strict';

module.exports = {
    app: {
        name: 'mueveme-development',
        url: 'http://127.0.0.1:3000'
    },
    port: process.env.PORT || 3000,

    dbMongo: {
        uri: 'mongodb://localhost:27017/mueveme-dev',
        options: {
            user: '',
            pass: ''
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    }
};
