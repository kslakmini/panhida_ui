import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs

function generatePDF(data, bank, salesPerson) { 

  

  const tBody = []
  tBody.push([
    { text: 'ITEM DESCRIPTION', style: 'tableHeader' },
    { text: 'QUANTITY ' , style: 'tableHeader' },
    { text: 'UNIT PRICE \n' + data.transactionCurrency , style: 'tableHeader' },
    { text: 'AMOUNT \n' + data.transactionCurrency, style: 'tableHeader' },
  ])
  let totalUnits = 0

  data.cart.forEach((element) => {

    totalUnits += element.qty

    tBody.push([
      [element.productName, element.size, element.description],
      {
        text: element.qty,
        alignment: 'right',
      },
      {
        text: element.unitPrice.toFixed(2),
        alignment: 'right',

      },
      {
        text: element.amount.toFixed(2),
        alignment: 'right',

      },
    ])
  })

  const tBody2 = []
  tBody2.push([{ text: 'VOLUME:', fontSize: 11, bold: true }])
  data.volumes.forEach((element) => {
    tBody2.push([
      {
        text: [element.qty, 'x', element.volume, ','],
      },
    ])
  })

  const dd = {
    content: [
      // {
      //   marginTop: 0,
      //   image: "header",
      //   width: 150,
      //   height: 150,
      // },
      {
        alignment: 'center',
        style: 'header',
        text:
          data.invoiceType === 'Go Green Exports'
            ? 'GO GREEN EXPORTS (PVT) LTD'
            : 'AGROCELL INTERNATIONAL (PVT) LTD',
      },
      {                
        alignment: 'center',
        fontSize: 11,
        text: [
          'ORDER NO: ',
          { text: data.orderNo, bold: false },
          '  ',
          'SUB ORDER NO: ',
          { text: data.subOrderNo, bold: false },
          
        ],
        bold: true,
      },     
      {
        text: `PROFORMA INVOICE`,
        style: 'header',
        alignment: 'center',
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          heights: 80,
          body: [
            [
              {
                text: [
                  'CONSIGNEE: \n',
                  { text: data.consigneeName, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'ADDRESS: \n',
                  { text: data.consigneeAddress, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*', '*'],
          heights: 40,
          body: [
            [
              {
                text: [
                  'PROFORMA INVOICE NO: \n',
                  { text: data.proformaInvoiceNo, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'BUYER PO NO: \n',
                  { text: data.buyerPONumber, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: ['DATE: \n', { text: data.createdDate, bold: false }],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'VALIDITY: \n',
                  { text: data.validityPeriod, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
          ],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          heights: 20,
          body: [
            [
              {
                text: [
                  'TERMS OF DELIVERY: ',
                  { text: data.termsOfDelivery, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
            [
              {
                text: [
                  'TERMS OF PAYMENT: ',
                  { text: data.termsOfPayment, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
            [
              {
                text: [
                  'INCOTERMS: ',
                  { text: data.printIncoterms, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          heights: 20,
          body: [
            [
              {
                text: [
                  'COUNTRY OF ORIGIN: ',
                  { text: data.countryOfOrigin, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'TRANSACTION CURRENCY: ',
                  { text: data.transactionCurrency, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
            [
              {
                text: [
                  'PORT OF LOADING: ',
                  { text: data.portOfLoading, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'PORT OF DISCHARGING: ',
                  { text: data.finalDestination, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: [248, '*', '*', '*'],

          body: tBody,
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: [334, '*', '*'],

          body: [
            [
              {
                text: [
                  'VALUE IN WORDS: ',
                  { text: data.valuesInWords, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },

              {
                text: 'TOTAL AMOUNT',
                fontSize: 11,
                bold: true,
                alignment: 'center',
              },
              {
                text: data.totalAmount.toFixed(2),
                alignment: 'right',
              },
            ],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*'],
          heights: 20,
          body: [
            [
              tBody2,
              {
                text: [
                  'TOTAL PALLETS: ',
                  { text: data.totalPallets, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'TOTAL NET WEIGHT: ',
                  { text: data.netWeight + ' ' + data.measurementUnit, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
            [
              {
                text: ['TOTAL UNITS: ', { text: totalUnits, bold: false }],
                fontSize: 11,
                bold: true,
              },
              {
                text: ['TOLERANCE: ', { text: data.tolerance, bold: false }],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'TOTAL GROSS WEIGHT: ',
                  { text: data.grossWeight + ' ' + data.measurementUnit, bold: false },                 
                ],
                fontSize: 11,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          heights: 50,
          body: [
            [
              {
                text: [
                  'SPECIAL REMARKS: ',
                  { text: data.specialRemarks, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          heights: 60,
          body: [
            [
              {
                text: [
                  'BANK NAME: ',
                  { text: bank.bankName, bold: false },
                  '\n',
                  'BANK ADDRESS: ',
                  { text: bank.address, bold: false },
                  '\n',
                  'ACCOUNT NO: ',
                  { text: bank.accountNumber, bold: false },
                  '\n',
                  'SWIFT CODE: ',
                  { text: bank.swiftCode, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'SALES PERSON NAME: ',
                  { text: salesPerson.fullName, bold: false },
                  '\n',
                  'DATE: ',
                  { text: data.createdAt.substring(0, 10), bold: false },                 
                ],
                fontSize: 11,
                bold: true,
              },
            ],
          ],
        },
      },
    ],

    styles: {
      header: {
        fontSize: 14,
        bold: true,
        alignment: 'justify',
      },
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: 'black',
        alignment: 'center',
      },
    },
    images: {
      header: 'https://picsum.photos/seed/picsum/200/300',
    },
  }
  return dd
}

export default generatePDF
