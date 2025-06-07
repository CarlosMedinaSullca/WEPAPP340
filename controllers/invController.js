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

/* **********************
 * Process add classification
 * ******************** */

invCont.addClassification= async function(req,res) {
    
    const {classification_name,} = req.body

    const addingResult = await invModel.addClassification(classification_name)

    if(addingResult) {
        req.flash(
            "notice",
            `The ${classification_name} classification was succesfully added.`
        )
        let nav = await utilities.getNav()
        res.status(201).render("inventory/management",{
            title: "Vehicle management",
            nav,
            newClass: "<a id= vmanage href= /inv/add-classification >Add new Classification</a>",
            newVehi: "<a id= vmanage href= /inv/add-inventory >Add new Vehicle</a>",
            intError: "<a href= /error >Error link</a>",
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the process to add classification failed.")
        let nav = await utilities.getNav()
        res.status(501).render("inventory/add-classification", {
            title: "Add new classification",
            nav,
            intError: "<a href= /error >Error link</a>",
            errors: null,
        })
    }
}


/* **********************
 * Process add inventory
 * ******************** */

invCont.addInventory= async function(req,res) {
    
    const {classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color} = req.body

    const addingResult = await invModel.addInventory(
        classification_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color
    )

    if(addingResult) {
        req.flash(
            "notice",
            `The ${inv_make} ${inv_model} was succesfully added.`
        )
        let nav = await utilities.getNav()
        res.status(201).render("inventory/management",{
            title: "Vehicle management",
            nav,
            newClass: "<a id= vmanage href= /inv/add-classification >Add new Classification</a>",
            newVehi: "<a id= vmanage href= /inv/add-inventory >Add new Vehicle</a>",
            intError: "<a href= /error >Error link</a>",
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the process to add vehicle failed.")
        let nav = await utilities.getNav()
        let optionsList = await utilities.dropDownClassList()       
        const intError = "<a href= /error >Error link</a>"
        res.status(501).render("inventory/add-inventory", {
            title: "Add new vehicle",
            nav,
            optionsList,
            intError,
            errors: null,
        })
    }
}


module.exports = invCont

