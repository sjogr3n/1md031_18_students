// Ladda in bilder och egenskaper

for (i=0; i<snus.length; i++) {
	var theProperties = document.createElement("div");
	var theName = document.createElement("p");
	var theNameNode = document.createTextNode(snus[i].name);
    var theImg = document.createElement("img");
    theImg.src = snus[i].img;
    var theFirst = document.createElement("li");
	var theTaste = document.createTextNode(snus[i].taste);
	theFirst.appendChild(theTaste);
	var theSecond = document.createElement("li");
    var theType = document.createTextNode(snus[i].snusType);
	theSecond.appendChild(theType);
	var theThird = document.createElement("li");
    var theAdditional = document.createTextNode(snus[i].additionalProperty);
    theThird.appendChild(theAdditional);
    var theCheckBoxText = document.createElement("label");
    var addToOrder = document.createTextNode("Lägg till i beställning:");
    theCheckBoxText.appendChild(addToOrder);
    var theCheckBox = document.createElement("input");
    theCheckBox.setAttribute("type", "checkbox");
    theCheckBox.setAttribute("name", "snuscheckbox"); //Använd senare
    theCheckBox.setAttribute("value", snus[i].name);
    theCheckBoxText.appendChild(theCheckBox);
	theCheckBoxText.setAttribute("id", "addToOrderCheckBox");

	theProperties.appendChild(theNameNode);
    theProperties.appendChild(theImg);
    theProperties.appendChild(theFirst);
    theProperties.appendChild(theSecond);
    theProperties.appendChild(theThird);
    theProperties.appendChild(theCheckBoxText);
	document.getElementById("wrapper").appendChild(theProperties);
}

function getCheckedSnus() {
	var checkedSnus = [];
	$('input[name="snuscheckbox"]:checked').each(function() {
	   checkedSnus.push(this.value);
	});
	return checkedSnus;
}

function getDetails() {
	var checkedSnus = getCheckedSnus();
    var theDetails = {
		theOrderedSnus: checkedSnus,
        theName: document.getElementById("fullname").value,
        theEmail: document.getElementById("email").value,
		thePaymentMethod: document.getElementById("paymentmethod").options[document.getElementById("paymentmethod").selectedIndex].text,
        theGender: document.querySelector('input[name="g"]:checked').value,
    }
	theDetailsArray = [theDetails.theOrderedSnus, theDetails.theName, theDetails.theEmail, theDetails.thePaymentMethod, theDetails.theGender];
    return theDetailsArray;
}

function MenuItem(nm, st, tst, addp) { // Används ej
    this.name = nm;
    this.snusType = st;
    this.taste = tst;
    this.additionalProperty = addp;
    this.tasteSentence = function() {
        return "Smak av " + this.taste;
    }
}
