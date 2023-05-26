window.onload = function () {
    const auth = sessionStorage.getItem('accessToken');
    if (auth) {
        let userName = auth.split('-')[1];
        afterLoginDisplay(userName);
    }

    document.getElementById('loginBtn').onclick = function () {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    sessionStorage.setItem('accessToken', data.accessToken);
                    afterLoginDisplay(data.username);
                }
            })
    }

    function afterLoginDisplay(userName) {
        document.getElementById('homeContent').style.display = "none";
        document.getElementById('login').style.display = "none";
        document.getElementById('loginBtn').style.display = "none";

        document.getElementById('productContent').style.display = "block";
        document.getElementById('loginInfo').style.display = "block";
        document.getElementById('loginInfo').innerHTML = "Welcome, " + userName;
        document.getElementById('logoutBtn').style.display = 'block';
        fetchProduct();
        fetchCart();
    }

    document.getElementById('logoutBtn').onclick = function () {
        sessionStorage.setItem('accessToken', '');
        document.getElementById('productContent').style.display = "none";
        document.getElementById('loginInfo').style.display = "none";
        document.getElementById('logoutBtn').style.display = 'none';

        document.getElementById('homeContent').style.display = "block";
        document.getElementById('login').style.display = "block";
        document.getElementById('loginBtn').style.display = "block";
    }
}


function getUserId() {
    const auth = sessionStorage.getItem('accessToken');
    return auth.split('-')[0];
}

// Products and User Shopping Cart Data Fetch

function fetchProduct() {
    const list = document.getElementById('tbodyProductList');
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    fetch('http://localhost:3000/shopping/products', {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            for (let product of data)
                addRow(product.id, product.name, product.price, product.image, product.stock)
        });
}

function addRow(id, name, price, image, stock) {
    let row = document.createElement('tr');
    row.setAttribute('id', id);
    let idCol = true;
    let count = 0;
    let imgCol = 3;
    for (let e of arguments) {
        let cell = document.createElement('td');
        if (idCol) {
            cell.hidden = true;
            idCol = false;
        }
        if (imgCol == count) {
            let img = document.createElement('img');
            img.setAttribute('src', e);
            img.setAttribute('class', "productImage");
            cell.appendChild(img)
        } else {
            cell.appendChild(document.createTextNode(e))
        }
        row.appendChild(cell);
        count++;
    }
    let cell = document.createElement('td');
    let btn = document.createElement('button');
    btn.setAttribute('class', "btn btn-primary");

    let i = document.createElement('i');
    i.setAttribute('class', "fa fa-shopping-cart");
    i.setAttribute('onclick', "addToCart(" + id + ")");

    btn.appendChild(i);
    if (stock == 0) {
        btn.disabled = true;
    }
    cell.appendChild(btn);
    row.appendChild(cell);
    document.getElementById('tbodyProductList').appendChild(row);
}

function fetchCart() {
    const cart = document.getElementById('tbodyShoppingCart');
    while (cart.hasChildNodes()) {
        cart.removeChild(cart.firstChild);
    }
    let userId = getUserId();
    fetch('http://localhost:3000/shopping/users/' + userId + "/cart", {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                document.getElementById('divNoCart').style.display = "block";
                document.getElementById('divShoppingCart').style.display = "none";
            } else {
                document.getElementById('divNoCart').style.display = "none";
                document.getElementById('divShoppingCart').style.display = "block";
                for (let product of data)
                    addCart(product.productId, product.name, product.price, product.qty, product.stock)
                getSubTotal();
            }
        });
}

function addCart(id, name, price, qty, stock) {
    let row = document.createElement('tr');
    row.setAttribute('id', 'cart' + id);
    let arr = [id, name, price]
    let idCol = true;
    for (let product of arr) {
        let cell = document.createElement('td');
        if (idCol) {
            cell.hidden = true;
            idCol = false;
        }
        cell.appendChild(document.createTextNode(product))
        row.appendChild(cell);
    }
    let totoalCell = document.createElement('td');
    totoalCell.appendChild(document.createTextNode(price * qty))
    totoalCell.setAttribute('id', 'total' + id);
    row.appendChild(totoalCell);

    let cell = document.createElement('td');
    let btn1 = document.createElement('button');
    btn1.setAttribute('class', 'btn btn-link px-2');
    btn1.setAttribute('onclick', 'stepDown(' + id + ')');
    btn1.style.backgroundColor = 'lightblue';
    let i1 = document.createElement('td');
    i1.setAttribute('class', 'fas fa-minus');
    btn1.appendChild(i1)
    cell.appendChild(btn1)

    let inp = document.createElement('input');
    inp.setAttribute('min', '0');
    inp.setAttribute('onchange', 'stepChange(' + id + ')');
    inp.setAttribute('name', 'quantity');
    inp.setAttribute('type', 'number');
    inp.setAttribute('value', qty);
    inp.setAttribute('id', 'qty' + id);
    inp.setAttribute('class', 'form-control form-control-sm');
    inp.style.width = '80px';
    inp.style.display = 'inline';
    inp.style.margin = '0% 10%';
    cell.appendChild(inp)

    let btn2 = document.createElement('button');
    btn2.setAttribute('class', 'btn btn-link px-2');
    btn2.setAttribute('onclick', 'stepUp(' + id + ')');
    btn2.style.backgroundColor = 'lightblue';
    let i2 = document.createElement('td');
    i2.setAttribute('class', 'fas fa-plus');
    btn2.appendChild(i2)
    cell.appendChild(btn2)
    row.appendChild(cell);
    document.getElementById('tbodyShoppingCart').appendChild(row);
}

