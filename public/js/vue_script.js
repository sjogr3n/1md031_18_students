'use strict';
var socket = io();

// Vueinstans som skapar en lokal order som visas på skärmen vid knapptryck på kartan

var vm = new Vue({
    el: '#main-wrapper',
    data: {
        order: {},
        customerDetails: [],
        detailsPrint: [],
        buttonClicked: false,
        theMessage: false,
    },
    methods: {
        displayOrder: function (event) {
            var offset = { x: event.currentTarget.getBoundingClientRect().left,
                           y: event.currentTarget.getBoundingClientRect().top};
            var T = { details: { x: event.clientX - 10 - offset.x,
                                 y: event.clientY - 10 - offset.y }};
        this.order = {T};
        },
        addOrder: function() {
            this.customerDetails = getDetails();
            var filled = this.checkFilled();
            if (filled === true) {
                this.theMessage = false;
                this.buttonClicked = true;
                socket.emit("addOrder", { details: this.order.T.details,
                                          orderItems: this.customerDetails[0],
                                          customer: this.customerDetails,
                                        });
                this.detailsPrint = ["Beställt snus: " + this.customerDetails[0], "Namn: " + this.customerDetails[1], "Email: " + this.customerDetails[2], "Betalningsmetod: " + this.customerDetails[3], "Leverera till: " + vm.order.T.details.x + " x / " + vm.order.T.details.y + " y", "Kön: " + this.customerDetails[4]];
            }
            else {
                this.theMessage = filled;
            }
        },
        checkFilled: function() {
            if (this.customerDetails[0][0] === undefined) {
                return "Du måste lägga till ett snus i din beställning!"
            }
            if (this.customerDetails[1] === "") {
                return "Du måste ange ditt namn!"
            }
            if (this.customerDetails[2] === "") {
                return "Du måste ange din mailadress!"
            }
            if (this.order.T === undefined) {
                return "Du måste ange en leveransadress!"
            }
            return true;
        }
    }
});
