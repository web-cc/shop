var orderDetail = function (id, order_id, product_id, price, status) {
    this.id = id;
    this.order_id = order_id;
    this.product_id=product_id;
    this.price = price;
    this.status = status;
}
module.exports = orderDetail;
