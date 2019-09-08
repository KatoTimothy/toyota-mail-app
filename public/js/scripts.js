//onload focus on the customer id 
window.onload = function () {
	document.querySelector('#customer-id').focus();
}

//form element
var formEl = document.getElementById("toyota-mail");


//get the compute button
var computeButton = document.getElementById('compute');
//add event listener
computeButton.addEventListener("click", (Event) => {

	var cost, total, quantity, salesTax, shipHandlingFees;

	quantity = parseFloat(document.getElementById('quantity').value);

	//computes the cost and displays it in browser
	var computeCost = function () {
		//get unit price
		var unitPrice = parseFloat(document.getElementById("unit-price").value),
			//get cost element
			costEl = document.getElementById('cost');

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
					return shipAndHandle.toFixed(2);
				} //else end 
			} //if end 
		} //forloop
	} // compute ship handling fees

	// validates form
	function validData() {
		//get customer id
		//get user
		const customerIdEl = document.querySelector('#customer-id'),
			userNameEl = document.querySelector('#user-name'),
			//get user name
			partNumberEl = document.querySelector('#part_num'),
			//get description 
			descriptionEl = document.querySelector('#description'),
			//get unit price
			unitPriceEl = document.querySelector("unit-price");
		//validate customer id 
		function validateId() {
			let pattern = /^\d{1,9}$/,
				validId = pattern.test(customerIdEl.value) && customerIdEl.value !== "";
			if (validId) {
				customerIdEl.style = "border-color:gray";

			} else {
				customerIdEl.style = "border-color:red";

			}
			console.log(validId);

		} //end validateId
		validateId();
	} //end validate


	//computes total
	function computeTotal() {

		total = (parseFloat(computeCost()) + parseFloat(computeSalesTax()) + parseFloat(shippingHandling())).toFixed(2);
		//print value to browser

		document.getElementById('total').innerHTML = "$ " + total;
		// event.preventDefault();
	} //end compute total

	//compute function call all other functions
	function compute() {
		// validData();
		computeCost();
		computeSalesTax();
		shippingHandling();
		computeTotal();
	}
	//call compute()
	compute();
}); //event listener

//closes current window
function Exit() {
	let exitButton = document.getElementById('exit');
	exitButton.addEventListener("click", (event) => {
		if (confirm("Are you sure you want to exit?")) {
			//			close(); //close current window
			window.close();
		}
	});
}

//resets the form
function newOrder() {
	let newOrderButton = document.getElementById('new-order');
	newOrderButton.addEventListener("click", (event) => {
		document.getElementById('toyota-mail').reset();
	});
}
Exit();
newOrder();