import { useState} from "react"
import axios from "axios"

export const useItems = (setAlert) => {
  const [agents, setAgents] = useState([])

  // load agent
  const loadAgent = async () => {
    try {
      let agent = await axios.get("/agent/v2")
      agent = agent.data
      for (let index = 0; index < agent.length; index++) {
        agent[index].text = `${agent[index].name} (${agent[index].type})`
      }      

      setAgents(agent)
    } catch (error) {
      setAlert({
        showAlert: true,
        severity: "error",
        message: "Agent loading failed!",
      })
    }
  }

  return [agents, loadAgent]
}

export const usePorts = (setAlert) => {
  const [ports, setPorts] = useState([])

  // load agent
  const loadPorts = async () => {
    try {
      let ports = await axios.get("/invoice/util")
      setPorts(ports.data.ports)
    } catch (error) {
      setAlert({
        showAlert: true,
        severity: "error",
        message: "Agent loading failed!",
      })
    }
  }

  return [ports, loadPorts]
}

export const useInitialValues = () => {
  const [initialValues, setInitialValues] = useState({
    invoiceType: "Go Green Exports",
    salesPerson: "Lisa simpson",
    orderNo: "",
    buyerPONumber: "",
    subOrderNo: "",
    proformaInvoiceNo: "",
    createdDate: "",
    customerRefNo: "",
    validityPeriod: "",
    importPermit: "",
    agentId: "",  
    companyId: "",
    customerId: "",
    termsOfDelivery: "BY THIRD WEEK OF JULY 2021 FROM COLOMBO, SRI LANKA",
    termsOfPayment:
      "ADVANCE 50% WITH THE ORDER CONFIRMATION AND BALANCE 50% AGAINST THE COPY DOCUMENTS",
    incoterm: "CIF",
    countryOfOrigin: "SRI LANKA",
    transactionCurrency: "USD Dollar",
    portOfLoading: "COLOMBO, SRI LANKA",
    finalDestination: "",
    valuesInWords: "",
    measurementUnit: "KG",
    volume: "40FT",
    volumes: [],
    totalPallets: "",
    netWeight: "",
    tolerance: "WEIGHT OR VALUE +/- 5%",
    totalBags: "",
    grossWeight: "",
    specialRemarks: "",
    bankAccount: "rupees-gge",
    items: ["sss", "kk"],
    consigneeId: "",
    BankDetailsId: "",
    volumeQty: "",
    printIncoterms: "CIF",
    brandId: "",
    productId: "",
    typeId: "",    
    cart: [],
    description:"",
    unitWeight:"",
    noOfPallets:"",
    greenHouse:"",
    method: "",
    dosage: "",
    cbm: ""

  })

  return [initialValues, setInitialValues]
}

// load incoterm
export const incoterms = ["CIF", "CNF", "FOB", "CIP", "DDP"]

// load volume
export const volumes = ["40FT", "20FT", "40HC", "LCL"]

// load currencies
export const currencies = ["LKR", "USD Dollar", "EURO"]


