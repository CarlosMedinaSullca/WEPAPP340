/***************************
 * Account routes
 * Deliver login view account
 *****************************/
const utilities = require("../utilities/")
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")



/***************************
 * Deliver registration View
 * Deliver registration view account
 *****************************/
router.get("/login",  utilities.handleErrors(accountController.buildLogin))

router.get("/register", utilities.handleErrors(accountController.buildRegister))

router.get("/management", utilities.handleErrors(accountController.buildAccountManagement)

)


/***************************
 * Process registration
 * Process registration activity
 *****************************/
router.post("/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount) )

// Process the login attempt
router.post( "/login",
    regValidate.loginRules(),
    regValidate.checkLogData, 
    utilities.handleErrors(accountController.accountLogin)
)

module.exports = router;