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

    static editDown(userId, productId) {
        let pid = db.findIndex(prod => prod.id == productId);
        let cid = cart.findIndex(cart => cart.userId == userId & cart.productId == productId);
        cart[cid].qty -= 1;
        cart[cid].stock = db[pid].stock;
        if (cart[cid].qty < 1) {
            cart.splice(cid, 1);
        }
        return cart;
    }

    static editUp(userId, productId) {
        let pid = db.findIndex(prod => prod.id == productId);
        let cid = cart.findIndex(cart => cart.userId == userId & cart.productId == productId);
        cart[cid].qty += 1;
        cart[cid].stock = db[pid].stock;
        return cart;
    }

    static getAll() {
        return db;
    }

    static getAllCart(userId) {
        return cart.filter(cart => cart.userId == userId);
    }

    static getById(userId, productId) {
        let pid = db.findIndex(prod => prod.id == productId);
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
}