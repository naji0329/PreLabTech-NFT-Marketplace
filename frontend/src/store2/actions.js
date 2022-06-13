import axios from 'axios'

export const getProducts = ({commit}) => {
    axios
        .get('https://my-json-server.typicode.com/TeodorDimitrov89/Vuex/products')
        .then(response => {
            let products = response.data
            commit('SET_PRODUCTS', products)
        })
}

export const getProduct = ({commit}, id) => {
    axios
        .get(`https://my-json-server.typicode.com/TeodorDimitrov89/Vuex/products/${id}`)
        .then(response => {
            let product = response.data
            commit('SET_PRODUCT', product)
        })
}


export const addProductToCart = ({commit}, {product, quantity}) => {
    commit('ADD_TO_CART', {product, quantity})

    axios
        .post('https://my-json-server.typicode.com/TeodorDimitrov89/Vuex/cart/', {
            // body: JSON.stringify({
                id: product.id,
                quantity,
            // }),
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))

}


export const getCartItems = ({commit}) => {
    //Call API to get all cartItems
    //TODO add real database Firebase
    axios
        .get('https://my-json-server.typicode.com/TeodorDimitrov89/Vuex/cart/')
        .then(response => {
            commit('SET_CART_ITEMS', response.data)
        })
        .catch(error => console.log(error))
}


export const removeProductFromCart = ({commit}, product) => {
    commit('REMOVE_PRODUCT_FROM_CART', product)
    //Call API to remove item from cart
}

export const removeAllCartItems = ({commit}) => {
    commit('REMOVE_ALL_CART_ITEMS')
    //Call API to remove All items from cart
}