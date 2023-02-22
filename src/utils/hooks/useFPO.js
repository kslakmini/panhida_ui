import { useState } from 'react';
import axios from 'axios';

export const useFPO = ({ setAlert }) => {
  // data
  const [initialValues, setInitialValues] = useState({
    // eslint-disable-line
    factory: '',
    from: 'Go Green Exports (Pvt) Ltd.',
    date: '',
    createdDate: '',
    invoice: '',
    orderNo: '',
    items: [],
    itemId: '',
    advance50: false,
    delivery100: false,
    credit30: false,
    invoiceItems: [],
    subOrderNo: '',
    noOfPallets: '',
    unitPerPallets: '',
    unitPrice: '',
    qty: '',
    unitType: 'bags',
  });

  const [items, setItems] = useState([]);
  const [callingBackend, setCallingBackend] = useState(false); // eslint-disable-line

  // create method
  const submit = async (e, { resetForm }) => {
    try {
      await axios.post('/purchaseOrder', e);
      resetForm();
      setAlert({
        showAlert: true,
        severity: 'success',
        message: 'Order created successfully!',
      });
    } catch (error) {
      setAlert({
        showAlert: true,
        severity: 'error',
        message: 'Order creation failed!',
      });
    }
  };

  const onChange = (e, setFieldValue) => {
    // const invoice = invoices.find(
    //   (inv) => Number(inv.id) === Number(e.target.value)
    // );
    // setFieldValue('invoice', e.target.value);
    // setItems(invoice.items);
  };

  const addItem = (e, setFieldValue) => {
    const foundItem = e.items.find((itm) => itm.itemId === e.itemId);

    const original = items.find((item) => item.id === e.itemId);

    if (!foundItem) {
      const length = e.items.length;
      const obj = {
        noOfPallets: e.noOfPallets,
        unitPerPallets: e.unitPerPallets,
        unitPrice: e.unitPrice,
        unitType: e.unitType,
        totalQty: e.unitPerPallets * e.noOfPallets,
        totalPrice: e.unitPrice * (e.unitPerPallets * e.noOfPallets),
        itemId: e.itemId,
        description: original.description,
      };
      setFieldValue(`items.${length}`, obj);
    }
  };

  return {
    initialValues,
    addItem,
    onChange,
    submit,
    items,
    callingBackend,
    setItems,
  };
};
