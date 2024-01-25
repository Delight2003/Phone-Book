
// Listen to form submit
document.getElementById('contactForm').addEventListener('submit', contactForm);

// Save contact
function contactForm(e)
{
    //  Get values from form
    var personName = document.getElementById('personName').value;
    var personMobile = document.getElementById('personMobile').value;
   

    if(!personName || !personMobile)
    {
        alert('please fill in the form');
        return false;
    }

    var contact = {
        name: personName,
        mobile: personMobile
    }


    // Testing local storage

    // localStorage.setItem('test', "Hello World");
    // console.log(localStorage.getItem('test'));

    // Testing if phonebook is null
    if(localStorage.getItem('phonebook') === null)
    {
        // init Array
        var phonebook = [];
        // add data to array
        phonebook.push(contact);

        // Set to Local Storage  
        localStorage.setItem('phonebook', JSON.stringify(phonebook));

    }else{
        // first get contacts from local storage
        var phonebook = JSON.parse(localStorage.getItem('phonebook'));
        // Add new contacts to array
        phonebook.push(contact);
        // reset back to local storage
        localStorage.setItem('phonebook', JSON.stringify(phonebook));

    }
    // clear form
    document.getElementById('contactForm').reset();

    // fetch all contacts
    
    fetchPhoneBook();  

    e.preventDefault();
}





// fetch contacts from localStorage

function fetchPhoneBook()
{
    // first get contacts from the local storage
    var phonebook = JSON.parse(localStorage.getItem('phonebook'));

    // get the output ID
    var phonebookResult = document.getElementById('phonebookResult');

    phonebookResult.innerHTML = '';

    for (var i = 0; i < phonebook.length; i++) {
        var name = phonebook[i].name;

        var mobile = phonebook[i].mobile;

        phonebookResult.innerHTML += '<tr>'+
                                     '<td>'+name+'<td>'+
                                     '<td>'+mobile+'<td>'+
                                     '<td><a class="btn btn-danger" href="#" onclick="deleteContact('+mobile+')">Delete</a></td>'+
                                     '</tr>';

    }
}


function deleteContact(num) 
{
    var phonebook = JSON.parse(localStorage.getItem('phonebook'));

    for (var i = 0; i < phonebook.length; i++) {

        if (phonebook[i].mobile == num) {
            phonebook.splice(i, 1);
        }
    }

      // reset back tp localStorage
      localStorage.setItem('phonebook', JSON.stringify(phonebook));

      fetchPhoneBook();
}