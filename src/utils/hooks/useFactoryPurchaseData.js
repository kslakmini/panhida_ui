import { useState } from 'react'

export const useInitialValues = () => {
  const [initialValues, setInitialValues] = useState({
    orderNo: '',
    salesPerson: '',
    factoryId: '',
    createdDate: '',
    fpoNumber: '',
    perPallet: '',
    noOfPallet: '',
    totalQty: '',
    description: '',
    selectedProduct: '',
    productName: [],
    brandNames: [],
    brandId: '',
    artWork: '',
    // selectedQty: '',
    specs: [],
    unitPrice: '',
    totalPrice: '',
    balance: '',
    summery: [],
    additionalReq: ['PALLETS : Use clean pallets for packing. Go Green will supply the pallets.', 'STRAPPING : Use Go Green strapping for pallets.' , 'CORNERS : Need to use 3 ply printed white corners for each pallet. Go Green will supply the corners.' , 'OTHERS : Use transparent polythene on the top and bottom of the pallet, The pallets and packing need to be steady, Need to stretch wrap the pallets.'],
    requiredDate: '',
    cart: [],
    index: ''
  })

  return [initialValues, setInitialValues]
}
