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
    airLineId: '',
    airLineFrightRate: '',
    flightNo: '',
    transitAirPort: '',
    airPortDestination: '',
    finalLocation: '',
    forwarderId: '',
    forwarderFrightRate: '',    
    handlingAgentId: '',
    handlingRate: '',    
    transporterId: '',
    transporterRate: '',    
    truckingCompanyId: '',
    truckingRate: '',  
    etdKatunayakeDate: '',
    etaDestinationPortDate: '',   
    etaFinalLocationDate: '',
    cargoCutOffDateAndTime: datestring,
  })

  return [initialValues, setInitialValues]
}


