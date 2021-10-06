import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import './styles/main.css';
import { Route, Switch } from 'react-router-dom';
import CreateNewBlogPost from './pages/CreateNewBlogPost';
import theme from './helpers/theme';
import GeneralContext from './context/GeneralContext';
import ListPosts from './pages/ListPosts';
import Farms from './pages/Farms';
import Cycle from './pages/Cycle';
import Report from './pages/Report';
import User from './pages/User';
import Type from './pages/Type';
import EditPost from './pages/EditPost';
import Overview from './pages/Overview';
import NotFoundPage from './pages/404Page';
import Categories from './pages/Categories';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {Alert} from 'react-bootstrap';
import {useState} from '@hookstate/core';
import store from './store/store';


function App() {
  
  const {alertNotification} = useState(store)
  const {alertType} = useState(store)
  const {alertMessage} = useState(store)

  
  return (
    <ChakraProvider theme={theme}>
      <GeneralContext>
        <Layout>
          <Alert show={alertNotification.get()} variant={alertType.get()}>
            <p className="alert-p"> {alertMessage.get()} </p>
          </Alert>
          <Switch>
            <Route exact path="/" component={Auth} />
            <ProtectedRoute path="/dashboard" component={Overview} />
            <ProtectedRoute path="/posts" component={ListPosts} />
            <ProtectedRoute path="/items" component={Farms} />
            <ProtectedRoute path="/item-type" component={Type} />
            <ProtectedRoute path="/cycle" component={Cycle} />
            <ProtectedRoute path="/reports" component={Report} />

            <ProtectedRoute path="/users" component={User} />
            <ProtectedRoute path="/categories" component={Categories} />
            <ProtectedRoute path="/add_blog_post" component={CreateNewBlogPost} />
            <ProtectedRoute path="/posts/edit/:uuid" component={EditPost} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Layout>
      </GeneralContext>
    </ChakraProvider>
  );
}

export default App;
