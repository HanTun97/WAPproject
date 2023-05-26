let db = [
    {
        "id": 1,
        "name": "NodeJS",
        "price": 9.99,
        "image": "http://localhost:3000/img/node.png",
        "stock": 8,
    },
    {
        "id": 2,
        "name": "React",
        "price": 19.99,
        "image": "http://localhost:3000/img/react.png",
        "stock": 5,
    },
    {
        "id": 3,
        "name": "Angular",
        "price": 29.99,
        "image": "http://localhost:3000/img/angular.png",
        "stock": 13,
    }
]

let cart = [];

module.exports = class Product {
    constructor(id, name, price, image, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;
    }

    static edit(userId, productId, qty) {
        let pid = db.findIndex(prod => prod.id == productId);
        let cid = cart.findIndex(cart => cart.userId == userId & cart.productId == productId);
        if (pid == -1 | cid == -1) {
            return { "error": "Not Found in Your Cart" };
        }
        let total = qty * db[pid].price;
        if (qty < 1) {
            cart.splice(cid, 1);
            total = 0 * db[pid].price;
            return { "value": 0, "price": total };
        }
        if (db[pid].stock < qty) {
            total = cart[cid].qty * db[pid].price;
            return { "error": "Stock is limited", "value": cart[cid].qty, "price": total };
        }
        cart[cid].qty = qty;
        return { "value": cart[cid].qty, "price": total };
    }

    static getAll() {
        return db;
    }

    static getAllCart(userId) {
        return cart.filter(cart => cart.userId == userId);
    }

    static getById(userId, productId) {
        let pid = db.findIndex(prod => prod.id == productId);
        if (pid == -1) {
            return { "error": "Product Not Found" };
        } else if (db[pid].stock == 0) {
            return { "error": "Out of Stock" };
        }
        let cid = cart.findIndex(cart => cart.userId == userId & cart.productId == productId);
        if (cid == -1) {
            cart.push({
                userId: userId,
                productId: productId,
                name: db[pid].name,
                price: db[pid].price,
                qty: 1,
                stock: db[pid].stock,
            })
        }
        return db.filter(prod => prod.id == productId);
    }

    static placeOrder(userId, productId, qty) {
        let pid = db.findIndex(prod => prod.id == productId);
        let cid = cart.findIndex(cart => cart.userId == userId & cart.productId == productId);
        if (pid != -1) {
            if (db[pid].stock < qty) {
                return { "unsucess": db[pid].name + " Out of Stock" };
            }
            db[pid].stock -= qty;
        } else {
            return { "error": "Product Not Found" };
        }
        if (cid != -1) {
            cart.splice(cid, 1);
        } else {
            return { "error": "No Product in Cart" };
        }
        return { "success": "Order Confirmed" };
    }
}