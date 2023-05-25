window.onload = function () {
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
                    document.getElementById('errorMsg').innerHTML = data.error;
                } else {
                    sessionStorage.setItem('accessToken', data.accessToken);
                    document.getElementById('homeContent').style.display = "none";
                    document.getElementById('login').style.display = "none";
                    document.getElementById('loginBtn').style.display = "none";

                    document.getElementById('productContent').style.display = "block";
                    document.getElementById('loginInfo').style.display = "block";
                    document.getElementById('loginInfo').innerHTML = "Welcome, " + data.username;
                    document.getElementById('logoutBtn').style.display = 'block';
                    fetchProduct();
                    userCart();

                }
            })

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

function fetchProduct() {
    const list = document.getElementById('tbodyProductList');
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    fetch('http://localhost:3000/products', {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('products').innerHTML = data.error;
            } else {
                for (let product of data)
                    addRow(product.id, product.name, product.price, product.image, product.stock)
            }
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
    cell.appendChild(btn);
    row.appendChild(cell);
    document.getElementById('tbodyProductList').appendChild(row);
}

function userCart() {
    const cart = document.getElementById('tbodyShoppingCart');
    while (cart.hasChildNodes()) {
        cart.removeChild(cart.firstChild);
    }
    const auth = sessionStorage.getItem('accessToken');
    let user = auth.split('-')[0];
    fetch('http://localhost:3000/products/' + user + "/cart/", {
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
            }
        });
}

function addCart(id, name, price, qty, stock) {
    let row = document.createElement('tr');
    row.setAttribute('id', 'cart' + id);
    let arr = [name, price, price * 1]
    for (let product of arr) {
        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(product))
        row.appendChild(cell);
    }
    let cell1 = document.createElement('td');
    let btn1 = document.createElement('button');
    btn1.setAttribute('class', 'btn btn-link px-2');
    btn1.setAttribute('onclick', 'stepDown(' + id + ')');
    btn1.style.backgroundColor = 'lightblue';
    let i1 = document.createElement('td');
    i1.setAttribute('class', 'fas fa-minus');
    btn1.appendChild(i1)
    cell1.appendChild(btn1)
    row.appendChild(cell1);

    let cell = document.createElement('td');
    let inp = document.createElement('input');
    inp.setAttribute('min', '0');
    inp.setAttribute('max', stock);
    inp.setAttribute('name', 'quantity');
    inp.setAttribute('type', 'number');
    inp.setAttribute('value', qty);
    inp.setAttribute('id', 'qty' + id);
    inp.setAttribute('class', 'form-control form-control-sm');
    inp.style.width = '80px';
    cell.appendChild(inp)
    row.appendChild(cell);


    let cell2 = document.createElement('td');
    let btn2 = document.createElement('button');
    btn2.setAttribute('class', 'btn btn-link px-2');
    btn2.setAttribute('onclick', 'stepUp(' + id + ',' + stock + ')');
    btn2.style.backgroundColor = 'lightblue';
    let i2 = document.createElement('td');
    i2.setAttribute('class', 'fas fa-plus');
    btn2.appendChild(i2)
    cell2.appendChild(btn2)
    row.appendChild(cell2);
    document.getElementById('tbodyShoppingCart').appendChild(row);
}

function addToCart(id) {
    document.getElementById('divNoCart').style.display = "none";
    document.getElementById('divShoppingCart').style.display = "block";
    const auth = sessionStorage.getItem('accessToken');
    let user = auth.split('-')[0];
    fetch('http://localhost:3000/products/' + user + "/cart/" + id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('products').innerHTML = data.error;
            } else {
                let row = document.createElement('tr');
                row.setAttribute('id', 'cart' + data[0].id);
                let arr = [data[0].name, data[0].price, data[0].price * 1]
                for (let product of arr) {
                    let cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(product))
                    row.appendChild(cell);
                }
                let cell1 = document.createElement('td');
                let btn1 = document.createElement('button');
                btn1.setAttribute('class', 'btn btn-link px-2');
                btn1.setAttribute('onclick', 'stepDown(' + data[0].id + ')');
                btn1.style.backgroundColor = 'lightblue';
                let i1 = document.createElement('td');
                i1.setAttribute('class', 'fas fa-minus');
                btn1.appendChild(i1)
                cell1.appendChild(btn1)
                row.appendChild(cell1);

                let cell = document.createElement('td');
                let inp = document.createElement('input');
                inp.setAttribute('min', '0');
                inp.setAttribute('max', data[0].stock);
                inp.setAttribute('name', 'quantity');
                inp.setAttribute('type', 'number');
                inp.setAttribute('value', '1');
                inp.setAttribute('id', 'qty' + data[0].id);
                inp.setAttribute('class', 'form-control form-control-sm');
                inp.style.width = '80px';
                cell.appendChild(inp)
                row.appendChild(cell);


                let cell2 = document.createElement('td');
                let btn2 = document.createElement('button');
                btn2.setAttribute('class', 'btn btn-link px-2');
                btn2.setAttribute('onclick', 'stepUp(' + data[0].id + ',' + data[0].stock + ')');
                btn2.style.backgroundColor = 'lightblue';
                let i2 = document.createElement('td');
                i2.setAttribute('class', 'fas fa-plus');
                btn2.appendChild(i2)
                cell2.appendChild(btn2)
                row.appendChild(cell2);
                document.getElementById('tbodyShoppingCart').appendChild(row);
            }
        });
}

function stepDown(selector) {
    let value = parseInt(document.getElementById('qty' + selector).value);
    document.getElementById('qty' + selector).value = value - 1;
    if ((value - 1) == 0) {
        document.getElementById('cart' + selector).remove();
        if (!document.getElementById('tbodyShoppingCart').hasChildNodes()) {
            document.getElementById('divNoCart').style.display = "block";
            document.getElementById('divShoppingCart').style.display = "none";
        }
    }
    const auth = sessionStorage.getItem('accessToken');
    let user = auth.split('-')[0];
    fetch('http://localhost:3000/products/' + user + "/cart/step-down/" + selector, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data);
            } else {
                console.log(data)
            }
        }
        )
}

function stepUp(selector, limit) {
    let value = parseInt(document.getElementById('qty' + selector).value);
    if (value != limit) {
        document.getElementById('qty' + selector).value = value + 1;
        const auth = sessionStorage.getItem('accessToken');
        let user = auth.split('-')[0];
        fetch('http://localhost:3000/products/' + user + "/cart/step-up/" + selector, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log(data);
                } else {
                    console.log(data)
                }
            }
            )
    }
}