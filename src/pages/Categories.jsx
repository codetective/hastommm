import {
  Box,
  Center,
  Stack,
  SimpleGrid,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Text,
  useToast,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import CategoryCard from '../components/Categories/CategoryCard';
import CreateCategory from '../components/Categories/CreateCategory';
import PageTitle from '../components/Global/PageTitle';
import { useGenCtx } from '../context/GeneralContext';
import category from '../helpers/categories';
import ErrorAlert from '../components/Global/ErrorAlert';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import baseURL from '../helpers/config';
import axios from 'axios';
import { useEffect } from 'react';

export default function Categories() {
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [cat, setCat] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const {
    fetchError,
    categoriesData,
    categories,
    FetchCategories,
    loadingCategories,
  } = useGenCtx();

  const setCategory = catObj => {
    setCat(prev => catObj);
    setIsOpen(true);
  };
  const deleteCategory = async () => {
    setDeleting(true);
    try {
      //eslint-disable-next-line
      let dt = await axios.delete(baseURL + '/article-category/' + cat.uuid);
      setDeleting(false);
      onClose();
      FetchCategories();
    } catch (error) {
      setDeleting(false);
      onClose();
      toast({
        title: 'Action Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    FetchCategories(
      categoriesData && categoriesData.meta
        ? categoriesData.meta.current_page
        : 1
    );
    //eslint-disable-next-line
  }, []);

  return (
    <Box pb="50px">
      <PageTitle category={category.blog} title="Categories" setCat={setCat} />
      <Stack
        bg="white"
        py="3"
        px="5"
        rounded="lg"
        shadow="sm"
        flexDir={['column', 'row', 'row', 'row']}
        justifyContent="space-between"
        alignItems={['initial', 'center']}
        mb="5"
      >
        <Flex>
          <Text>Click text to edit.</Text>
        </Flex>
        <Box>
          <CreateCategory width={['100%', '100%', 'inital', 'initial']} />
        </Box>
      </Stack>

      <SimpleGrid columns={[1, 2, 2, 3]} spacing="20px">
        {categories &&
          !loadingCategories &&
          !fetchError &&
          categories.map((c, i) => {
            return (
              <CategoryCard category={c} key={i} setCategory={setCategory} />
            );
          })}
      </SimpleGrid>
      {loadingCategories && (
        <Center>
          <Spinner
            thickness="2px"
            speed="0.25s"
            emptyColor="secondary.100"
            color="green.500"
            size="lg"
            width="60px"
            h="60px"
          />
        </Center>
      )}
      {!loadingCategories && fetchError && (
        <ErrorAlert
          errorObject={fetchError}
          message="A network error may have occurred while fetching data"
          title="Oops! Something went wrong"
          retryFunc={FetchCategories}
        />
      )}
      <Center flexDir="column" py="10">
        {categoriesData && categoriesData.meta && (
          <Text py="3">
            You have{' '}
            <Text as="span" fontWeight="bold">
              {categoriesData.meta.total}
            </Text>{' '}
            categories.
          </Text>
        )}

        {!loadingCategories &&
          !fetchError &&
          categoriesData &&
          categoriesData.meta &&
          categories.length !== 0 && (
            <Pagination
              totalItemsCount={categoriesData.meta.total}
              activePage={categoriesData.meta.current_page}
              itemsCountPerPage={categoriesData.meta.per_page}
              itemClass="pagination-item"
              linkClass="pagination-link"
              firstPageText="<<"
              lastPageText=">>"
              onChange={pageNumber => FetchCategories(pageNumber)}
            />
          )}
      </Center>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="qfont">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category :{' '}
              <Box as="span" color="secondary.100">
                {cat.category}
              </Box>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                isLoading={deleting}
                onClick={deleteCategory}
                ml={3}
              >
                I'm Sure.
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
