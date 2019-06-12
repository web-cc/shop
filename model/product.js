var product = function(id, name,price,producer, description, quantity, category_id){
    this.id = id;
    this.name = name;
    this.price = price;
    this.producer= producer
    this.description = description;
    this.quantity= quantity
    this.category_id = category_id;
  }
module.exports = product;