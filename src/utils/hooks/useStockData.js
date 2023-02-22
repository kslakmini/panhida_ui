import { useState } from "react"


export const useInitialValues = () => {
  // data
  const [initialValues, setInitialValues] = useState({ // eslint-disable-line   
    //stock data 
    packingId: '',    
    orderSizes: [],
    stockDetails: [],
    data: [],
    searchType: '',

    //transferStock data
    poNumber: '',  
    orderNo: '',
    transferOrderNo: '',
    stockId: '',
    packingName: '',
    materialId: '',
    brandId: '',
    artWork: '',
    quantity: '',
    orderSize: '', 
    noteNo: '',
    transferType: ''  
      
  })

  return [initialValues, setInitialValues]
}
