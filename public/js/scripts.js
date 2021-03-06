//onload focus on the customer id
window.onload = function () {
  document.querySelector("#customer-id").focus()
}

//getting the form element
var formEl = document.getElementById("toyota-mail")
//on click call validData()
formEl.addEventListener("submit", (event) => {

  //
  if (!validate()) {
    event.preventDefault()
  } else {
    computeTotal()
  }
})

var cost,
  total,
  quantity,
  salesTax = 0

// validates form and computes
function validate() {
  //get quantity
  quantity = parseFloat(document.getElementById("qty").value)

  const customerIdEl = document.querySelector("#customer-id"),
    userNameEl = document.querySelector("#customer-name"),
    partNumberEl = document.querySelector("#item-code"),
    //get item_name input element
    item_nameEl = document.querySelector("#item-name"),
    //get unit price input element
    unitPriceEl = document.querySelector("#item-price"),
    //get quantity input element
    quantityEl = document.querySelector("#qty"),
    // get element that displays errors
    errorMsgEl = document.getElementsByClassName("msg"),
    computationEl = document.getElementsByClassName("computations")

  //give  all error message elements all empty html text
  for (var i = 0; i < errorMsgEl.length; i++) {
    errorMsgEl[i].innerHTML = ""
  }
  //reset styles from all elements in the form
  for (var i = 0; i < formEl.elements.length; i++) {
    formEl.elements[i].style = ""
  }
  //validate customer id
  let idPattern = /^\d{1,9}$/,
    validId = idPattern.test(customerIdEl.value) && customerIdEl.value !== ""
  document.querySelector("#id-msg").innerHTML = ""

  // validate cutomer id input
  if (!validId) {
    customerIdEl.style = "border-color:red;"
    customerIdEl.focus()
    document.querySelector("#id-msg").innerHTML =
      "Required and Enter only numbers."
    return false
  }

  //validate name input
  let validName = userNameEl.value.length !== 0

  if (!validName) {
    userNameEl.style = "border-color:red"
    userNameEl.focus()
    document.querySelector("#name-msg").innerHTML = "Required field"
    return false
  }

  //validate part number input
  let partPattern = /^\d+$/,
    validPart =
      partPattern.test(partNumberEl.value) && partNumberEl.value !== ""
  if (!validPart) {
    partNumberEl.style = "border-color:red"
    partNumberEl.focus()
    document.querySelector("#part-msg").innerHTML = "Required field"
    return false
  }

  //validate item_name input
  let validDescribe = item_nameEl.value !== ""
  if (!validDescribe) {
    item_nameEl.style = "border-color:red"
    item_nameEl.focus()
    document.querySelector("#describe-msg").innerHTML = "Required field"
    return false
  }
  //validate unit price input
  var pricePattern = /^-?\d*(\.\d+)?$/,
    validPrice =
      pricePattern.test(unitPriceEl.value) && unitPriceEl.value !== ""
  document.querySelector("#price-msg").innerHTML = ""
  if (!validPrice) {
    unitPriceEl.style = "border-color:red"
    unitPriceEl.focus()
    document.querySelector("#price-msg").innerHTML =
      "numbers only and unit price is required"
    return false
  }

  //validate quantity input
  let qtyPattern = /^\d+$/,
    validQty =
      qtyPattern.test(quantityEl.value) && quantityEl.value.length !== 0
  if (!validQty) {
    quantityEl.style = "border-color:red"
    quantityEl.focus()
    document.querySelector("#price-msg").innerHTML =
      "numbers only and quantity is required"
    return false
  }
  return true
} //end validate

//computes the cost and displays it in browser
var computeCost = function () {
  //get unit price
  var unitPrice = document.getElementById("item-price").value,
    //get cost element
    costEl = document.getElementById("cost")
  //compute cost
  cost = unitPrice * quantity
  //display cost in browser
  costEl.innerHTML = ` $ ${cost.toFixed(2)}`
  return cost
} //compute cost

