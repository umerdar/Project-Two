console.log("connected")

var button1 = document.querySelector("#all-categories");
var button2 = document.querySelector("#all-contacts");
var button3 = document.querySelector("#create-contact");


function returnallContacts() {

    $.ajax({
        url: '/contacts',
        method: 'GET',
        dataType: 'json'
    }).done(function(data){
        appendallToDom(data)
        console.log(data);
    });
  }

button2.addEventListener("click", function(){
  returnallContacts();

});

function appendallToDom(data) {
  for (var i = 0; i < data.length; i++){
        var names = data[i].name
        var phone_numbers = data[i].phone_number
        var pictures = data[i].picture
        $('ul').append('<li>' + names + " " + phone_numbers + " " + pictures + '</li>')
    }
   }


function postEntry(info) {

    $.ajax({
        url: '/contacts',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(info)
    }).done(function(data){
//postentry posts to database, gets response
//now make a function that takes response and
//appends it to the DOM. Call this function right here
//call appendToDom
appendnewcontactsToDom(data)
// appendToDom(data)

console.log(data);
})
}

button3.addEventListener("click", function(){
  var gambler_field = $('#gambler-name');
  var value = $(gambler_field).val().split(" ")
  // needs to take a hash for json packaging
  var hash = {name: value[0], amount: value[1]}
  postEntry(hash);
});

function appendnewcontactsToDom(data){
  var appended_info = data.name + " " + data.amount
  $('ul').append('<li>' + appended_info + '</li>')
//parse data?

}

