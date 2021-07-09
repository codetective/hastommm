import { Box, Center, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import PageTitle from '../components/Global/PageTitle';
import PostCard from '../components/ListPosts/PostCard';
import { RefreshPostsButton } from '../components/ListPosts/RefreshPostsButton';
import { useGenCtx } from '../context/GeneralContext';
import categories from '../helpers/categories';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackComponent from '../helpers/FallBackComponent';
import Pagination from 'react-js-pagination';
import ErrorAlert from '../components/Global/ErrorAlert';

function ListPosts(props) {
  const {
    FetchArticles,
    loadingArticles,
    errorArticles,
    articles,
    articlesData,
  } = useGenCtx();

  useEffect(() => {
    if (articles.length === 0) {
      FetchArticles();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Box pb="50px">
      <PageTitle category={categories.blog} title="All Posts" />
      <SimpleGrid spacing="30px" columns={[1, 1, 2, 3]}>
        {!loadingArticles &&
          !errorArticles &&
          articles &&
          articles.map((post, index) => {
            return (
              <ErrorBoundary key={index} FallbackComponent={FallBackComponent}>
                <PostCard post={post} key={index} />
              </ErrorBoundary>
            );
          })}
      </SimpleGrid>
      {loadingArticles && (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.25s"
            emptyColor="gray.200"
            color="green.500"
            size="200px"
            width="150px"
            h="150px"
          />
        </Center>
      )}
      {!loadingArticles && errorArticles && (
        <ErrorAlert
          message="A network error may have caused this error, please"
          title="Something went wrong"
          retryFunc={FetchArticles}
        />
      )}
      {!loadingArticles && !errorArticles && articles.length === 0 && (
        <ErrorAlert
          type="warning"
          message="No items have been found for the category you're searching"
          title="Empty?"
          retryFunc={FetchArticles}
        />
      )}
      <RefreshPostsButton refreshPosts={FetchArticles} />
      <Center py="10">
        {!loadingArticles &&
          !errorArticles &&
          articlesData &&
          articlesData.meta &&
          articles.length !== 0 && (
            <Pagination
              totalItemsCount={articlesData.meta.total}
              activePage={articlesData.meta.current_page}
              itemsCountPerPage={articlesData.meta.per_page}
              itemClass="pagination-item"
              linkClass="pagination-link"
              firstPageText="<<"
              lastPageText=">>"
              onChange={pageNumber => FetchArticles(pageNumber)}
            />
          )}
      </Center>
    </Box>
  );
}

export default ListPosts;
