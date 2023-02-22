import React, { Fragment } from 'react';
import { TableCell, Button } from '@material-ui/core';
import ReusableTable from '../../components/layouts/ReusableTable';
import SimpleDialog from '../../components/layouts/SimpleDialog';

const headers = [
  {
    text: 'Name',
    value: 'fullName',
  },
  {
    text: 'Email',
    value: 'email',
  },
  {
    text: 'Role',
    value: 'role',
  },
  {
    text: 'Change Status',
    value: 'status',
  },
  {
    text: 'Update',
    value: 'update',
  },
  {
    text: 'Reset Password',
    value: 'resetPassword',
  },
];
export default function UsersList(props) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClose = (value) => {
    setOpen(false);
  };

  const TableB = ({ item, changeStatus, classes, onUpdate, resetPassword }) => {
    return (
      <Fragment>
        <TableCell key='fullName'>{item.fullName}</TableCell>
        <TableCell key='role'>{item.email}</TableCell>
        <TableCell key='role'>{item.role}</TableCell>
        <TableCell key='status'>
          {item.status === 'active' ? (
            <Button
              variant='contained'
              className={classes.red}
              onClick={() => changeStatus(item.id, 'inactive')}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              variant='contained'
              className={classes.green}
              onClick={() => changeStatus(item.id, 'active')}
            >
              Activate
            </Button>
          )}
        </TableCell>
        <TableCell key='update'>
          <Button
            variant='contained'
            className={classes.yellow}
            onClick={() => onUpdate(item.id)}
          >
            update
          </Button>
        </TableCell>
        <TableCell key='resetpassword'>
          <Button
            variant='contained'
            className={classes.yellow}
            onClick={() => resetPassword(item.email)}
          >
            Reset Password
          </Button>
        </TableCell>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Fragment>
    );
  };
  return (
    <ReusableTable
      title='View Users'
      headers={headers}
      items={[]}
      TableB={TableB}
      fetchDataUrl='/user/'
      statusChangeUrl='/user/update-status/'
      updatePath='/update-user/'
      resetPasswordPath='/auth/forgot-password'
      {...props}
    />
  );
}
