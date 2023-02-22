import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const getBase64ImageFromURL = (url) => {
//   return new Promise((resolve, reject) => {
//     var img = new Image()
//     img.setAttribute("crossOrigin", "anonymous")

//     img.onload = () => {
//       var canvas = document.createElement("canvas")
//       canvas.width = img.width
//       canvas.height = img.height

//       var ctx = canvas.getContext("2d")
//       ctx.drawImage(img, 0, 0)

//       var dataURL = canvas.toDataURL("image/png")

//       resolve(dataURL)
//     }

//     img.onerror = (error) => {
//       reject(error)
//     }

//     img.src = url
//   })
// }

// const url = "https://i.ibb.co/HgD9HBz/header.png"

function generatePDF({ data, factory, salesPerson }) {
  const additionalReq = data.additionalReq.join('\r\n\n');

  const tbody = [];
  tbody.push([
    { text: 'PRODUCT', style: 'tableHeader' },
    { text: 'NO OF PALLETS', style: 'tableHeader' },
    { text: 'UNIT PER PALLETS', style: 'tableHeader' },
    { text: 'TOTAL QTY', style: 'tableHeader' },
    { text: 'TOTAL PRICE (Rs.)', style: 'tableHeader' },
  ]);
  data.cart.forEach((element) => {
    const row = [
      [{ text: element.selectedProduct, marginBottom: 10, bold: true }],
      {
        text: element.noOfPallet,
        alignment: 'right',
      },
      {
        text: element.perPallet,
        alignment: 'right',
      },
      {
        text: element.totalQty,
        alignment: 'right',
      },
      {
        text: element.totalPrice.toFixed(2),
        alignment: 'right',
      },
    ];

    element.specifications.forEach((el) => {
      row[0].push({ text: el.text + ':' + el.value });
    });
    row[0].push({ text: element.description, marginTop: 10 });

    tbody.push(row);
  });

  const dd = {
    content: [
      // {
      //   marginTop: 0,
      //   width: 520,
      //   height: 75,

      // },
      {
        text: 'FACTORY PURCHASE ORDER\n',
        style: 'header',
        alignment: 'center',
        margin: [0, 20],
      },

      {
        columns: [
          {
            width: 60,
            fontSize: 11,
            bold: true,
            text: 'TO:',
          },
          {
            width: '*',
            text: factory.name,
          },
        ],
        margin: [0, 3],
      },
      // {
      //   columns: [
      //     {
      //       width: 60,
      //       fontSize: 11,
      //       bold: true,
      //       text: "FROM:",
      //     },
      //     {
      //       // width: "*",
      //       text: "This is a star-sized column.",
      //     },
      //   ],
      //   margin: [0, 3],
      // },
      {
        columns: [
          {
            width: 60,
            fontSize: 11,
            bold: true,
            text: 'DATE:',
          },
          {
            width: '*',
            text: data.createdDate,
          },
        ],
        margin: [0, 3],
      },
      {
        columns: [
          {
            width: 60,
            fontSize: 11,
            bold: true,
            text: 'ORDER NO:',
          },
          {
            width: '*',
            text: data.orderNo,
          },
        ],
        margin: [0, 3],
      },
      {
        columns: [
          {
            width: 60,
            fontSize: 11,
            bold: true,
            text: 'FPO NO:',
          },
          {
            width: '*',
            text: data.fpoNumber,
          },
        ],
        margin: [0, 3],
      },

      {
        marginTop: 20,
        marginBottom: 20,
        style: 'tableExample',
        table: {
          widths: [248, '*', '*', '*', '*'],

          body: tbody,
        },
      },
      {
        text: 'ADDITIONAL REQUIREMENTS',
        style: 'header',
        decoration: 'underline',
        marginBottom: 20,
      },
      {
        fontSize: 11,
        bold: true,
        text: additionalReq,
        marginBottom: 20,
      },

      {
        fontSize: 11,
        bold: true,
        text: 'REQUIRED DATE',
        decoration: 'underline',
      },
      {
        fontSize: 11,
        bold: true,
        text: data.requiredDate,
        marginBottom: 20,
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'PREPARED BY,',
            fontSize: 11,
            bold: true,
          },
          {
            text: 'ACCEPTED BY,',
            fontSize: 11,
            bold: true,
          },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: salesPerson.fullName,
            fontSize: 11,
            marginBottom: 15,
          },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'DATE,',
            fontSize: 11,
            bold: true,
          },
          {
            text: '..............................',
            fontSize: 11,
            bold: true,
          },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: data.createdAt.substring(0, 10),
            fontSize: 11,
          },
          {
            text: '(Factory)',
            fontSize: 11,
            bold: true,
          },
        ],
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
