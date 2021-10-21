import { Box, Heading, Stack, Text, Button, FormControl, Select, Input } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'
import { Card } from '../components/authentication/Card'
import { useRouter } from "next/router";
import Link from 'next/link'

import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { email: email, password: password, role: role } }),
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  }
  return (
    <Box
      as="section"
      py="20"
    >
      <Card maxW="2xl" mx="auto" textAlign="center">
        <Stack maxW="xs" mx="auto" spacing="8">
          <Stack spacing="3">
            <Heading as="h1" letterSpacing="tight">
              Register
            </Heading>
          </Stack>
          <chakra.form width="full" onSubmit={onSubmit}>
            <FormControl>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                mb={4}
                placeholder="Email address"
                _placeholder={{
                  color: 'gray.600'
                }}
              />
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                _placeholder={{
                  color: 'gray.600'
                }}
              />
              <Select my={4} onChange={handleRoleChange}>
                <option default disabled>Pick a roll</option>
                <option value="MANAGER">Manager</option>
                <option value="EMPLOYEE">Employee</option>
              </Select>
            </FormControl>
            <Button mt="3" type="submit" loading={loading} isFullWidth fontSize="sm" fontWeight="bold" colorScheme="gray" disabled={email === "" || password === ""}>
              Continue
            </Button>
          </chakra.form>

          <Box fontSize="sm">
            <Text fontWeight="medium" color='gray.600'>
              have an account?
            </Text>
            <Link fontWeight="semibold" color="purple.600" href="/login">
              Login now!
            </Link>
          </Box>
        </Stack>
        <Text
          mt="16"
          fontSize="xs"
          mx="auto"
          maxW="md"
          color='gray.600'
        >
          By continuing, you acknowledge that you have read, understood, and agree to our terms and
          condition
        </Text>
      </Card>
    </Box>
  )
}
