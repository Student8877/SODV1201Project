/*
* @name: Course Project Phase 1
* @Course Code: SODV 1201
* @class: Software Development Diploma
* @author: Jamie Braaksma
*/


//VARIABLES
let currentRentals = [];
let currentBookings = [];
let currentUsersList = [];
let tempArray = [];
let count1 = 0;
let count2 = 0;
let currentUser;
let accountType;



//CLASSES
class User
{
  constructor(username, accountType)
  {
    this.username = username;
    this.accountType = accountType;
  }
}


class Meeting
{
  constructor(user, name, renterName, rentalName, date)
  {
    this.user = user;
    this.name = name;
    this.renterName = renterName;
    this.rentalName = rentalName;
    this.date = date;
    this.members = [];
    this.add = function (member)
    {
      this.members.push(member);
    }
  }
}


class Rental
{
  constructor(user, name, address)
  {
    this.user = user;
    this.name = name;
    this.address = address;
    this.amenities = [];
    this.add = function (amenity)
    {
      this.amenities.push(amenity);
    }
  }
}



//FUNCTIONS
function PrintDate()
{
  let date = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  $("#date").append(`<h3>${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}</h3>`);
}


function stringFormat(string)
{
  string = string.toLowerCase();
  let stringArray = string.split(" ");
  for (var i = 0; i < stringArray.length; i++)
  {
    stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
  }
  string = stringArray.join(" ");
  return string;
}


function populateRentersTable(currentUser, accountType, tableName, array, withButton)
{
  for (var i = 0; i < array.length; i++)
  {
    if(array[i].user === currentUser || accountType === "Meet")
    {
      $(`#${tableName}`).append
      (
        `<td class="rent${i}"> ${array[i].name} </td>
        <td class="rent${i}"> ${array[i].address}</td>`
      );

      $(`#${tableName}`).append(`<td id= "amenities${i}" class="rent${i}"></td>`);

      for (var j = 0; j < array[i].amenities.length; j++)
      {
        if(j < array[i].amenities.length - 1)
          $(`#amenities${i}`).append(`${array[i].amenities[j]}, `);

        else
          $(`#amenities${i}`).append(`${array[i].amenities[j]}`);
      }

      if(withButton)
        $(`#${tableName}`).append(`<td class="rent${i} tableBtn">
                                  <button id="editRentalBtn${i}" onclick = "createRentalToEdit('${array[i].name}')" class= "myButton tableButton" type="button" name="button">Edit</button>
                                  <button id="cancelRentalBtn${i}" onclick = "deleteFromStorage('${array[i].name}', 'Rentals')" class= "myButton tableButton" type="button" name="button">Delete</button>
                                  </td>`);

      $(`.rent${i}`).wrapAll("<tr></tr>").parent();
    }
  }
}


// TODO: Add Date to table
function populateBookingsTable(currentUser, array)
{

  for (var i = 0; i < array.length; i++)
  {
    if(array[i].user === currentUser || array[i].renterName === currentUser)
    {
      $("#allBookingsBody").append(`<td class="meet${i}"> ${array[i].name} </td>`);
      $("#allBookingsBody").append(`<td id= "members${i}" class="meet${i}"></td>`);
      for (var j = 0; j < array[i].members.length; j++)
      {
        $(`#members${i}`).append(`${array[i].members[j]}`);
      }
      $("#allBookingsBody").append(`<td class="meet${i}"> <a href= "addMeet.html">${array[i].rentalName}</a></td>`);
      $("#allBookingsBody").append(`<td class="meet${i}" style= "min-width: 115px;">${array[i].date}</td>`);
      $("#allBookingsBody").append(`<td class="meet${i} tableBtn">
                                   <button id="editMeetingBtn${i}" onclick = "createBookingToEdit('${array[i].name}')" class= "myButton" type="button" name="button">Edit</button>
                                   <button id="cancelBtn${i}" onclick = "deleteFromStorage('${array[i].name}', 'Bookings')" class= "myButton" type="button" name="button">Cancel</button></td>`);
      $(`.meet${i}`).wrapAll("<tr></tr>").parent();
    }
  }
}


