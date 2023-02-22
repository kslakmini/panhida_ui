import { useState } from 'react'

export const useInitialValues = () => {
  const [initialValues, setInitialValues] = useState({
    orderNo: '',
    supplierId: '',
    factoryId: '',
    deliveryAddress: '',
    orderedDate: '',
    salesPersonName:'',
    currencyType: 'LKR',
    paymentTerm: 'ON CREDIT',
    packingMaterials: [],
    cart: [],
    specs: [],
    specifications: [],
    packingName: '',
    packingId: '',
    orderQty: '',
    unitPrice: '',
    totalAmount: '',
    brandName: '',
    brandId: '',
    artWork: '',
    actualSize: '',
    orderSize: '',
    index: '',   
    
  })

  return [initialValues, setInitialValues]
}

export const paymentTerms = ["100% IN ADVANCE", "100% ON DELIVERY", "ON CREDIT"]
export const currencyType = ["LKR", "USD", "EURO"]

