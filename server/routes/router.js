const express = require('express');
const router = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');


/** Render
 
 * @description Root Route
 * @method GET/ 
 */
 router.get('/', services.homeRoutes);

/**
 * @description Root add-user
 * @method GET /add-user
 */
router.get('/add-restaurant', services.addUser);

/**
 * @description Root update-user
 * @method GET /update-user
 */
router.get('/update-restaurant', services.updateRestaurant);

router.get('/search', services.searchByName)
// router.get('/search', services.searchByBorough)
// router.get('/search', services.searchByCuisine)

router.get('/sort', services.sort)


/**
 * @description Root detail-restaurant
 * @method GET /detail-restaurant
 */
router.get('/detail-restaurant', services.detailRestaurant);


//API
router.post('/api/restaurants', controller.create);
router.get('/api/restaurants', controller.find);
router.put('/api/restaurants/:id', controller.update);
router.delete('/api/restaurants/:id', controller.delete);
router.get('/api/restaurants/:id', controller.findByID);


module.exports = router;