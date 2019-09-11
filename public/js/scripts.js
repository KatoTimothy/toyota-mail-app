//onload focus on the customer id 
window.onload = function () {
	document.querySelector('#customer-id').focus();
}
//initially setting to 0
var cost, total, quantity, salesTax = 0;
//getting the form element
var formEl = document.getElementById("toyota-mail");
//on click call validData()
formEl.onsubmit = validData;

// validates form
function validData() {
	//get quantity
	quantity = parseFloat(document.getElementById('qty').value);

	//get customer id
	const customerIdEl = document.querySelector('#customer-id'),
		userNameEl = document.querySelector('#user-name'),
		//get user name
		partNumberEl = document.querySelector('#part_num'),
		//get description input element
		descriptionEl = document.querySelector('#description'),
		//get unit price input element
		unitPriceEl = document.querySelector("#unit-price"),
		//get quantity input element
		quantityEl = document.querySelector("#qty"),
		// get element that displays errors
		errorMsgEl = document.getElementsByClassName("msg"),
		computationEl = document.getElementsByClassName("computations");


	//give  all error message elements all empty html text
	for (var i = 0; i < errorMsgEl.length; i++) {
		errorMsgEl[i].innerHTML = "";
	}

	//reset styles from all elements in the form 
	for (var i = 0; i < formEl.elements.length; i++) {
		formEl.elements[i].style = "";
	}
	//validate customer id 
	let idPattern = /^\d{1,9}$/,
		validId = (idPattern.test(customerIdEl.value)) && (customerIdEl.value !== "");
	document.querySelector("#id-msg").innerHTML = "";

	// validate cutomer id input 
	if (!validId) {
		customerIdEl.style = "border-color:red;";
		customerIdEl.focus();
		document.querySelector("#id-msg").innerHTML = "Required and Enter only numbers.";
		return false;
	}

	//validate name input
	let validName = userNameEl.value.length !== 0;

	if (!validName) {
		userNameEl.style = "border-color:red";
		userNameEl.focus();
		document.querySelector("#name-msg").innerHTML = "Required field";
		return false;
	}

	//validate part number input 
	let partPattern = /^\d+$/,
		validPart = partPattern.test(partNumberEl.value) && partNumberEl.value !== "";
	if (!validPart) {
		partNumberEl.style = "border-color:red";
		partNumberEl.focus();
		document.querySelector("#part-msg").innerHTML = "Required field";
		return false;
	}

	//validate description input
	let validDescribe = descriptionEl.value !== "";
	if (!validDescribe) {
		descriptionEl.style = "border-color:red";
		descriptionEl.focus();
		document.querySelector("#describe-msg").innerHTML = "Required field";
		return false;
	}
	//validate unit price input
	var pricePattern = /^-?\d*(\.\d+)?$/,
		validPrice = (pricePattern.test(unitPriceEl.value)) && (unitPriceEl.value !== "");
	document.querySelector("#price-msg").innerHTML = "";
	if (!validPrice) {
		unitPriceEl.style = "border-color:red";
		unitPriceEl.focus();
		document.querySelector("#price-msg").innerHTML = "numbers only and unit price is required";
		return false;
	}

	//validate quantity input 
	let qtyPattern = /^\d+$/,
		validQty = (qtyPattern.test(quantityEl.value)) && (quantityEl.value.length !== 0);
	if (!validQty) {
		quantityEl.style = "border-color:red";
		quantityEl.focus();
		document.querySelector("#price-msg").innerHTML = "numbers only and quantity is required";
		return false;
	}

	computeCost();
	computeSalesTax();
	shippingHandling();
	computeTotal();
} //end validate

//computes the cost and displays it in browser
var computeCost = function () {
	//get unit price
	var unitPrice = document.getElementById("unit-price").value,
		//get cost element
		costEl = document.getElementById('cost');
	//compute cost	
	cost = unitPrice * quantity;
	//display cost in browser
	costEl.innerHTML = ` $ ${cost.toFixed(2)}`;
	// event.preventDefault();
	return cost;
} //compute cost	


