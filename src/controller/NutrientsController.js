"use strict"

function NutrientsController() {
    this.nutrientsSumme = []
}

/**
 * @param {Object} nutrientsObj
 */
NutrientsController.prototype.addNutrients = function (nutrientsObj) {
    this.nutrientsSumme.push(nutrientsObj)
    this.updateNutrientsOnHTML()
}

/**
 * @param {number} fdcId
 */
NutrientsController.prototype.removeNutrients = function (fdcId) {    
    this.nutrientsSumme.splice(getArrayPosOfFdcId(fdcId, this.nutrientsSumme), 1)
     
    this.updateNutrientsOnHTML()
}

/**
 * Aktulaisiert Producktmenge
 * @param {object} dataObj contains fdcId and amount 
 */
NutrientsController.prototype
    .updateAmountOfProductById = function(dataObj){
        const amount = parseInt(dataObj.amount, 10)
        const fdcId = parseInt(dataObj.fdcId, 10)

        const arrayIndex = getArrayPosOfFdcId(fdcId, this.nutrientsSumme)
        this.nutrientsSumme[arrayIndex].a = amount
        this.updateNutrientsOnHTML()
    }

/**
 * Setzt und aktualisiert die aktuellen Nährwerte auf der Webseite
 * 
 */
NutrientsController.prototype.updateNutrientsOnHTML = function(){
    let proteinSumme = 0
    let fettSumme = 0
    let kohlenhydrateSumme = 0
    

    for(const i in this.nutrientsSumme){
        const amount = this.nutrientsSumme[i].a / 100
        proteinSumme += (this.nutrientsSumme[i].p * amount)
        fettSumme += (this.nutrientsSumme[i].f * amount)
        kohlenhydrateSumme += (this.nutrientsSumme[i].k * amount)         
    }

    const proteinSpanElement = document.querySelector(".protein")
    const fettSpanElement = document.querySelector(".kohlenhydrate")
    const kohlenhydrateSpanElement = document.querySelector(".fett")

    proteinSpanElement.innerText = proteinSumme
    fettSpanElement.innerText = fettSumme
    kohlenhydrateSpanElement.innerText = kohlenhydrateSumme
}

/**
 * 
 * @param {number} fdcId 
 * @returns {number} returns array position of fdcId
 */
const getArrayPosOfFdcId = (fdcId, nutrientsSumme) => {
    for(const i in nutrientsSumme){
        if(nutrientsSumme[i].fdcId === fdcId){
            return i
        }
    }
}

module.exports = NutrientsController