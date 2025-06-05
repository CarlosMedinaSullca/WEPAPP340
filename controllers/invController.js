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

module.exports = invCont

