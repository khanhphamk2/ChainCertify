const express = require('express');
const certificateRoute = require('./certificate.route');
const walletRoute = require('./wallet.route');
const issuerRoute = require('./issuer.route');
const holderRoute = require('./holder.route');
const userRoute = require('./user.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/certificates',
        route: certificateRoute,
    },
    // {
    //     path: '/wallet',
    //     route: walletRoute,
    // },
    // {
    //     path: '/issuer',
    //     route: issuerRoute,
    // },
    // {
    //     path: '/holder',
    //     route: holderRoute,
    // },
    // {
    //     path: '/user',
    //     route: userRoute,
    // },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;