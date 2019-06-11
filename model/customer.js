var customer = function(id, name, phoneNumber, address,email,password){
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email= email;
    this.password=password;
  }

module.exports = customer;