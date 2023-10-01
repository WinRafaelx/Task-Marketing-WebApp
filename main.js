// Path of Image of Products
let img_prod = [
  "./img/skin_sol/2.png",
  "./img/skin_sol/3.png",
  "./img/skin_sol/4.png",
  "./img/skin_sol/5.png",
  "./img/skin_sol/6.png",
  "./img/UV_Protection/8.png",
  "./img/UV_Protection/9.png",
  "./img/UV_Protection/10.png",
  "./img/UV_Protection/11.png",
  "./img/UV_Protection/12.png",
  "./img/Cleansing/14.png",
  "./img/Cleansing/15.png",
  "./img/Cleansing/16.png",
  "./img/Cleansing/17.png",
  "./img/Cleansing/18.png",
  "./img/shine your lip/20.png",
  "./img/shine your lip/21.png",
  "./img/shine your lip/22.png",
  "./img/shine your lip/23.png",
  "./img/shine your lip/24.png",
]

// Products that we are selling
let products = {
  skin_sol: {
    "Deep Advance Serum": 3750,
    "Night Repair Serum": 2790,
    "Anti Dark Spot Serum": 2790,
    "Anti Wrinkle Serum": 2790,
    "Advance Moisturizer": 1850
  },
  uv_protect: {
    "UV sun screen spf 50+": 1250,
    "UV Protect Whitetening": 950,
    "UV Magic Cover": 950,
    "UV Soft Cream": 950,
    "UV Extreme Protect": 750
  },
  cleansing: {
    "Deep Cleansing Oil": 1250,
    "Whitetening Toner": 950,
    "White Magic Foam": 750,
    "Body Cleanser": 550,
    "Fresh Cleanser Remover": 450
  },
  shine_lip: {
    "Natural Balm": 350,
    "UV Protect Balm": 350,
    "Gentel Lip Balm": 350,
    "Glow Your Lip": 350,
    "Sleeping Balm": 350
  }
}

// Orders that users choose
let orders = []

// Add Product to Orders
function manageOrder(name, cost, number) {
  const find = orders.find(order => order.name == name)
  if (find) {
    find.cost += cost
    find.quantity += 1
  } else {
    orders.push({
      name,
      cost,
      quantity: 1,
      img: img_prod[number]
    })
  }
}

// Increase or Decrease Amount of Product --> In Cart last page
function manageAmount(number, prod) {
  if (number == -1) {
    orders.map(order => {
      if (order.name == prod) {
        order.cost -= order.cost / order.quantity
        order.quantity -= 1
        if (order.quantity == 0) {
          orders.splice(orders.indexOf(order), 1)
        }
      }
    })
  } else {
    orders.map(order => {
      if (order.name == prod) {
        order.cost += order.cost / order.quantity
        order.quantity += 1
      }
    })
  }
  showOrders()
}

// Show Orders in Cart last page
function showOrders() {
  const prodList = document.getElementById("orders")
  const ulEle = document.getElementById("calculation")
  prodList.innerHTML = ""
  ulEle.innerHTML = ""
  orders.forEach(val => {
    const prodDiv = document.createElement("div")
    prodDiv.className = "prod"
    // <div class="prod"></div>

    const prodImg = document.createElement("img")
    prodImg.src = val.img
    // <img src="${val.img}">

    const prodName = document.createElement("h1")
    prodName.textContent = val.name

    const increaseAmount = document.createElement("button")
    increaseAmount.textContent = "+"
    increaseAmount.onclick = () => manageAmount(1, val.name)

    const decreaseAmount = document.createElement("button")
    decreaseAmount.innerHTML = "-"
    decreaseAmount.onclick = () => manageAmount(-1, val.name)

    const quantity = document.createElement("h2")
    quantity.textContent = `${val.quantity}`

    const prodQQ = document.createElement("span")
    prodQQ.appendChild(decreaseAmount)
    prodQQ.appendChild(quantity)
    prodQQ.appendChild(increaseAmount)

    const prodCost = document.createElement("h2")
    prodCost.textContent = `Cost: ${val.cost}฿`

    prodDiv.appendChild(prodImg)
    prodDiv.appendChild(prodName)
    prodDiv.appendChild(prodQQ)
    prodDiv.appendChild(prodCost)

    prodList.appendChild(prodDiv)

    const liEle = document.createElement("li")
    liEle.textContent = `${val.name} x ${val.quantity} = ${val.cost}฿`

    ulEle.appendChild(liEle)
  })
  const sum = document.getElementById("sum")
  let res = 0;
  orders.map(val => {
    res += val.cost
  })
  if (res >= 3000) {
    res -= res * 0.1
    const liEle = document.createElement("li")
    liEle.textContent = `Discount 10% = ${res * 0.1}฿`
    liEle.style.color = "red"
    ulEle.appendChild(liEle)
  }
  sum.innerHTML = `Total: ${res}฿`
}

// Process Order when click to Buy
function addProd(number) { // 17
  const prod = Math.floor(number / 5)
  const which = number % 5
  let cost, name;
  if (prod == 0) {
    cost = products.skin_sol[Object.keys(products.skin_sol)[which]]
    name = Object.keys(products.skin_sol)[which]
  } else if (prod == 1) {
    cost = products.uv_protect[Object.keys(products.uv_protect)[which]]
    name = Object.keys(products.uv_protect)[which]
  } else if (prod == 2) {
    cost = products.cleansing[Object.keys(products.cleansing)[which]]
    name = Object.keys(products.cleansing)[which]
  } else {
    cost = products.shine_lip[Object.keys(products.shine_lip)[which]]
    name = Object.keys(products.shine_lip)[which]
  }
  manageOrder(name, cost, number)
  showOrders()
  console.log(orders)
  welcomeGuest()
}


// Travel to other pages
function gotoLogin() {
  window.location.href = "login.html"
}

function gotoSignup() {
  window.location.href = "signup.html"
}

function gotoHome() {
  window.location.href = "index.html"
}

// Login Session --> Login Page

function login() {
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  console.log(username, password)
  if (username == "admin" && password == "1234") {
    window.location.href = "loggedin.html"
  } else {
    alert("Username or Password is incorrect")
  }
}
