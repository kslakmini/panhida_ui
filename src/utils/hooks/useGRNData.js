import { useState } from 'react'

export const useInitialValues = () => {
  const [initialValues, setInitialValues] = useState({ 
    poNumber: '',  
    orderedDate: '',
    supplier: '',    
    orderNo: '',  
    purchaseOrders: [],
    cart: [],      
    packingMaterialName: '',  
    packingId: '',
    actualSize: '',
    orderSize: '', 
    brandName: '',
    brandId: '',
    artWork: '',    
    receivedQty: '',
    grnDate: '',       
    index: ''
  })

  return [initialValues, setInitialValues]
}



