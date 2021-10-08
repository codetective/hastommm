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
            <ProtectedRoute path="/dashboard"> 
              <Overview /> 
            </ProtectedRoute>
            <ProtectedRoute path="/posts">
              <ListPosts />
            </ProtectedRoute>
            <ProtectedRoute path="/items">
              <Farms />
            </ProtectedRoute>
            <ProtectedRoute path="/item-type">
              <Type />
            </ProtectedRoute>
            <ProtectedRoute path="/cycle">
              <Cycle />
            </ProtectedRoute>
            <ProtectedRoute path="/reports">
              <Report/>
            </ProtectedRoute>

            <ProtectedRoute path="/users">
              <User />
            </ProtectedRoute>
            <ProtectedRoute path="/categories">
              <Categories />
            </ProtectedRoute>
            <ProtectedRoute path="/add_blog_post">
              <CreateNewBlogPost />
            </ProtectedRoute>
            <ProtectedRoute path="/posts/edit/:uuid">
              <EditPost />
            </ProtectedRoute>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Layout>
      </GeneralContext>
    </ChakraProvider>
  );
}

export default App;
