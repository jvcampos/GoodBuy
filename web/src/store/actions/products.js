// action
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/'
})

export function addProduct(id_category, name_category, name_product, imageBase64, description, value, amount) {
  console.log(amount)
  return (dispatch) => {
    return api.post('product', {
      id_category,
      name_category,
      name_product,
      imageBase64,
      description,
      value,
      amount,
      id_supermarket: JSON.parse(localStorage.id_supermarket),
    },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        dispatch(newProduct(response.data))
      })
  }
}

export function updateProduct(id_product, id_category, name_category, name_product, imageBase64, description, value, amount) {
  return (dispatch) => {
    return api.put(`product/${id_product}`, { id_category, name_category, name_product, imageBase64, description, value, amount }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(() => {
        this.getProducts(localStorage.getItem('id'))
      })
  }
}

export function getProducts(id_supermarket) {
  return (dispatch) => {
    api.get(`products/${id_supermarket}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        dispatch(getAllProducts(response.data))
      })
  }
}

export function deleteProduct(id) {
  return (dispatch) => {
    api.delete(`product/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        dispatch(removeProduct(response.data))
      })
  }
}

export const newProduct = (data) => {
  return {
    type: 'ADD_PRODUCT',
    data
  }
}

export const getAllProducts = (data) => {
  return {
    type: 'GET_ALL_PRODUCT',
    data
  }
}

export const removeProduct = (data) => {
  return {
    type: "DELETE_PRODUCT",
    id: data.data.id
  }
}
