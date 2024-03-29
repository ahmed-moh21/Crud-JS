// inputs id declerations
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
// first operation ( Get Total price )
function getTotal() {
  if (price.value != "") {
    //(+) symbol before string (price.value) this mean convert him to number
    let result = +price.value + +taxes.value + +ads.value - +discound.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "....";
    total.style.background = "#a00d20";
  }
}

// second operation ( Create Product )
let Dataara;
if (localStorage.Prouduct != null) {
  Dataara = JSON.parse(localStorage.Prouduct);
} else {
  Dataara = [];
}

submit.onclick = () => {
  let dataOpj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discound: discound.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  //bush data about number of count input value
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    dataOpj.count < 100
  ) {
    if (mood === "create") {
      if (dataOpj.count > 1) {
        for (let i = 0; i < dataOpj.count; i++) {
          Dataara.push(dataOpj);
        }
      } else {
        Dataara.push(dataOpj);
      }
    } else {
      Dataara[tmp] = dataOpj;
      mood = "create";
      count.style.display = "block";
      submit.innerHTML = "create";
    }

    clearInputs();
  }
  // save data in localStorage
  localStorage.setItem("Prouduct", JSON.stringify(Dataara));

  //callBcak function to clear data inputs after  save it
  readData();
};

// 3th operation ( clear Product inputs )
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discound.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//4th operations (read data in taple)

function readData() {
  getTotal();
  let table = "";
  for (let i = 0; i < Dataara.length; i++) {
    table += `
    <tr>  
    <td id="ind"> ${i + 1} </td>
    <td>${Dataara[i].title}</td>
    <td>${Dataara[i].price}</td>
    <td>${Dataara[i].taxes}</td>
    <td>${Dataara[i].ads}</td>
    <td>${Dataara[i].discound}</td>
    <td>${Dataara[i].total}</td>
    <td>${Dataara[i].category}</td>
    <td><button onclick="updateData(${i})" id="updata"><i class="fa-solid fa-pen-to-square"></i>  updata</button></td>
    <td><button onclick="deleteProduct(${i})" id="delete"> <i class="fa-solid fa-trash"></i> delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleetAll");
  if (Dataara.length > 0) {
    btnDelete.innerHTML = `
    <button id="deleteAll" onClick="deleteAll()" > Delete All : ${Dataara.length}</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
readData();

//5th operations (Delete product)
function deleteProduct(i) {
  Dataara.splice(i, 1);
  localStorage.Prouduct = JSON.stringify(Dataara);
  readData();
}

function deleteAll() {
  localStorage.clear();
  Dataara.splice(0);
  readData();
}

function updateData(i) {
  title.value = Dataara[i].title;
  price.value = Dataara[i].price;
  taxes.value = Dataara[i].taxes;
  ads.value = Dataara[i].ads;
  discound.value = Dataara[i].discound;
  category.value = Dataara[i].category;

  getTotal();

  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search by Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search by Category";
  }
  search.focus();
  search.value = "";
  readData();
}

function searchData(value) {
  let table = "";

  if (searchMood == "title") {
    for (let i = 0; i < Dataara.length; i++) {
      if (Dataara[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>  
    <td id="ind"> ${i} </td>
    <td>${Dataara[i].title}</td>
    <td>${Dataara[i].price}</td>
    <td>${Dataara[i].taxes}</td>
    <td>${Dataara[i].ads}</td>
    <td>${Dataara[i].discound}</td>
    <td>${Dataara[i].total}</td>
    <td>${Dataara[i].category}</td>
    <td><button onclick="updateData(${i})" id="updata">updata</button></td>
    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < Dataara.length; i++) {
      if (Dataara[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>  
        <td id="ind"> ${i} </td>
        <td>${Dataara[i].title}</td>
        <td>${Dataara[i].price}</td>
        <td>${Dataara[i].taxes}</td>
        <td>${Dataara[i].ads}</td>
        <td>${Dataara[i].discound}</td>
        <td>${Dataara[i].total}</td>
        <td>${Dataara[i].category}</td>
        <td><button onclick="updateData(${i})" id="updata">updata</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
        `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
