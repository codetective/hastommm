import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import './styles/main.css';
import { Route, Switch } from 'react-router-dom';
import CreateNewBlogPost from './pages/CreateNewBlogPost';
import theme from './helpers/theme';
import GeneralContext from './context/GeneralContext';
import ListPosts from './pages/ListPosts';
import EditPost from './pages/EditPost';
import Overview from './pages/Overview';
import NotFoundPage from './pages/404Page';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GeneralContext>
        <Layout>
          <Switch>
            <Route exact path="/" component={Overview} />
            <Route exact path="/posts" component={ListPosts} />
            <Route exact path="/add_blog_post" component={CreateNewBlogPost} />
            <Route path="/posts/edit/:uuid" component={EditPost} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Layout>
      </GeneralContext>
    </ChakraProvider>
  );
}

export default App;
