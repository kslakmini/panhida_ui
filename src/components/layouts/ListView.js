import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  CardHeader,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  green: {
    backgroundColor: 'green',
    color: 'white',
  },
  red: {
    backgroundColor: 'red',
    color: 'white',
  },
  yellow: {
    backgroundColor: 'orange',
    color: 'white',
  },
  textCenter: {
    textAlign: 'center',
  },
}));

export default function ListView({
  title = 'View users',
  hasSearch = true,
  headers = [],
  statusChangeUrl = '',
  fetchDataUrl = '',
  updatePath = '',
  view = '',
  resetPath = '',
  ...props
}) {
  const classes = useStyles();
  let navigate = useNavigate();

  //use effect
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //alerting
  const [alert, setAlert] = useState({
    showAlert: false,
    severity: 'success',
    message: '',
  });

  // load data to the table
  const loadData = async () => {
    try {
      const data = await axios.get(fetchDataUrl);

      setData(data.data);
      setFilteredItems(data.data);
    } catch (error) {
      setAlert({
        showAlert: true,
        severity: 'error',
        message: 'Data loading failed!',
      });
    }
  };

  // activate and deactivate status
  const changeStatus = async (id, status) => {
    try {
      await axios.put(statusChangeUrl, {
        id,
        status: !status,
      });
      loadData();
    } catch (error) {
      setAlert({
        showAlert: true,
        severity: 'error',
        message: 'Status changing failed!',
      });
    }
  };

  //update
  const onUpdate = (id) => {
    navigate(updatePath, { update: true, id });
  };

  //update
  const onView = (id) => {
    navigate(view, { id });
  };

  //reset password
  const onResetPassword = (id) => {
    navigate(resetPath, { update: true, id });
  };

  //search
  const onSearch = (e) => {
    const text = String(e.target.value).toLowerCase();
    setSearchText(text);
    if (text) {
      const result = items.filter((item) => {
        // eslint-disable-line
        // Object.values(item).some((i) =>
        //   String(i).toLocaleLowerCase().includes(searchText)
        // )

        const str = JSON.stringify(item).toLowerCase();

        if (str.search(text) >= 0) return item;
      });
      setFilteredItems(result);
    } else {
      setFilteredItems(items);
    }
  };

  const generatePDf = () => {
    var docDefinition = {
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  };

  const [items, setData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  // pagination related
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container spacing={1}>
      <Grid item className={classes.root}>
        <Card>
          <CardHeader title={title} />

          <CardContent>
            {hasSearch ? (
              <TextField
                label='Search'
                fullWidth
                variant='outlined'
                className={classes.marginBottom}
                onChange={onSearch}
                value={searchText}
              />
            ) : null}

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    {headers.map((header, i) => (
                      <TableCell key={i}>{header.text.toUpperCase()}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredItems.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredItems
                  ).map((row, index) => (
                    <TableRow key={index}>
                      {headers.map(({ value, idx }) => {
                        switch (value) {
                          case 'status':
                            return (
                              <TableCell key={idx}>
                                {row.status ? (
                                  <Button
                                    variant='contained'
                                    className={classes.red}
                                    onClick={() =>
                                      changeStatus(row.id, row.status)
                                    }
                                  >
                                    Deactivate
                                  </Button>
                                ) : (
                                  <Button
                                    variant='contained'
                                    className={classes.green}
                                    onClick={() =>
                                      changeStatus(row.id, row.status)
                                    }
                                  >
                                    Activate
                                  </Button>
                                )}
                              </TableCell>
                            );

                          //

                          case 'update':
                            return (
                              <TableCell key={idx}>
                                <Button
                                  variant='contained'
                                  className={classes.yellow}
                                  onClick={() => onUpdate(row.id)}
                                >
                                  update
                                </Button>
                              </TableCell>
                            );

                          case 'view':
                            return (
                              <TableCell key={idx}>
                                <Button
                                  variant='contained'
                                  className={classes.yellow}
                                  onClick={() => onView(row.id)}
                                >
                                  view
                                </Button>
                              </TableCell>
                            );

                          case 'pdf':
                            return (
                              <TableCell key={idx}>
                                <Button
                                  variant='contained'
                                  onClick={() => generatePDf()}
                                >
                                  pdf
                                </Button>
                              </TableCell>
                            );

                          case 'artWork':
                            return (
                              <TableCell key={idx}>
                                {row.artWork && (
                                  <a
                                    href={row.artWork}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    View
                                  </a>
                                )}
                              </TableCell>
                            );

                          case 'resetPassword':
                            return (
                              <TableCell key={idx}>
                                <Button
                                  variant='contained'
                                  className={classes.yellow}
                                  onClick={() => onResetPassword(row.id)}
                                >
                                  Reset Password
                                </Button>
                              </TableCell>
                            );

                          default:
                            if (value.split('.').length === 1) {
                              return (
                                <TableCell component='th' scope='row' key={idx}>
                                  {row[value]}
                                </TableCell>
                              );
                            } else {
                              let obj = value.split('.')[0];
                              let nestObj = value.split('.')[1];

                              return (
                                <TableCell component='th' scope='row' key={idx}>
                                  {row[obj] && row[obj][nestObj]}
                                </TableCell>
                              );
                            }
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={filteredItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Grid>
      {alert.showAlert && (
        <Grid item md={12}>
          <Alert
            severity={alert.severity}
            onClose={() =>
              setAlert({
                ...alert,
                showAlert: false,
              })
            }
          >
            {alert.message}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
}