function sortByKeyRent(tableName, object, key, withButton)
{
  $(`#${tableName} tr`).remove();
  $(`#${tableName} button`).remove();

      if(key === "name")
      {
        if(count1 == 0)
        {
          populateRentersTable(currentUser, accountType, tableName, object.sort((a,b) => a.name.localeCompare(b.name)), withButton);
          count1++;
        }
        else if(count1 == 1)
        {
          populateRentersTable(currentUser, accountType, tableName, object.sort((a,b) => b.name.localeCompare(a.name)), withButton);
          count1--;
        }
        else
          throw console.error("Count1 Variable Not Within Acceptable Range");
      }

      else if(key === "address")
      {
        if(count2 == 0)
        {
          populateRentersTable(currentUser, accountType, tableName, object.sort((a,b) => a.address.localeCompare(b.address)), withButton);
          count2++;
        }
        else if(count2 == 1)
        {
          populateRentersTable(currentUser, accountType, tableName, object.sort((a,b) => b.address.localeCompare(a.address)), withButton);
          count2--;
        }
        else
          throw console.error("Count2 Variable Not Within Acceptable Range");
      }

      else
        throw console.error("sortByKeyRent passed invalid key");
}


function sortByKeyMeet(object, key)
{
  $("#allBookingsBody tr").remove();
  $("#allBookingsBody button").remove();

      if(key === "name")
      {
        if(count1 == 0)
        {
          populateBookingsTable(currentUser, object.sort((a,b) => a.name.localeCompare(b.name)));
          count1++;
        }
        else if(count1 == 1)
        {
          populateBookingsTable(currentUser, object.sort((a,b) => b.name.localeCompare(a.name)));
          count1--;
        }
        else
          throw console.error("Count1 Variable Not Within Acceptable Range");

      }

      else if(key === "rentalName")
      {
        if(count2 == 0)
        {
          populateBookingsTable(currentUser, object.sort((a,b) => a.rentalName.localeCompare(b.rentalName)));
          count2++;
        }
        else if(count2 == 1)
        {
          populateBookingsTable(currentUser, object.sort((a,b) => b.rentalName.localeCompare(a.rentalName)));
          count2--;
        }
        else
          throw console.error("Count2 Variable Not Within Acceptable Range");
      }
      else
        throw console.error("sortByKeyMeet passed invalid key");

}


function deleteFromStorage(deletedItem, storageName)
{
  let storage = JSON.parse(window.localStorage.getItem(storageName));

  for (var i = 0; i < storage.length; i++)
  {
     if(storage[i].name === deletedItem)
     {
       storage.splice(i, 1);
       break;
      }
  }

  window.localStorage.setItem(storageName, JSON.stringify(storage));
  location.reload();
}


function createBookingToEdit(name)
{
  window.localStorage.setItem('ToEdit', JSON.stringify(name));
}


function editMeetingFromStorage()
{
  let meetingName = JSON.parse(window.localStorage.getItem('ToEdit'));
  window.localStorage.removeItem('ToEdit', JSON.stringify(meetingName));
  let storage = JSON.parse(window.localStorage.getItem('Bookings'));
  let objectToEdit = storage.filter(x => x.name === meetingName);
  let index = storage.findIndex(x => x.name === meetingName);
  if(index > -1)
  {

    //Make value of inputs match object
    $("#editMeetingName").val(objectToEdit[0].name);
    $("#editDateInput").val(objectToEdit[0].date);
    $("#placeName").append(objectToEdit[0].rentalName);


    for (var i = 0; i < objectToEdit[0].members.length; i++)
    {
      tempArray.push(objectToEdit[0].members[i]);
      $("#memberList").append(`<li id= "list${i}">${objectToEdit[0].members[i]}<button id= "removeMemberBtn${i}" class= "myButton" onclick= "removeMember('${objectToEdit[0].members[i]}')">Remove</button></li> `);
    }


    //OnClick change object to new parameter
    $("#editMeetingBtn").click(function()
    {
      let editedName = $("#editMeetingName").val();
      let editedDate = $("#editDateInput").val();
      let editedMeeting = new Meeting(currentUser, editedName, objectToEdit[0].renterName, objectToEdit[0].rentalName, editedDate);


      //Copy the array of members to the meeting
      for(var i = 0; i < tempArray.length; i++)
        editedMeeting.add(tempArray[i]);

      window.localStorage.removeItem('Bookings', JSON.stringify(storage));

      storage.splice(index, 1, editedMeeting);

      window.localStorage.setItem('Bookings', JSON.stringify(storage));


      //Clear the temporary members array
      tempArray.length = 0;

      window.location.href = "file:///C:/Users/jay_b/OneDrive/Documents/BVC/Term_2/SODV1201/Code/HTML/CourseProject/meet_HTML/currentMeetings.html";
    })
  }
}


