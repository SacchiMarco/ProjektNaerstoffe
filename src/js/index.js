"use strict"
require("../sass/main.scss")

window.addEventListener("DOMContentLoaded", (e) => {



    //Load Controllers
    const SearchController = require("../controller/SearchController")
    const ProductsList = require("../controller/ProductsList")
    const NutrientsController = require("../controller/NutrientsController")
    
    

    //start search for term
    const searchController = new SearchController(
        document.getElementById("productSearchButton"),
        document.getElementById("productSearchInput"),
        document.getElementById("searchResult")
    )
    
    //looking for product infos
    const productsList =  new ProductsList(
        document.querySelector("#selected-products")
    )

    //start nutrients handler
    const nutrientsController = new NutrientsController()
    
    //pass selected search result to product list
    searchController.emitter.on("Search_Result_FdcId_Click", (fdcid) => {
        productsList.addProdoctToList(fdcid)
    })

    //pass selectedsearch result item to nutrients calculator
    productsList.emitter.on("addProduct", (nutrientsObj) =>{
        nutrientsController.addNutrients(nutrientsObj)
    })

    //remove deleted product list item from nutrients calculator
    productsList.emitter.on("removeProduct", (fdcId) => {
        nutrientsController.removeNutrients(fdcId)
    })

    //on product amount change update 
    productsList.emitter.on("updateAmount", (dataObj) =>{
        nutrientsController.updateAmountOfProductById(dataObj)
    })

    /* const testTemplate = require("../templates/test.ejs") */

    /* productsList.addProdoctToList(341508)
    productsList.addProdoctToList(341692) */




})

