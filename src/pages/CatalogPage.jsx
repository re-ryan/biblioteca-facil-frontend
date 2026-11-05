import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Box, Container, Stack, Typography } from '@mui/material'

export const CatalogPage = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
    <Stack spacing={1} sx={{ mb: 5 }}>
      <Typography
        component="h1"
        variant="h2"
        sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
      >
        Catálogo
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
        Encontre livros pelo título e consulte seus dados bibliográficos.
      </Typography>
    </Stack>

    <Box
      sx={{
        minHeight: 300,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        border: '1px dashed',
        borderColor: 'primary.light',
        borderRadius: 4,
        bgcolor: 'background.paper',
        px: 3,
      }}
    >
      <Stack spacing={2} sx={{ alignItems: 'center', maxWidth: 440 }}>
        <SearchRoundedIcon color="primary" sx={{ fontSize: 56 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Consulte o acervo
        </Typography>
        <Typography color="text.secondary">
          Os livros cadastrados serão apresentados aqui com pesquisa e acesso aos detalhes.
        </Typography>
      </Stack>
    </Box>
  </Container>
)