function createRentalToEdit(name)
{
  window.localStorage.setItem('ToEdit', JSON.stringify(name));
}


function editRentalFromStorage()
{
  let rentalName = JSON.parse(window.localStorage.getItem('ToEdit'));
  window.localStorage.removeItem('ToEdit', JSON.stringify(rentalName));
  let storage2 = JSON.parse(window.localStorage.getItem('Rentals'));
  let objectToEdit2 = storage2.filter(x => x.name === rentalName);
  let index = storage2.findIndex(x => x.name === rentalName);
  if(index > -1)
  {

    //Make value of inputs match object
    $("#editRentalName").val(objectToEdit2[0].name);
    $("#editLocationRental").val(objectToEdit2[0].address);


    for (var i = 0; i < objectToEdit2[0].amenities.length; i++)
    {
      tempArray.push(objectToEdit2[0].amenities[i]);
      $("#amenitiesList").append(`<li id= "list${i}">${objectToEdit2[0].amenities[i]}<button id= "removeAmenityBtn${i}" class= "myButton" onclick= "removeMember('${objectToEdit2[0].amenities[i]}')">Remove</button></li> `);
    }


    //OnClick chnge object to new parameter
    $("#editRentalBtn").click(function()
    {
      let editedRentalName = $("#editRentalName").val();
      let editedAddress = $("#editLocationRental").val();
      let editedRental = new Rental(currentUser, editedRentalName, editedAddress);


      //Copy the array of members to the meeting
      for(var i = 0; i < tempArray.length; i++)
        editedRental.add(tempArray[i]);

        window.localStorage.removeItem('Rentals', JSON.stringify(storage2));

        storage2.splice(index, 1, editedRental);

        window.localStorage.setItem('Rentals', JSON.stringify(storage2));

      //Clear the temporary members array
      tempArray.length = 0;

      window.location.href = "file:///C:/Users/jay_b/OneDrive/Documents/BVC/Term_2/SODV1201/Code/HTML/CourseProject/rental_HTML/currentRentals.html";
    })
  }

}


function removeMember(member)
{
  let index2 = tempArray.indexOf(member);
  tempArray.splice(index2, 1);
  $(`#list${index2}`).remove();
}


function addMeeting(currentUser, bookDate, renterName, bookPlace, bookName)
{
  if(bookPlace == "" || bookPlace == null || bookPlace.trim() == '')
    return alert("Please select an available work space");

  if(bookName == "" || bookName == null || bookName.trim() == '')
    return alert("Please enter a name for your meeting");

    bookName = stringFormat(bookName);

  //Check for duplicates
  if(currentBookings != null)
  {
    for(let i = 0; i < currentBookings.length; i++)
    {
      // DEBUG: Not getting evaluated
      if(bookDate == currentBookings[i].date && bookPlace == currentBookings[i].rentalName)
        return alert("That date is already booked. Please select a new date");
    }
  }
  let newBooking = new Meeting(currentUser, bookName, renterName, bookPlace, bookDate);

  //Copy the array of members to the meeting
  for(var i = 0; i < tempArray.length; i++)
    newBooking.add(tempArray[i]);

  //Clear the temporary members array
  tempArray.length = 0;

  //Add the new rental property to the users properties
  currentBookings.push(newBooking);

  window.localStorage.setItem('Bookings', JSON.stringify(currentBookings));
}



