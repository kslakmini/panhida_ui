import { useState } from "react"

export const useInitialValues = () => {
  const [initialValues, setInitialValues] = useState({
    type: 'agent',
    name: '',
    contactPerson: '',
    postalCode: '',
    taxId: '',
    refNo: '',
    palletLabel: '',
    contactNumber1: '',
    contactNumber2: '',
    contactNumber3: '',
    address: '',
    courierAddress: '',
    email1: '',
    email2: '',
    email3: '',
    DOB: null,
    country: '',
    agent: '',
    description: '',
    docs: [],
    documents: [],
    bankDetails: [],
    bankContactPerson: '',
    bankAccountName: '',
    bankAccountNumber: '',
    swiftCode: '',
    branch: '',
    bankAddress: '',
  })

  return [initialValues, setInitialValues]
}
