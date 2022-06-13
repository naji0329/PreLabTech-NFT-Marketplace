export const SET_PRODUCTS = (state, products) => {
    state.products = products
}


export const SET_PRODUCT = (state, product) => {
    state.product = product
}

export const ADD_TO_CART = (state, { product, quantity }) => {
    let productInCart = state.cart.find(item => {
        return item.product.id === product.id
    })

    if(productInCart) {
        productInCart.quantity+=quantity
        return
    }

    state.cart.push({
        product,
        quantity
    })
}


export const SET_CART_ITEMS = (state, cartItems) => {
    state.cart = cartItems;

}

export const REMOVE_PRODUCT_FROM_CART = (state, product) => {
    state.cart = state.cart.filter(item => {
        return item.product.id !== product.id
    })
}

export const REMOVE_ALL_CART_ITEMS = (state) => {
    state.cart = [];
}