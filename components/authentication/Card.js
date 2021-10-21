import { Box } from '@chakra-ui/react'

export const Card = (props) => (
  <Box
    bg='white'
    shadow="dark-lg"
    rounded={{
      md: '2xl',
    }}
    p="8"
    {...props}
  />
)