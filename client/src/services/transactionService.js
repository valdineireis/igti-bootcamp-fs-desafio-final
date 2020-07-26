import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/transaction';
const HEADERS = { 'Content-Type': 'application/json' };

const serviceGetTransactions = async (period) => {
    const url = `${BASE_URL}?period=${period}`;
    const resource = await fetch(url);
    const json = await resource.json();
    return json;
};

const serviceRemoveTransaction = async (transactionId) => {
    const res = await axios.delete(`${BASE_URL}/${transactionId}`);
    return res;
};

const serviceUpdateTransaction = async (formData) => {
    const res = await axios.put(
        `${BASE_URL}/${formData.id}`,
        formData,
        HEADERS
    );
    return res;
};

const serviceInsertTransaction = async (formData) => {
    const res = await axios.post(BASE_URL, formData, HEADERS);
    return res;
};

export {
    serviceGetTransactions,
    serviceRemoveTransaction,
    serviceUpdateTransaction,
    serviceInsertTransaction,
};
