import { useState, useEffect } from 'react';
import axios from 'axios';

export const useInvoice = ({ setAlert }) => {
  // states ++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [item, setItem] = useState({
    productId: '',
    brandId: '',
    typeId: '',
    id: '',
    unitPrice: 0,
    qty: 0,
  });

  const [cart, setCart] = useState([]); // eslint-disable-line

  const [items, setItems] = useState([]);

  // useEffect ++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    //load items
    loadItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // load items
  const loadItems = async () => {
    try {
      // let items = await axios.get('/item');
      let items = await axios.get('/product');

      setItems(items.data);
    } catch (error) {
      setAlert({
        showAlert: true,
        severity: 'error',
        message: 'Customer loading failed!',
      });
    }
  };

  const itemChange = async (e) => {
    setItem({ ...item, [e.target.name]: Number(e.target.value) });
  };
  return {
    item,
    setItem,
    itemChange,
    items,
    cart,
  };
};
