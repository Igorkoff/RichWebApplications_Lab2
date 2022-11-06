class Contact {
	#contactName;
	#phoneNumber;
	#emailAddress;

	constructor(contactName, phoneNumber, emailAddress) {
		this.contactName = contactName;
		this.phoneNumber = phoneNumber;
		this.emailAddress = emailAddress;
	}

	getContactName() {
		return this.contactName;
	}

	getPhoneNumber() {
		return this.phoneNumber;
	}

	getEmailAddress() {
		return this.emailAddress;
	}
}

let contactsArray = [];
let sortDirection = 1;

window.onload = function() {
	showTable();
	document.getElementById("inputAddContact").addEventListener("click", () => {
        
        // grab data from the input fields

		const contactNameInput = document.getElementById("inputContactName");
		const phoneNumberInput = document.getElementById("inputPhoneNumber");
		const emailAddressInput = document.getElementById("inputEmailAddress");

        // validation checks

		const contactName = contactNameInput.value;
		const phoneNumber = phoneNumberInput.value;
		const emailAddress = emailAddressInput.value;

		if(!contactName || !phoneNumber || !emailAddress) {
			showErrorMessage("All Fields are Required!");
			return;
		}
		if(contactName.match(/[^a-zA-Z\s]/)) {
			showErrorMessage("Contact Name Must Contain Only Letters!");
			return;
		}

		if(contactName.length > 20) {
			showErrorMessage("Contact Name Must Be Less Than Or Equal To 20 Characters!");
			return;
		}

		if(phoneNumber.match(/[^0-9]/)) {
			showErrorMessage("Contact Name Must Contain Only Digits!");
			return;
		}

		if(phoneNumber.length !== 10) {
			showErrorMessage("Contact Name Must Be 10 Digits!");
			return;
		}

		if(!emailAddress.match(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/)) {
			showErrorMessage("Email Address Can Only Contain Letters, Digits, @ And .");
			return;
		}

		if(emailAddress.length > 40) {
			showErrorMessage("Email Address Must Be Less Than Or Equal To 40 Characters");
			return;
		}

		// clear the input fields

		contactNameInput.value = "";
		phoneNumberInput.value = "";
		emailAddressInput.value = "";

		// create new contact

		contactsArray.push(new Contact(contactName, phoneNumber, emailAddress));
		showTable();
	});


};


function showErrorMessage(message) {
    let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    document.getElementById("error-text").innerHTML = message;
    errorModal.show();
}

function showTable(searchedNumber) {
	const tableBody = document.querySelector("tbody");
	let filteredArray = contactsArray;

	while (tableBody.lastChild) {
		tableBody.removeChild(tableBody.lastChild);
	}

    // filter array if search number provided

	if (searchedNumber) {
		filteredArray = filteredArray.filter(contact => (contact.getPhone()+"").includes(searchedNumber));
	}

    // get table and no result divs

	const table = document.querySelector("table");
	const noResult = document.getElementById("noResult");

    // visibility manipulations

	if (filteredArray.length === 0) {
		table.classList.add("d-none");
		noResult.classList.remove("d-none");
	} else {
		document.getElementsByTagName("table")[0].classList.remove("d-none");
		noResult.classList.add("d-none");
	}

    // add rows to the table from the array

	filteredArray.forEach(function(contact) {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${contact.getContactName()}</td>
			<td>${contact.getPhoneNumber()}</td>
			<td>${contact.getEmailAddress()}</td>
		`;
		tableBody.appendChild(row);
	});
}