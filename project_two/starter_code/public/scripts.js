console.log("connected")

var button1 = document.querySelector("#all-categories");
var button2 = document.querySelector("#all-contacts");
var button3 = document.querySelector("#add-contact");
var button4 = document.querySelector("#delete-contact");

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
        console.log(data);
        debugger
appendnewcontactsToDom(data)
})
}

button3.addEventListener("submit", function(event){
  event.preventDefault();
  var name = $(this).find("input[name='name']").val();
  var age = $(this).find("input[name='age']").val();
  var address = $(this).find("input[name='address']").val();
  var phone = $(this).find("input[name='phone']").val();
  var picture = $(this).find("input[name='picture']").val();
  var hash1 = {name: name, age: age, address: address, phone_number: phone, picture: picture}
  postEntry(hash1);
  debugger
});

function appendnewcontactsToDom(data){
  var appended_info = data.name + " " + data.age + " " + data.address + " " + data.phone + " " + data.picture
  debugger
  // var $newLi = $('ul').append('<li>' + appended_info + '</li>')
//parse data?
var $newLi = $('<li>' + appended_info + '</li>')

button4.addEventListener("click", function(){
var deleteId = $(this).parent().attr('id')
deletefromDb(deleteId)
})

$newLi.append(button4);
$newLi.attr('id', data.id);
$('ul').append($newLi);
debugger


}


function deletefromDb(id) {

  $.ajax({
    url: '/contacts/' + id,
    method: 'DELETE',
  }).done(function(data)  {
    console.log(id + "deleted");
    deleteFromDom(id)
  }
  )
}

function deleteFromDom(id){
  var $liToDelete = $(ul).find("#" + id)
  $liToDelete.remove();
}

$.ajax({
  url: 'http://api.randomuser.me/',
  dataType: 'json',
  success: function(data){
    console.log(data);
  }
});