//computes the sales tax based on town selected
var computeSalesTax = function () {
  let retailCustomer,
    salesTaxEl = document.getElementById("sales-tax")

  // check if checkbox is checked
  retailCustomer = document.getElementById("customer-type").checked
  //			console.log(retailCustomer);
  if (!retailCustomer) {
    salesTax = 0
    salesTaxEl.innerHTML = "$ " + salesTax.toFixed(2)
    return salesTax
  } else {
    //get towncodes
    var selectedtown = document.getElementById("customer-town").value
    console.log(selectedtown)
    //test the selected town
    switch (selectedtown) {
      //if 'kampala is selected
      case "Kampala": {
        salesTax = ((cost * 10) / 100).toFixed(2)
        salesTaxEl.innerHTML = `$ ${salesTax}`
        break
      }
      // if entebbe or mbarara is selected
      case "Entebbe":
      case "Mbarara": {
        salesTax = ((cost * 5) / 100).toFixed(2)
        salesTaxEl.innerHTML = `$ ${salesTax}`
        break
      }
      case "Other":
        salesTax = 0
        salesTaxEl.innerHTML = `$ ${salesTax}`
    } // end switch
    //return the computed salesTax
    return salesTax
  } //end else
} //end compute sales tax function

//computes shipping and handling fees
function shippingHandling() {
  //stores ship and handling cost
  var shipAndHandleEl = document.getElementById("ship-bill"),
    //stores the shipping charge
    shipping,
    //getting the radio buttons name ship_method
    shippingMethods = document.getElementsByName("shipping_method"),
    //store the shipping and handling cost
    shipAndHandle

  //check if oversize checkbox is checked
  var containerOverSize = document.getElementById("container-oversize").checked
  //loop throught the shippingMethods array
  for (var i = 0; i < shippingMethods.length; i++) {
    //get the checked radio button
    if (shippingMethods[i].checked) {
      //get value of checked box
      switch (shippingMethods[i].value) {
        case "US Postal Service": {
          shipping = 7
          break
        }

        case "Fed Ex Ground": {
          shipping = 9.25
          break
        }
        case "US Postal Air": {
          shipping = 8.5
          break
        }

        case "Fed Ex Air": {
          shipping = 12.0
          break
        }
      } //switch end
      if (!containerOverSize) {
        shipAndHandle = quantity * shipping
        shipAndHandleEl.innerHTML = `$ ${shipAndHandle.toFixed(2)}`
        //						console.log(shipAndHandle);

        return shipAndHandle.toFixed(2)
      } else {
        //increment the shipping charge by 5
        shipping += 5
        shipAndHandle = quantity * shipping
        shipAndHandleEl.innerHTML = `$ ${shipAndHandle.toFixed(2)}`
        //						console.log(shipAndHandle);
        return shipAndHandle.toFixed(2)
      } //else end
    } //if end
  } //forloop
} // compute ship handling fees

//computes total
function computeTotal() {
  cost = computeCost()
  salesTax = computeSalesTax()
  let shippingCost = shippingHandling()
  //calculate the total
  total = parseFloat(cost) + parseFloat(salesTax) + parseFloat(shippingCost)
  //print total  to browser
  document.getElementById("total").innerHTML = "$ " + total.toFixed(2)
} //end compute total

//closes current window
function Exit() {
  let exitButton = document.getElementById("exit")
  exitButton.addEventListener("click", (Event) => {
    if (confirm("Are you sure you want to exit?")) {
      //			close(); //close current window
      window.close()
    }
  })
}

//resets the form
let newOrderButton = document.getElementById("new-order")
//getting elements containing the computed results
let computationEl = document.getElementsByClassName("computations")
//listen for a click on the new order button
newOrderButton.addEventListener("click", (event) => {
  //resetting all input fields
  document.getElementById("toyota-mail").reset()
  //looping through all elements containing output and clearing the HTML content out of each of them
  for (var i = 0; i < computationEl.length; i++) {
    computationEl[i].innerHTML = ""
  }
  //get all error spans

  for (var i = 0; i < errorMsgEl.length; i++) {
    errorMsgEl[i].innerHTML = ""
  }
})

Exit()
