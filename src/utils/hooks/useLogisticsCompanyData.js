import { useState } from 'react'

export const useInitialValues = () => {
  // data
  const [initialValues, setInitialValues] = useState({
    // eslint-disable-line
    companyType: 'Shipping Line',
    companyName: '',
    vatNumber: '',
    creditPeriod: '',
    contactNumber: '',  
    address: '',
    note: '',
    contactPersons:[],
    name: '',
    phoneNo: '',
    email: '',       
    bankDetails: [],
    bankAccountName: '',
    bankAccountNumber: '',
    currency: 'LKR',    
    bankName: '',
    branch: '',
    bankAddress: '',
    swiftCode: '',    
  })

  return [initialValues, setInitialValues]
}

export const currencies = [
  {
    value: 'LKR',
    label: 'Rs',
  },
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EURO',
    label: '€',
  },
]
