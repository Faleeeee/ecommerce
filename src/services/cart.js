import axios from 'axios';

const API_URL = 'http://localhost:3003/carts';

export const getCartByUserId = async (userId) => {
  try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const removeCartItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};


export const AddtoCart = async (userId,productId) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      user: userId, 
      products: [{ 
        product: productId,
        quantity: 1 
      }],
      totalPrice:1,
      totalQuantity:1,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (cartId, productId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/${cartId}`, {
      productId : productId,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }

};







