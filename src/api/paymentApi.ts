import axios from "axios";

export const initiatePayment = async (formData: any) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/payu`, formData);
    return response.data;
  } catch (error) {
    throw new Error("Error al procesar el pago");
  }
};

export const completePayment = async (payload: any) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/complete`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Error al completar la transacción");
  }
};