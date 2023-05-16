const spinner = document.getElementById('spinner');
const urlAPI = 'https://reqres.in/api/users?delay=3';

//get API fetch and save in LocalStorage
fetch(urlAPI)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(json => {
    console.log(json.data);
    localStorage.setItem('users-data', JSON.stringify(json.data));
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  })
  .finally(() => {
    spinner.style.display = 'none'; // hide spinner after response is received
}) ;

// Spinner
spinner.style.display = 'block';

// Date info saved on LocalStorage
const key = 'date-page-loaded';
const value = new Date().toISOString();

if (!localStorage.getItem(key)) {
  localStorage.setItem(key, value);
  console.log('Date set in local storage:', value);
} else {
  console.log('Date already exists in local storage:', localStorage.getItem(key));
}

//Remove date of loaded paged and user's info from LocalStorage
setTimeout(() => {
  localStorage.removeItem('date-page-loaded');
  localStorage.removeItem('users-data');
  console.log('Info from API removed from local storage');
}, 60000); 


//Get information of users from LocalStorage
//console.log(localStorage.getItem('users-data')); falta aplicarle JSON.parse

let getLocalStorageUsers = JSON.parse(localStorage.getItem('users-data'));
console.log(getLocalStorageUsers);

//Make cards with users info
let card = document.getElementById("card-template");

/* const getDatos = () => {
  return new Promise((resolve, reject) => {
    if (getLocalStorageUsers.length === 0) {
      setTimeOut(() => {
        resolve(getLocalStorageUsers);
      },5000);
      
    }
  });
}

async function fetchingData () {
  const datosFetched = await getDatos();
  console.log(datosFetched);
}

fetchingData(); */

getLocalStorageUsers.map((user) => { 
  card.innerHTML += `
    <div class= "col-lg-4 col-md-6 col-sm-6">
      <div class= "card card-container">
        <img class=round src= "${user.avatar}" class="card-img-top" alt=" User ${user.first_name} ${user.last_name}"/>
        <div class="card-body">
        <h3 class="card-title text-center">${user.first_name} ${user.last_name}</h3>
        <h4 class="card-title text-center">${user.email}</h4>
      </div>
    </div>
  `;
});

