import { Admin, EditGuesser, Resource } from 'react-admin';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './users';
import { PostCreate, PostEdit, PostList } from './posts';
import { Dashboard } from './Dashboard';
// import { dataProvider } from './dataProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={Dashboard}
  >
    <Resource
      name='posts'
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource
      name='users'
      list={UserList}
      recordRepresentation='name'
      icon={UserIcon}
    />
  </Admin>
);
