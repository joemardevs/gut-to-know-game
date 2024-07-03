import {
  Box,
  IconButton,
  Table,
  TableContainer,
  Text,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import MasterLayout from "../../Layouts/MasterLayout";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const Competitions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [topUsers, setTopUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const getTopUsers = async (page, limit) => {
    try {
      if (!user?.token) return;

      const response = await fetch(`/api/trophy?page=${page}&limit=${limit}`, {
        headers: {
          x_auth_token: user?.token,
        },
      });

      const { data, success } = await response.json();

      if (!success) {
        throw data;
      }

      setTopUsers(data.users);
      setPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.log("Error fetching top users: ", error.message);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    document.title = "Competitions";

    getTopUsers(page, limit);
  }, [user, page]);

  return (
    <MasterLayout
      wrapperStyle={{
        position: "relative",
        backgroundImage: "url('/assets/levels_bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <IconButton
        onClick={() => navigate(-1)}
        isRound
        colorScheme="orange"
        aria-label="Authors"
        icon={<IoIosArrowBack size="2rem" color="white" />}
        size="lg"
        position="absolute"
        left="1.5rem"
        top="1.5rem"
      />
      <Box>
        <Text
          color="#000"
          fontSize="1.5em"
          fontWeight="bold"
          mt="4rem"
          textAlign="center"
          mb="1rem">
          Competitions
        </Text>

        <TableContainer>
          <Table variant="simple">
            <TableCaption color="black">
              Here are the top users in the competition
            </TableCaption>
            <Thead bg="orange.500">
              <Tr>
                <Th color="white">Username</Th>
                <Th color="white">Trophy</Th>
              </Tr>
            </Thead>
            <Tbody>
              {topUsers?.length > 0 ? (
                topUsers?.map(topUser => (
                  <Tr
                    key={topUser._id}
                    bg={
                      topUser.user._id === user._id ? "green" : "transparent"
                    }>
                    <Td color="black">
                      {topUser.user.username}
                      {topUser.user._id === user._id && " (You)"}
                    </Td>
                    <Td color="black">{topUser.trophy}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="2" textAlign="center" color="black">
                    No users found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
          <ButtonGroup
            mt="4"
            spacing="4"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            size="sm">
            <Button
              onClick={handlePrevPage}
              disabled={page === 1}
              colorScheme="gray">
              Previous
            </Button>
            <Text color="black" fontSize=".85rem">
              Page {page} of {totalPages}
            </Text>
            <Button
              onClick={handleNextPage}
              disabled={page === totalPages}
              colorScheme="gray">
              Next
            </Button>
          </ButtonGroup>
        </TableContainer>
      </Box>
    </MasterLayout>
  );
};

export default Competitions;
