"use strict";
/************************************************** VARIABLES **********************************************************/
//get all the ids from the html
const newAccountForm = document.querySelector("#bankForm");
let result;

/*************************************** CHECK IF THE STORAGE IS EMPTY OR NOT ******************************************/
let validation = localStorage.getItem("customers")
if (validation === null) {
    fetchData()
} else {
    newAccountForm.addEventListener("submit", newAccount)
}


/****************************************** SET DATA TO LOCAL STORAGE ***********************************************/

async function fetchData() {
    let data = await fetch("http://127.0.0.1:5500/data/customersdata.json")

    let result = await data.json()
    //console.log(result)
    localStorage.setItem("customers", JSON.stringify(result))
}
/************************************************** DISPLAY THE ACCOUNTS ********************************************************/

//displays all the customers data below the List of customer Accounts 

function view() {
    let list = "";
    let dataFromStorage = localStorage.getItem("customers")
    let accounts = JSON.parse(dataFromStorage)
    // accounts.forEach(x => {
    //     list += `${x.accountNumber}  **|**  ${x.customerName}  **|**  ${x.accountType} <br> <hr>`;

    // });
    for (let x of accounts) {
        list += `${x.accountNumber}  **|**  ${x.customerName}  **|**  ${x.accountType} <br> <hr>`;
    }
    document.getElementById("accountList").innerHTML = list
}
view();
/*************************************** CREATE NEW DATA/ACCOUNT TO LOCAL STORAGE *****************************************/

//to create and store a new data in to the local storage
newAccountForm.addEventListener("submit", newAccount);

function newAccount(event) {
    event.preventDefault();
    const account = document.querySelector("#accountNumber").value;
    const fullName = document.querySelector("#name").value;
    const newAccoutType = document.querySelector("#typeOfAccount").value;
    let newCustomers = {
        "accountNumber": account,
        "customerName": fullName,
        "accountType": newAccoutType
    }
    //console.log(newCustomers)
    let newArray = JSON.parse(localStorage.getItem("customers"));
    newArray.push(newCustomers);
    localStorage.setItem("customers", JSON.stringify(newArray))
    // view();
}


/************************************************ END OF CODE ********************************************************/






