 // Vid knappklickning

 var vm = new Vue({
    el: '#order',
    data: {
        details: [],
        buttonClicked: false
    },
    methods: {
        markDone: function() {
            this.details = getDetails();
            if (this.details[0] != "Beställt snus: ") {
                this.buttonClicked = true;
            }
        }
    }
})
