import { Box, Heading, Button, Stack, Select, Input } from '@chakra-ui/react'
import { Card } from '../components/authentication/Card'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { client } from "../lib/apollo-client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from 'react';
import { getAuthCookie } from '../lib/auth-cookie';
export default function Admin({ allProducts }) {
  const router = useRouter();
  const { data } = allProducts;
  const [product, setProduct] = useState({
    name: "",
    url: "",
    image: "",
    description: "",
    price: "",
    id: ""
  });
  const addProduct = async(e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    };
    
  }
const deleteProduct = async (e) => {
  e.preventDefault();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { id: e.target[0].value } }),
  };
  await fetch("/api/deleteProduct", requestOptions)
    .then(() => router.reload())
    .catch((e) => console.log(e));
}

function handleChange(evt) {
  const value = evt.target.value;
  setProduct({
    ...product,
    [evt.target.name]: value
  });
}
return (
  <Box
    as="section"
    py="20"
  >
    <Card maxW="2xl" mx="auto" textAlign="center">
      <Stack maxW="xl" mx="auto" spacing="8">
        <Stack spacing="3">
          <Heading as="h1" letterSpacing="tight">
            Update Store
          </Heading>

        </Stack>
        <Tabs>
          <TabList>
            <Tab>Add Product</Tab>
            <Tab>Delete Product</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form onSubmit={addProduct}>
                <Input my={2} type="text" onChange={handleChange} name="name" placeholder="Product Name" required></Input>
                <Input my={2} type="text" onChange={handleChange}  name="description" placeholder="Product Desc" required></Input>
                <Input my={2} type="text" onChange={handleChange}  name="image" placeholder="Product Image URL" required></Input>
                <Input my={2} type="text" onChange={handleChange}  name="price" placeholder="Price" required></Input>
                <Input my={2} type="text" onChange={handleChange}  name="url" placeholder="Product Slug" required></Input>
                <Input my={2} type="text" onChange={handleChange}  name="id" placeholder="Product ID" required></Input>
                <Button colorScheme="purple" type="submit">Add Product</Button>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={deleteProduct}>
                <Select>
                  {data.map(product => {
                    return (
                      <option key={product.id} value={product.id}>{product.id}</option>
                    )
                  })}
                </Select>
                <Button my={2} colorScheme="purple" type="submit">Delete Product</Button>
              </form>

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Card>
  </Box>
)
}

export async function getServerSideProps(context) {
  const token = getAuthCookie(context.req);
  if (!token) {
    context.res.writeHead(303, { Location: "/login" });
    context.res.end();
  }
  const { data } = await client.query({
    query: gql`
    query getAllProducts {
      allProducts{
       data {
         name
         description
         url
         image
         price
         id
       }
     }
   }`})
  const { allProducts } = data;
  return {
    props: { allProducts },
  }
}
