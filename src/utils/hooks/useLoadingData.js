import { useState } from "react"

let d = new Date()

let datestring =
  ('0' + (d.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + d.getDate()).slice(-2) +
  '-' +
  d.getFullYear() +
  ' ' +
  ('0' + d.getHours()).slice(-2) +
  ':' +
  ('0' + d.getMinutes()).slice(-2)

export const useInitialValues = () => {
  // data
  const [initialValues, setInitialValues] = useState({ // eslint-disable-line   
    orderNo: '',
    subOrderNo:'',    
    invoiceItems:[],
    volumes: [], 
    name: '',
    number: '',
    containerNo: '',
    sealNo: '',            
    factoryName: '', 
    factoryLocation: '',         
    productId: '',
    productName: '',    
    loadingQty: '',      
    loadingDateAndTime: datestring,          
    palletNo: '',
    noOfContainer: ''
    
  })

  return [initialValues, setInitialValues]
}
