//onload focus on the customer id 
window.onload = function () {
	document.querySelector('#customer-id').focus();
}


//computes the cost and displays it in browser
var computeCost = function () {
	//get unit price
	var unitPrice = parseFloat(document.getElementById("unit-price").value),
		//get cost element
		costEl = document.getElementById('cost');
	//if no values provided for the unit price and quantity set them to 0
	if (unitPrice === undefined || unitPrice === null || isNaN(unitPrice)) unitPrice = 0;
	if (quantity === undefined || quantity === null || isNaN(quantity)) quantity = 0;
	//compute cost
	cost = unitPrice * quantity;
	//display cost in browser
	costEl.innerHTML = ` $ ${cost.toFixed(2)}`;
	// event.preventDefault();
	return parseFloat(cost);

} //compute cost


//computes the sales tax based on town selected
var computeSalesTax = function () {
	let taxRate, townCode, retailCustomer, salesTaxEl = document.getElementById("sales-tax");

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
				return parseFloat(salesTax);
				break;
			}
			// if entebbe or mbarara are selected
			case 'EBB':
			case 'MBR': {
				salesTax = (cost * 5 / 100).toFixed(2);
				// event.preventDefault();
				salesTaxEl.innerHTML = `$ ${salesTax}`;
				return parseFloat(salesTax);
				break;
			}
			case 'OTH':
				salesTax = 0;
				// event.preventDefault();
				salesTaxEl.innerHTML = `$ ${salesTax}`;
				return parseFloat(salesTax);
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

		//check the checked radio button about shipping methods
		if (shippingMethods[i].checked) {

			// event.preventDefault();
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
				// event.preventDefault();
				return shipAndHandle.toFixed(2);
			} else {
				//increment the shipping charge by 5
				shipping += 5;
				shipAndHandle = quantity * shipping;
				shipAndHandleEl.innerHTML = `$ ${shipAndHandle.toFixed(2)}`;
				//						console.log(shipAndHandle);
				// event.preventDefault();
				return parseFlost(shipAndHandle.toFixed(2));
			} //else end 
		} //if end 
	} //forloop
} // compute ship handling fees


var cost, total, quantity, salesTax = 0;
var formEl = document.getElementById("toyota-mail");
// validates form
function validData() {
	//form element

	quantity = parseFloat(document.getElementById('qty').value);
	//get customer id
	//get user
	const customerIdEl = document.querySelector('#customer-id'),
		userNameEl = document.querySelector('#user-name'),
		//get user name
		partNumberEl = document.querySelector('#part_num'),
		//get description 
		descriptionEl = document.querySelector('#description'),
		//get unit price
		unitPriceEl = document.querySelector("#unit-price"),
		quantityEl = document.querySelector("#qty");

	// function validateId() {
	//validate customer id 
	let idPattern = /^\d{1,9}$/,
		validId = (idPattern.test(customerIdEl.value)) && (customerIdEl.value !== "");
	document.querySelector("#id-msg").innerHTML = "";

	if (!validId) {
		customerIdEl.style = "border-color:red;";
		customerIdEl.focus();
		document.querySelector("#id-msg").innerHTML = "Required and Enter only numbers.";
		return false;
	}
	customerIdEl.style = "";

	//validate price
	let validPrice = (!isNaN(unitPriceEl.value)) && (unitPriceEl.value !== "");
	document.querySelector("#price-msg").innerHTML = "";
	if (!validPrice) {
		unitPriceEl.style = "border-color:red";
		unitPriceEl.focus();
		document.querySelector("#price-msg").innerHTML = "Price and quantity Can't be missing";
		return false;
	}
	unitPriceEl.style = "";

	//validate quantity
	let qtyPattern = /^\d+$/,
		validQty = (qtyPattern.test(quantityEl.value)) && (quantityEl.value.length !== 0);
	if (!validQty) {
		quantityEl.style = "border-color:red";
		quantityEl.focus();
		return false;
	}
	quantityEl.style = "";
	// return (true);

	computeCost();
	computeSalesTax();
	computeTotal();
	shippingHandling()
} //end validate


//computes total
function computeTotal() {

	total = (parseFloat(computeCost()) + parseFloat(computeSalesTax()) + parseFloat(shippingHandling())).toFixed(2);
	//print value to browser

	document.getElementById('total').innerHTML = "$ " + total;
	// event.preventDefault();
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
function newOrder() {
	let newOrderButton = document.getElementById('new-order');
	newOrderButton.addEventListener("click", (Event) => {
		document.getElementById('toyota-mail').reset();
	});
}
Exit();
newOrder();