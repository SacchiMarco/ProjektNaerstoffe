"use strict"
const { search } = require("../api/product")
const {on} = require("../utils/dom")
const emitterHandler = require("eventemitter3")

/**
 * 
 * @param {HTMLButtonElement} productSearchButton 
 * @param {HTMLInputElement} productSearchInput
 * @param {HTMLDivElement} productResultDiv 
 */
function SearchController(productSearchButton, productSearchInput, productResultDiv) {
    this.productSearchButton = productSearchButton
    this.productSearchInput = productSearchInput
    this.productResultDiv = productResultDiv
    this.emitter = new emitterHandler()
    this.initEvents()
}

/**
 * Set all EventListner for SearchCorntroller
 */
SearchController.prototype.initEvents = function () {
    this.productSearchButton.addEventListener("click", (e) => {
        e.preventDefault()

        const value = this.productSearchInput.value
        if (value !== "") {
            this.search(value)
        }
        else{
            this.productResultDiv.innerHTML = ""
            this.aElement("no search entry", "" ,"text-center")
        }
    })

    on(".search-result-list-output", "click", (event) =>{
        event.originalEvent.preventDefault()
        const fdcId = event.handleObj.getAttribute("data-fdcid")
        this.emitter.emit("Search_Result_FdcId_Click", fdcId)
        
    })
}

/**
 * @param {String} term
 * allHighlightFields: "<b>Ingredients</b>: FILTERED WATER, <em>APPLE</em> JUICE CONCENTRATE, ASCORBIC ACID (VITAMIN C)."
 * brandOwner: "BEST CHOICE"
 * dataType: "Branded"
 * description: "APPLE"
 * fdcId: 559734
 * gtinUpc: "070038322238"
 * ingredients: "FILTERED WATER, APPLE JUICE CONCENTRATE, ASCORBIC ACID (VITAMIN C)."
 * publishedDate: "2019-04-01"
 * score: 568.0037
 */
SearchController.prototype.search = function (term) {
    search(term).then(results => {
        this.productResultDiv.innerHTML = ""

        if (results.length === 0) {
            this.aElement("no result", "", "text-center")
        }
        else {

            for (const result of results) {
                this.aElement(result.description, result.fdcId, "text-left")
            }
        }
    })
    .catch((err) => {
        alert("Es ist ein Fehler aufgetreten. Bitte suche erneut Starten.")
    })
}

/**
 * 
 * @param {string} productDescription 
 * @param {number} fdcId 
 * @param {string} text_postion  terms: text-center, text-left, text-right
 */
SearchController.prototype.aElement = function (productDescription, fdcId, text_postion){
    let aTag = document.createElement("a")
    aTag.classList.add("list-group-item")
    aTag.classList.add("list-group-item-action")
    aTag.classList.add(text_postion)
    aTag.classList.add("search-result-list-output")
    aTag.setAttribute("href", "#")
    aTag.setAttribute("data-fdcId", fdcId)
    aTag.innerHTML = productDescription
    this.productResultDiv.appendChild(aTag)
}


module.exports = SearchController