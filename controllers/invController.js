const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* **********************
 * Build inventory by classification view
 * ******************** */
invCont.buildByClassificationId = async function(req, res, next) {
    const classification_id = req.params.classificationId
    console.log(`this is the classification ${classification_id}`)
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    const intError = "<a href= /error >Error link</a>"
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
        intError,
    })
}

/* **********************
 * Build inventory by details view
 * ******************** */

invCont.buildByItemId = async function(req, res, next) {
    const inventory_Id = req.params.inventoryId
    console.log(`this is the item Id ${inventory_Id}`)
    const data = await invModel.getDetailsByInventoryId(inventory_Id)
    console.log(data)
    const grid = await utilities.buildInventoryGrid(data)
    let nav = await utilities.getNav()
    const year = data[0].inv_year
    const make = data[0].inv_make
    const model = data[0].inv_model
    const intError = "<a href= /error >Error link</a>"
    res.render("./inventory/detail", {
        title: `${year }${make }${model}`,
        nav,
        grid,
        intError,
    })

}

/* **********************
 * Management  view
 * ******************** */

invCont.buildManagementView = async function(req, res, next) {
    let nav = await utilities.getNav()
    const intError = "<a href= /error >Error link</a>"
    const newClass = "<a id= vmanage href= /inv/add-classification >Add new Classification</a>"
    const newVehi = "<a id= vmanage href= /inv/add-inventory >Add new Vehicle</a>"
    res.render("./inventory/management", {
        title: "Vehicle management",
        nav,
        newClass,
        newVehi,
        intError,
        errors: null,
    })
}

/* **********************
 * Add classification view
 * ******************** */

invCont.buildAddClassView = async function(req, res, next) {
    let nav = await utilities.getNav()
    const intError = "<a href= /error >Error link</a>"
    res.render("./inventory/add-classification", {
        title: "Add new classification",
        nav,
        intError,
        errors: null,
    })
}

/* **********************
 * Add vehicle view
 * ******************** */
invCont.buildAddInvView = async function(req, res, next) {
    let optionsList = await utilities.dropDownClassList()    
    let nav = await utilities.getNav()    
    const intError = "<a href= /error >Error link</a>"
    res.render("./inventory/add-inventory", {
        title: "Add new vehicle",
        nav,
        optionsList,
        intError,
        errors: null,
    })
}



module.exports = invCont

