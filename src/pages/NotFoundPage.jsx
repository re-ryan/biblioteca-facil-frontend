import { Button, Container, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export const NotFoundPage = () => (
  <Container maxWidth="sm" sx={{ py: 12 }}>
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Typography color="secondary.main" sx={{ fontWeight: 800 }}>
        ERRO 404
      </Typography>
      <Typography component="h1" variant="h2">
        Página não encontrada
      </Typography>
      <Typography color="text.secondary">
        O endereço informado não existe ou foi alterado.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Voltar ao início
      </Button>
    </Stack>
  </Container>
)
