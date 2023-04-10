import React from 'react';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EmailField
} from 'react-admin';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MyUrlField } from './MyUrlField';

export const UserList = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick='edit'>
          <TextField source='id' />
          <TextField source='name' />
          <TextField source='username' />
          <EmailField source='email' />
          <TextField source='address.street' />
          <TextField source='phone' />
          {/*<UrlField source='website' />*/}
          <MyUrlField source='website' />
          <TextField source='company.name' />
        </Datagrid>
      )}
    </List>
  );
};