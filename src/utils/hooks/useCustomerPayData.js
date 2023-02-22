import { useState } from "react"


export const useInitialValues = () => {
  const [initialValues, setInitialValues] = useState({ // eslint-disable-line   
    proformaInvoiceNo: '',    
    invoiceValue: '',
    invoiceDate: '',
    balance: '',
    paymentTerms: '',
    subInvoiceValue: '',
    ttAmount: '',
    validityDate: '',
    receivedAmount: '',
    receivedDate: '',    
  })

  return [initialValues, setInitialValues]
}
