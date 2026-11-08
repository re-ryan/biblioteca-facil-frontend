import { useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useIsbnLookup } from '../hooks/useIsbnLookup'
import { normalizeIsbn } from '../services/isbnApi'

export const IsbnLookupCard = () => {
  const [isbnInput, setIsbnInput] = useState('')
  const [submittedIsbn, setSubmittedIsbn] = useState('')
  const [validationError, setValidationError] = useState('')
  const { data, error, isError, isFetching, refetch } = useIsbnLookup(submittedIsbn)

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalizedIsbn = normalizeIsbn(isbnInput)

    if (!/^97[89]\d{10}$/.test(normalizedIsbn)) {
      setValidationError('Informe um ISBN-13 válido com 13 números.')
      return
    }

    setValidationError('')

    if (normalizedIsbn === submittedIsbn) {
      refetch()
      return
    }

    setSubmittedIsbn(normalizedIsbn)
  }

  const handleChange = (event) => {
    setIsbnInput(event.target.value)
    setValidationError('')
  }

  return (
    <Card sx={{ mb: 5 }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography color="secondary.dark" variant="overline" sx={{ fontWeight: 800 }}>
              CONSULTA BIBLIOGRÁFICA
            </Typography>
            <Typography component="h2" variant="h4" sx={{ mt: 0.5 }}>
              Buscar dados de um livro pelo ISBN
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Informe o ISBN para localizar o título, a editora e outras informações do livro.
            </Typography>
          </Box>

          <Stack
            component="form"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ alignItems: { sm: 'flex-start' } }}
          >
            <TextField
              fullWidth
              label="ISBN-13"
              value={isbnInput}
              onChange={handleChange}
              error={Boolean(validationError)}
              helperText={validationError || 'Exemplo disponível: 9788535902778'}
              placeholder="9788535902778"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={isFetching ? <CircularProgress color="inherit" size={18} /> : <SearchRoundedIcon />}
              disabled={isFetching}
              sx={{ minWidth: 190, minHeight: 56 }}
            >
              {isFetching ? 'Consultando...' : 'Consultar ISBN'}
            </Button>
          </Stack>

          {isError && <Alert severity="error">{error.message}</Alert>}

          {data && !isFetching && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              sx={{ p: 3, borderRadius: 3, bgcolor: 'primary.light' }}
            >
              {data.urlImagemCapa && (
                <Box
                  component="img"
                  src={data.urlImagemCapa}
                  alt={`Capa de ${data.titulo}`}
                  sx={{ width: 112, height: 160, borderRadius: 2, objectFit: 'cover' }}
                />
              )}
              <Stack spacing={1.25} sx={{ flexGrow: 1 }}>
                <Chip label={`ISBN ${data.isbn}`} color="primary" sx={{ width: 'fit-content' }} />
                <Typography component="h3" variant="h5">
                  {data.titulo}
                </Typography>
                <Typography color="text.secondary">
                  {data.editora || 'Editora não informada'}
                  {data.anoPublicacao ? ` · ${data.anoPublicacao}` : ''}
                </Typography>
                {data.descricao && <Typography>{data.descricao}</Typography>}
              </Stack>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
