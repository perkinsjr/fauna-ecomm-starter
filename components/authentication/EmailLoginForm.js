import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'


export const EmailLoginForm = (props) => (
  <chakra.form width="full" {...props}>
    <FormControl>
      <Input
        type="email"
        mb={4}
        placeholder="Email address"
        _placeholder={{
          color: 'gray.600'
        }}
      />
      <Input
        type="password"
        placeholder="Password"
        _placeholder={{
          color: 'gray.600'
        }}
      />
    </FormControl>
    <Button mt="3" isFullWidth fontSize="sm" fontWeight="bold" colorScheme="gray" isDisabled>
      Continue
    </Button>
  </chakra.form>
)