// User Add To Cart

function addToCart(id) {
    document.getElementById('divNoCart').style.display = "none";
    document.getElementById('divShoppingCart').style.display = "block";
    let userId = getUserId();
    fetch('http://localhost:3000/shopping/users/' + userId + "/cart/products/" + id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                fetchCart();
            } else {
                let existInCart = document.getElementById('cart' + data[0].id);
                if (existInCart) {
                    let qty = parseInt(document.getElementById('qty' + data[0].id).value);
                    stepChange(data[0].id, qty + 1)
                } else {
                    let row = document.createElement('tr');
                    row.setAttribute('id', 'cart' + data[0].id);
                    let arr = [data[0].id, data[0].name, data[0].price]
                    let idCol = true;
                    for (let product of arr) {
                        let cell = document.createElement('td');
                        if (idCol) {
                            cell.hidden = true;
                            idCol = false;
                        }
                        cell.appendChild(document.createTextNode(product))
                        row.appendChild(cell);
                    }
                    let totoalCell = document.createElement('td');
                    totoalCell.appendChild(document.createTextNode(data[0].price * 1))
                    totoalCell.setAttribute('id', 'total' + id);
                    row.appendChild(totoalCell);

                    let cell = document.createElement('td');
                    let btn1 = document.createElement('button');
                    btn1.setAttribute('class', 'btn btn-link px-2');
                    btn1.setAttribute('onclick', 'stepDown(' + data[0].id + ')');
                    btn1.style.backgroundColor = 'lightblue';
                    let i1 = document.createElement('td');
                    i1.setAttribute('class', 'fas fa-minus');
                    btn1.appendChild(i1)
                    cell.appendChild(btn1)

                    let inp = document.createElement('input');
                    inp.setAttribute('min', '0');
                    inp.setAttribute('onchange', 'stepChange(' + data[0].id + ')');
                    inp.setAttribute('name', 'quantity');
                    inp.setAttribute('type', 'number');
                    inp.setAttribute('value', '1');
                    inp.setAttribute('id', 'qty' + data[0].id);
                    inp.setAttribute('class', 'form-control form-control-sm');
                    inp.style.width = '80px';
                    inp.style.display = 'inline';
                    inp.style.margin = '0% 10%';
                    cell.appendChild(inp)

                    let btn2 = document.createElement('button');
                    btn2.setAttribute('class', 'btn btn-link px-2');
                    btn2.setAttribute('onclick', 'stepUp(' + data[0].id + ')');
                    btn2.style.backgroundColor = 'lightblue';
                    let i2 = document.createElement('td');
                    i2.setAttribute('class', 'fas fa-plus');
                    btn2.appendChild(i2)
                    cell.appendChild(btn2)
                    row.appendChild(cell);
                    document.getElementById('tbodyShoppingCart').appendChild(row);
                    getSubTotal();
                }
            }
        });
}

// Order Quantity Changing

function stepDown(pid) {
    let value = parseInt(document.getElementById('qty' + pid).value);
    stepChange(pid, value - 1);
}

function stepUp(pid) {
    let value = parseInt(document.getElementById('qty' + pid).value);
    stepChange(pid, value + 1);
}

function stepChange(pid, qty = null) {
    if (qty == null) {
        qty = parseInt(document.getElementById('qty' + pid).value);
    }
    let userId = getUserId();
    fetch('http://localhost:3000/shopping/users/' + userId + "/cart/products/" + pid + "/step-change/" + qty, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            document.getElementById('qty' + pid).value = data.value;
            document.getElementById('total' + pid).innerHTML = data.price.toFixed(2);
            if (data.error) {
                alert(data.error);
            } else {
                if (data.value == 0) {
                    document.getElementById('cart' + pid).remove();
                    if (!document.getElementById('tbodyShoppingCart').hasChildNodes()) {
                        document.getElementById('divNoCart').style.display = "block";
                        document.getElementById('divShoppingCart').style.display = "none";
                    }
                }
            }
            getSubTotal();
        }
        )
}

// Total Amount

function getSubTotal() {
    const shopCart = document.querySelectorAll("#tbodyShoppingCart>tr>td:nth-child(4n)");
    let subtotal = 0;
    for (amount of shopCart) {
        subtotal += parseFloat(amount.innerHTML);
    }
    document.getElementById('subtotal').innerHTML = subtotal.toFixed(2);
}

// Place Order

document.getElementById('placeOrder').onclick = function () {
    const productIds = document.querySelectorAll("#tbodyShoppingCart>tr>td:nth-child(1)");
    const qtyValues = document.querySelectorAll("#tbodyShoppingCart>tr>td input");
    for (let i = 0; i < productIds.length; i++) {
        updateOrder(parseInt(productIds[i].innerHTML), parseInt(qtyValues[i].value));
    }
    alert("Place Order");
    fetchProduct();
    fetchCart();
}

function updateOrder(pid, qty) {
    let userId = getUserId();
    fetch('http://localhost:3000/shopping/users/' + userId + "/cart/products/" + pid + "/placeOrder/" + qty, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else if (data.unsucess) {
                alert(data.unsucess);
            }
        }
        )
}