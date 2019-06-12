var con = require('./../config/key');
var order = function (id, customer_id, amount, status, created_at , address) {
    this.id = id;
    this.customer_id = customer_id;
    this.amount = amount;
    this.status = status;
    this.created_at = created_at;
    this.address = address;
}



module.exports = order;
