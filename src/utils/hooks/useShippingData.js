import { useState } from 'react'

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
  const [initialValues, setInitialValues] = useState({
    orderNo: '',
    shippingLineId: '',
    shippingLineFrightRate: '',
    forwarderId: '',
    forwarderFrightRate: '',
    handlingAgentId: '',
    handlingRate: '',
    transporterId: '',
    transporterRate: '',
    truckingCompanyId: '',
    truckingRate: '',
    railwayCompanyId: '',
    railwayRate: '',
    vessel: '',
    voyage: '',
    portOfDischarge: '',
    finalPort: '',
    inlandPort: '',
    finalLocation: '',  
    etdColomboDate: '',
    etaDischargePortDate: '',
    etdDischargePortDate: '',
    etaFinalPortDate: '',
    etaInlandPortDate: '',
    etaFinalLocationDate: '',
    cargoCutOffDateAndTime: datestring,
    blCutOffDateAndTime: datestring,
    vgmCutoffDateAndTime: datestring
  })

  return [initialValues, setInitialValues]
}