$(document).ready(function()
{
  //Get data from local storage
  let localStorageUsers = JSON.parse(window.localStorage.getItem('Users'));
  let localStorageRentals = JSON.parse(window.localStorage.getItem('Rentals'));
  let localStorageBookings = JSON.parse(window.localStorage.getItem('Bookings'));
  let currentUserStorage = JSON.parse(window.sessionStorage.getItem('CurrentUser'));
  if(currentUserStorage != null)
  {
    currentUser = currentUserStorage.username;
    accountType = currentUserStorage.accountType;
  }

  //If the user logs out and returns to the login, clear the currentUser from session storage
  if(window.location.href === "https://student8877.github.io/SODV1201Project/index.html")
     window.sessionStorage.clear();

  PrintDate();

  //Get Local storage
  if(localStorageBookings != null)
  {
    for (var i = 0; i < localStorageBookings.length; i++)
    {
        currentBookings[i] = localStorageBookings[i];
    }
  }

  if(localStorageUsers != null)
  {
        for (var i = 0; i < localStorageUsers.length; i++)
        {
          currentUsersList[i] = localStorageUsers[i]
        }
  }

  //Populate current rentals table
  if(localStorageRentals != null)
  {
    for (var i = 0; i < localStorageRentals.length; i++)
    {
        currentRentals[i] = localStorageRentals[i];
    }
  }

  if(window.location.href === "https://student8877.github.io/SODV1201Project/meet_HTML/addMeeting.html");
    populateRentersTable(currentUser, accountType, "rentalsBody", currentRentals, false);

  for (var i = 0; i < currentRentals.length; i++)
    $("#placeSelector").append(`<option value= "${currentRentals[i].name}">` + currentRentals[i].name + `</option>`);

  $("#rentNameSort").click(function() {sortByKeyRent("rentalsBody", currentRentals, "name", false);});
  $("#addrSort").click(function() {sortByKeyRent("rentalsBody", currentRentals, "address", false);});


  //SIGN-IN USER
  $("#signInBtn").click(function()
  {
    let userLogin = $("#usernameInput").val();

    for (var i = 0; i < currentUsersList.length; i++)
    {
      if(currentUsersList[i].username === userLogin)
      {
        window.sessionStorage.setItem('CurrentUser', JSON.stringify(currentUsersList[i]));

        if(currentUsersList[i].accountType === "Provide")
          return window.location.href = "rental_HTML/rentalHome.html";

        else
          return window.location.href = "meet_HTML/meetHome.html";
      }
    }

    alert("That username does not exist");
  });



  //SIGN UP
  $("#signUpBtn").click(function()
  {
    let newUsername = $("#newUsername").val();
    let accountType = $('input[name= "type"]:checked').val();

    for (var i = 0; i < currentUsersList.length; i++)
    {
      if(currentUsersList[i].username == newUsername)
        return alert("That username is already taken, please enter a new one.");
    }

      let newUser = new User(newUsername, accountType);
      currentUsersList.push(newUser);
      window.localStorage.setItem('Users', JSON.stringify(currentUsersList));
      window.sessionStorage.setItem('CurrentUser', JSON.stringify(newUser));

      if(accountType === "Meet")
        window.location.href = "meet_HTML/meetHome.html";

      else
        window.location.href = "rental_HTML/rentalHome.html";
  });


/*****MEETINGS*****/
  //BOOK A MEETING
  //Add an individual member to meeting
  $("#memberBtn").click(function()
  {
    let newMember = $("#memberInput").val();

    if(newMember == "" || newMember == null || newMember.trim() == '')
      return alert("Please enter a member name");

    newMember = stringFormat(newMember);

    //Check for duplicates
    for(let i = 0;i < tempArray.length; i++)
    {
      if(newMember == tempArray[i])
        return alert("This member has already been added");
    }

    //Add the new member to a temporary array
    tempArray.push(newMember);

    //Display team members on page
    $("#memberList").append(`<li>${newMember}</li>`);

    //Clear input field
    $("#memberInput").val("");
  });

  //Book a meeting
  $("#bookMeetingBtn").click(function()
  {
    let bookDate = $("#dateInput").val();
    let  bookPlace = $("#placeSelector").val();
    let  bookName = $("#meetingName").val();
    let rentalArray = currentRentals.filter(x => x.name === bookPlace);
    let rentersName = rentalArray[0].user;

    addMeeting(currentUser, bookDate, rentersName, bookPlace, bookName);

    //Clear input fields
    $("#dateInput").val("");
    $("#placeSelector").val("");
    $("#meetingName").val("");

    //Clear Member list
    $("#memberList").empty();
  });



  //EDIT EXISTING MEETING
  $("editMeetingBtn").click(function()
  {

  });


  /*****RENTALS*****/
  //DISPLAY USER INFORMATION
  let rentalBookingsCount =  currentBookings.filter(x => x.renterName === currentUser).length;
  let bookingsCount =  currentBookings.filter(x => x.user === currentUser).length;
  let rentalCount =  currentRentals.filter(x => x.user === currentUser).length;

  $("#username").append(currentUser);
  $("#numberRentals").append(rentalCount);
  $("#numberRenterBookings").append(rentalBookingsCount);
  $("#numberBookings").append(bookingsCount);


  //SEARCH RENTALS
  $("#searchInput").on("keyup", function()
  {
    let search = $(this).val().toLowerCase();
    $("#rentalsBody tr").filter(function()
    {
      $(this).toggle($(this).text().toLowerCase().indexOf(search) > -1)
    });
  });


  //VIEW/SORT BOOKINGS
  let currentBookingsMaster = JSON.parse(window.localStorage.getItem('Bookings'));

  if(currentBookingsMaster != null)
    populateBookingsTable(currentUser, currentBookingsMaster);

  $("#meetingSort").click(function() {sortByKeyMeet(currentBookingsMaster, "name");});
  $("#rentalSort").click(function() {sortByKeyMeet(currentBookingsMaster, "rentalName");});



  //ADD A RENTAL
  //Add an individual amenity
  $("#amenityBtn").click(function()
  {
    let newAmenity = $("#amenity").val();

    if(newAmenity == "" || newAmenity == null || newAmenity.trim() == '')
      return alert("Please enter an amenity");

    newAmenity = stringFormat(newAmenity);

    //Check for duplicates
    for(let i = 0;i < tempArray.length; i++)
    {
      if(newAmenity == tempArray[i])
        return alert("This amenity has already been added");
    }

    //Add the new amenity to a temporary array
    tempArray.push(newAmenity);

    //Display amenitites on page
    $("#amenitiesList").append(`<li>${newAmenity}</li>`);

    //Clear input field
    $("#amenity").val("");

  });

  //Add new rental
  $("#newRentalBtn").click(function()
  {
    let newName = $("#nameRental").val();
    let newAddress = $("#locationRental").val();

    if(newName == "" || newName == null || newName.trim() == '')
      return alert("Please enter a name");

    if(newAddress == "" || newAddress == null || newAddress.trim() == '')
      return alert("Please enter an address");

    newName = stringFormat(newName);
    newAddress = stringFormat(newAddress);

    //Check for duplicates
    for(let i = 0; i < currentRentals.length; i++)
    {
      if(newName == currentRentals[i].name)
        return alert("That name already exists. Please enter a unique name");
    }

    let newRental = new Rental(currentUser, newName, newAddress);

    //Copy the array of amenitites to the rental property
    for(var i = 0; i < tempArray.length; i++)
      newRental.add(tempArray[i]);

    //Clear the temporary amenities array
    tempArray.length = 0;

    //Add the new rental property to the users properties
    currentRentals.push(newRental);

    window.localStorage.setItem('Rentals', JSON.stringify(currentRentals));

    //Clear input fields
    $("#nameRental").val("");
    $("#locationRental").val("");

    //Clear Amenity list
    $("#amenitiesList").empty();
  });


  if(window.location.href === "https://student8877.github.io/SODV1201Project/rental_HTML/currentRentals.html")
    populateRentersTable(currentUser, accountType, "allRentalsBody", currentRentals, true);

  //Sorting function calls
  $("#rentalNameSort").click(function() {sortByKeyRent("allRentalsBody", currentRentals, "name", true);});
  $("#addressSort").click(function() {sortByKeyRent("allRentalsBody", currentRentals, "address", true);});


  //Load Rental editing page and populate the input fields with existing values
  $('[id^="editRentalBtn"]').click(function(){window.location.href = "https://student8877.github.io/SODV1201Project/Code/HTML/CourseProject/rental_HTML/editRental.html";})
  if(window.location.href === "https://student8877.github.io/SODV1201Project/rental_HTML/editRental.html")
    editRentalFromStorage();

  //Load Meeting editing page and populate the input fields with existing values
  $('[id^="editMeetingBtn"]').click(function(){window.location.href = "https://student8877.github.io/SODV1201Project/Code/HTML/CourseProject/meet_HTML/editMeeting.html";})
  if(window.location.href === "https://student8877.github.io/SODV1201Project/meet_HTML/editMeeting.html")
    editMeetingFromStorage();
});
