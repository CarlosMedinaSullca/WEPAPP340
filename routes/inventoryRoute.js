const utilities = require("../utilities")
// Needed Resources
const express = require("express") // brings Express into the scope of the file.
const router = new express.Router() // uses Express to create a new Router object. Remember in lesson 2 that using separate router files for specific elements of the application would keep the server.js file smaller and more manageable? That's what we're doing.
const invController = require("../controllers/invController") // brings the inventory controller into this router document's scope to be used. 
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// Route to build inventory by item id view
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByItemId));

module.exports = router;

