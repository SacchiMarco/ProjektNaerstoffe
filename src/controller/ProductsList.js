"use strict"
const { info } = require("../api/product")
const { on } = require("../utils/dom")
const emitterHandler = require("eventemitter3")
const productHtml = require("../templates/productlist/productlist.ejs")

/**
 * 
 * @param {HTMLTableElement} tableBodyElement 
 */
function ProductList(tableBodyElement) {
    this.emitter = new emitterHandler()
    this.tableBodyElement = tableBodyElement
    this.ProductList = []

    this.init()
}

ProductList.prototype.init = function () {
    on("#remove-product-from-list", "click", (e) => {
        e.originalEvent.preventDefault()
        const parentTdElement_fdcId = parseInt(e.handleObj.parentElement.parentElement.getAttribute("data-fdcid"))
        const parentTdElement = e.handleObj.parentElement.parentElement
        parentTdElement.remove()
        this.emitter.emit("removeProduct", parentTdElement_fdcId)

        for(const [pos, item]  of this.ProductList.entries()){
            if(("" + parentTdElement_fdcId) === ("" + item.fdcId)) {
                this.ProductList.splice(pos, 1)
            }
        }

    })

    on(".product-amount", "change", (e) => {
        e.originalEvent.preventDefault()
        const parentTdElement_fdcId = e.handleObj.parentElement.parentElement.getAttribute("data-fdcid")
        const amountGramm = e.handleObj.value

        this.emitter.emit("updateAmount", {
            fdcId: parentTdElement_fdcId,
            amount: amountGramm
        })
    })
}


/**
 * @param {number} fdcId
 */
ProductList.prototype.addProdoctToList = function (fdcId) {
    for(const item of this.ProductList){
        if(("" + fdcId) === ("" + item.fdcId)) {
            return
        }
    }

    info(fdcId).then(res => {

        this.addNewTable(res)
        this.ProductList.push(res)

        const nutrientsObj = this.getNutrients(res)
        this.emitter.emit("addProduct", nutrientsObj)
    })
    .catch((err) => {
        alert("Produktdaten konnten nicht geladen werden. Bitte nochmal versuchen.")
    })
}

/**
 * @param {object} res
 */
ProductList.prototype.addNewTable = function (res) {

    this.tableBodyElement.insertAdjacentHTML("beforeend", productHtml({
        fdcid: res.fdcId,
        description: res.description
    }))

}


ProductList.prototype.getNutrients = function (res) {
    const returnObj = {}
    returnObj.fdcId = res.fdcId
    for (const nutrient of res.foodNutrients) {
        const amount = nutrient.amount
        switch (nutrient.nutrient.id) {
            case 1003:
                returnObj.p = amount
            case 1004:
                returnObj.f = amount
            case 1005:
                returnObj.k = amount
        }
    }
    returnObj.a = 100
    return returnObj
}


module.exports = ProductList