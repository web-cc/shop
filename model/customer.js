var customer = function(id, name, phone, address,email,password){
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;

    this.email= email;
    this.password=password;
  }

module.exports = customer;