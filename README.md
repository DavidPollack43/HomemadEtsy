# HomemadEtsy

## Table of Contents
- [Overview](#overview)
- [Live Demo](#live-demo)
- [Technologies Used](#technologies-used)
- [Features](#features)
  - [Efficient State Shape with Jbuilder](#efficient-state-shape-with-jbuilder)
  - [Dynamic Shopping Cart](#dynamic-shopping-cart)
- [Future Directions](#future-directions)

---

## Overview

HomemadEtsy is an E-commerce platform based off on Etsy, a application that focuses on homemade products made with unique craftsman ship that one would not see on other e-commerce sites. HomemadEtsy, like Etsy, aims to connect buyers with sellers offering unique, handcrafted goods. Although right now the products are generic, I would like to expand on them in the future in the future to show off real handcrafted products from around the world. The platform is organized into categories like Jewelry & Accessories, Clothing & Shoes, Home & Living, Wedding & Party, and Craft Supplies to ease the shopping experience.

---

## Live Demo
Check out the live website [here](https://homemadetsy.onrender.com/).

---

## Technologies Used

- React.js
- JavaScript
- Ruby on Rails
- Jbuilder
- PostgreSQL 15

---

## Features

### Efficient State Shape with Jbuilder

#### Challenges
Creating a state shape that was easily accessible by React components, readable, and efficient in terms of rendering time was a challenging task. 

#### Solutions
To solve this, I used Jbuilder to structure my JSON responses from the Rails backend. This allowed me to only include the data that was absolutely necessary for the front end, thus speeding up render times. I also wanted to solve the N+1 query issue, in which multiple fetches could be made for one piece of data. This would cause a slower, less interactable app, as well as an increase of fetches, which if fetching from a paid API, could be expensive. In order to solve this, I used the .includes method to load everything needed for a product or any other type of data in one request rather then many

#### Code Snippets
#### JBuilder Code:
```ruby
@products.each do |product|
    json.set! product.id do 
        json.extract! product, :id, :title, :description, :price, :stock_quantity
        json.photoUrl product.photo.attached? ? product.photo.url : nil 
        json.user do 
            json.id product.user.id
            json.username product.user.username
        end
        json.category do 
            json.id product.category.id
            json.name product.category.name
        end
    end
end
```
#### Products Controller Code:
```ruby
  def index
    @products = Product.includes(:category, :user).all
    render :index
  end
```
##### Explanation
The Jbuilder code is what is sent to the front end to be used as a data base for react componenets. 
- The first step is seperating the @products into many products, and extracting the same data for each
- Then, I extract the id, title, description, and other information about each product
- I also extract information about the products such as the user that the proudct belongs to, as well as the category that the product belongs to
- The above point would usually cause more fetches to get this information, but the next section of code shows how it is all being fetched at once

The Products Controller will control what gets sent to the jbuilder when index route is called
- The frist thing that is done is @products is being initialzed by calling Proudct.all, which is all of the products.
- In the middle however, we are also calling .includes(:category, :user). What this will do is preload the category and user associations/information attached to the products. This will cause only one fetch as we have all the information that the Jbulider is asking for

---

### Dynamic Shopping Cart

#### Challenges
Implementing a shopping cart that was both user-specific and CRUD-capable was a considerable challenge. 

#### Solutions
For tracking cart items based on the user, I utilized Rails sessions tied to unique user IDs. CRUD operations were then handled using Rails routes and controllers to ensure a seamless user experience.

##### Code Snippets
```javascript
export const fetchCart = () => async (dispatch) => {
    const res = await fetch("/api/cart_items");
    if(res.ok){
        const data = await res.json();
        dispatch(receiveCart(data));
    }else{
        const errorMessage = await res.json();
        console.error("Failed to fetch cart", errorMessage.message || "Unknown Error")
    }
}

export const addToCart = (productId, quantity) => async(dispatch) => {
    const res = await csrfFetch("/api/cart_items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({product_id: productId, quantity: quantity})
    })
    if(res.ok){
        const data = await res.json();
        dispatch(receiveCartItem(data));
        return true;
    }else{
        const errorMessage = await res.json();
        console.error("Failed to add to cart", errorMessage.message || "Unknown Error");
        return false;
    }
}

export const updateToCart = (cartItemId, quantity) => async(dispatch) => {
    // debugger
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({cartItemId: cartItemId, quantity: quantity})
    })
    if(res.ok){
        const data = await res.json();
        dispatch(receiveCartItem(data));
        return true;
    }else{
        const errorMessage = await res.json();
        console.error("Failed to update cart", errorMessage.message || "Unknown Error");
        return false;
    }
}

export const deleteCartItem = (cartItemId) => async(dispatch) => {
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(res.ok){
        dispatch(removeCartItem(cartItemId));
    }else{
        const errorMessage = await res.json();
        console.error("Failed to delete cart item", errorMessage.message || "Unknown Error");
    }
}

export const cartReducer = (state = {}, action) => {
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_CART:
            return{...state, ...action.payload}
        case RECEIVE_CART_ITEM:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case REMOVE_CART_ITEM:
            delete nextState[action.payload]
            return nextState;
        case REMOVE_CURRENT_USER:
            return {};
        default:
            return state;
    }
}
```
##### Explanation
These are my thunk actions and reducer for my cart
- The first thunk action will grab everything in the cart data base (if anything exists) from the backend.
- The second thunk action will add a data entry to the cart. A cart item is associated with a product and a user (the user who put an item in their cart), this information is added to the data base here.
- The third thunk action will update a cart item in the data base.
- The fourth thunk action will delete a cart item from the data base.
- The reducer is what changes the state based on the action caused. Each case will return an appropriately updated state (changes depeding on the action dispatched to this reducer).

---

## Future Directions
- Addition of a reviews feature.
- Implementation of an orders system.
- Revamping the splash page for a more modern look.
- General quality and design improvements.

