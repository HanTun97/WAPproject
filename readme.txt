1. run “npm install” on server folder and run “nodemon” or “node ./app.js”

2. run index.html from client side

3.1 Login with username and password
	{username: 'John', password: '111'},
    	{username: 'Edward', password: '222'}
	not match, show error message
	match => step 4

3.2 Refresh during login and exist session, no need login again
	Exit => click Logout button, clear session and redirect to login

4. display all products in page

5 load user's shopping cart
	no item => no item info display
	items => display items in shopping cart

6.1 Add To Cart buttom
	click once => add item to cart with minimum value is 1
	click next => increace one quantity 
	click more than stock => error message then no increase

6.2 “-“ or “+” in cart
	“-“ => reduce 1 quantity
	“-“ to 0 => remove from cart
	“+” => incease 1 quantity
	“+” to more than stock =>  error message then no increase

6.3 fill the quantiy amount from user
	less than 0 (0, -1, etc.) => set to 0 and remove from cart
	more than stock => error message then no increase

7. Every quantity changing with step 6, total price will be automatically updated and will not change stock.

8. place order buttom
	valid quantity => item stock value is changed in product list and remove from cart then no item info display
	more than stock => error message and remain invalid item remain
	
9. product stock is reached to 0, cart button is disabled. To prevent unnecessary load for server.


Swagger
-------
Swagger UI => http://localhost:3000/api-docs
Authorization Value => Bearer 1-John-1685083667037
Schemas
post => http://localhost:3000/login
get => http://localhost:3000/shopping/products
get => http://localhost:3000/shopping/users/{userId}/cart
get => http://localhost:3000/shopping/users/{userId}/cart/products/{productId}
put => http://localhost:3000/shopping/users/{userId}/cart/products/{productId}/step-change/{qty}
put => http://localhost:3000/shopping/users/{userId}/cart/products/{productId}/placeOrder/{qty}




1. client and server side are separated project

2. client and server side validation

3. generated a string with current datetime with username

4. send back to client side

5. store it in session storage

6. server side verify if it has a string with the request. 
	If has, allow access, if not, redirect to login page.

7. URL naming on the server side
8. All images of the products must be saved in server side