//computes the sales tax based on town selected
var computeSalesTax = function () {
	let retailCustomer, salesTaxEl = document.getElementById("sales-tax");

	// check if checkbox is checked
	retailCustomer = document.getElementById('retail').checked;
	//			console.log(retailCustomer);
	if (!retailCustomer) {

		salesTax = 0;
		salesTaxEl.innerHTML = "$ " + salesTax.toFixed(2);
		// event.preventDefault();
		return salesTax;
	} else {
		//get towncodes
		var selectedCity = document.getElementById('city').value;
		console.log(selectedCity);
		// event.preventDefault();
		//get selected city
		switch (selectedCity) {
			//if 'kampala is selected
			case 'KLA': {
				salesTax = (cost * 10 / 100).toFixed(2);
				// event.preventDefault();
				salesTaxEl.innerHTML = `$ ${salesTax}`;
				return salesTax;
				break;
			}
			// if entebbe or mbarara are selected
			case 'EBB':
			case 'MBR': {
				salesTax = (cost * 5 / 100).toFixed(2);
				// event.preventDefault();
				salesTaxEl.innerHTML = `$ ${salesTax}`;
				return salesTax;
				break;
			}
			case 'OTH':
				salesTax = 0;
				// event.preventDefault();
				salesTaxEl.innerHTML = `$ ${salesTax}`;
				return salesTax;
		} // end switch		
	} //end else	
} //end compute sales tax	


//computes shipping and handling fees

function shippingHandling() {
	//shipAndHandle fees
	var shipAndHandleEl = document.getElementById('ship-bill'),
		shipping,

		//get shipping methods 
		shippingMethods = document.getElementsByName('ship_method'),
		//store the shipping and handling cost
		shipAndHandle;

	//check if oversize checkbox is checked 	
	var containerOverSize = document.getElementById('oversize').checked;
	//loop throught the shippingMethods array
	for (var i = 0; i < shippingMethods.length; i++) {

		//get the checked radio button 
		if (shippingMethods[i].checked) {

			//get value of checked box
			switch (shippingMethods[i].value) {

				case 'ups': {
					shipping = 7;
					break;
				} //case	

				case 'fed_ex_ground': {
					shipping = 9.25;
					break;
				}
				case 'us_post_air': {
					shipping = 8.50;
					break;
				}

				case 'fed_ex_air': {
					shipping = 12.00;
					break;
				}
			} //switch end	
			if (!containerOverSize) {
				shipAndHandle = quantity * shipping;
				shipAndHandleEl.innerHTML = `$ ${shipAndHandle.toFixed(2)}`;
				//						console.log(shipAndHandle);

				return shipAndHandle.toFixed(2);
			} else {
				//increment the shipping charge by 5
				shipping += 5;
				shipAndHandle = quantity * shipping;
				shipAndHandleEl.innerHTML = `$ ${shipAndHandle.toFixed(2)}`;
				//						console.log(shipAndHandle);
				// event.preventDefault();
				return shipAndHandle.toFixed(2);
			} //else end 	
		} //if end 	
	} //forloop	
} // compute ship handling fees	



//computes total
function computeTotal() {

	cost = computeCost();
	salesTax = computeSalesTax();
	let shippingCost = shippingHandling();

	total = parseFloat(cost) + parseFloat(salesTax) + parseFloat(shippingCost);
	//print total  to browser
	document.getElementById('total').innerHTML = "$ " + total.toFixed(2);

} //end compute total


//closes current window
function Exit() {
	let exitButton = document.getElementById('exit');
	exitButton.addEventListener("click", (Event) => {
		if (confirm("Are you sure you want to exit?")) {
			//			close(); //close current window
			window.close();
		}
	});
}

//resets the form
let newOrderButton = document.getElementById('new-order');
//getting elements containing the computed results
let computationEl = document.getElementsByClassName("computations");
//listen for a click on the new order button
newOrderButton.addEventListener("click", (Event) => {
	//resetting all input fields
	document.getElementById('toyota-mail').reset();
	//looping through all elements containing output and clearing the HTML content out of each of them
	for (var i = 0; i < computationEl.length; i++) {
		computationEl[i].innerHTML = "";
	}
	//get all error spans

	for (var i = 0; i < errorMsgEl.length; i++) {
		errorMsgEl[i].style = "";
	}
});

Exit();