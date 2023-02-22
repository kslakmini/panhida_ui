import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function generatePDF({ data, supplier, factory }) {
  const tbody = [];
  tbody.push([
    { text: 'DESCRIPTION', style: 'tableHeader' },
    { text: 'ORDER QUANTITY', style: 'tableHeader' },
    { text: 'UNIT \n PRICE \n' + data.currencyType, style: 'tableHeader' },
    { text: 'TOTAL AMOUNT \n' + data.currencyType, style: 'tableHeader' },
  ]);
  data.cart.forEach((element) => {
    const row = [
      [{ text: element.packingName, marginBottom: 10, bold: true }],
      {
        text: element.orderQty,
        alignment: 'right',
      },
      {
        text: element.unitPrice.toFixed(2),
        alignment: 'right',
      },
      {
        text: element.totalAmount.toFixed(2),
        alignment: 'right',
      },
    ];
    row[0].push({
      text: [
        'ORDER SIZE: ',
        { text: element.orderSize, bold: false },
        '\n',
        { text: element.brandName, bold: true },
        '\n',
      ],
    });

    row[0].push({
      text: 'PLEASE NOTE: ',
      marginTop: 10,
      fontSize: 11,
      bold: true,
    });

    element.specifications.forEach((el) => {
      row[0].push({ text: el.text + ':' + el.value });
    });

    tbody.push(row);
  });

  const dd = {
    content: [
      {
        alignment: 'center',
        style: 'header',
        text: 'GO GREEN EXPORTS (PVT) LTD',
      },
      {
        text: 'PURCHASE ORDER\n',
        style: 'header',
        alignment: 'center',
        margin: [0, 10],
        decoration: 'underline',
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*', '*'],
          heights: 40,
          body: [
            [
              {
                text: ['TO ORDER OF: \n', { text: supplier, bold: false }],
                fontSize: 11,
                bold: true,
              },
              {
                text: ['ORDER NO: \n', { text: data.orderNo, bold: false }],
                fontSize: 11,
                bold: true,
              },
              {
                text: ['PO NUMBER: \n', { text: data.id, bold: false }],
                fontSize: 11,
                bold: true,
              },
              {
                text: ['DATE: \n', { text: data.orderedDate, bold: false }],
                fontSize: 11,
                bold: true,
              },
            ],
          ],
        },
      },

      {
        marginTop: 20,
        marginBottom: 20,
        style: 'tableExample',
        table: {
          widths: [248, '*', '*', '*'],

          body: tbody,
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*'],
          heights: 60,
          body: [
            [
              {
                text: [
                  'FACTORY: ',
                  { text: factory, bold: false },
                  '\n',
                  'DELIVERY AT: ',
                  { text: data.deliveryAddress, bold: false },
                  '\n',
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: [
                  'DELIVERY: ',
                  { text: 'ASAP', bold: false },
                  '\n',
                  'PAYMENT TERMS: ',
                  { text: data.paymentTerm, bold: false },
                ],
                fontSize: 11,
                bold: true,
              },
              {
                text: ['SALES PERSON NAME: ', { text: '', bold: false }, '\n'],
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
    defaultStyle: {
      columnGap: 20,
    },
    images: {
      // snow: link,
    },
  };
  return dd;
}

export default generatePDF;
