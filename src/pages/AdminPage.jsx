import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded'
import { Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'

export const AdminPage = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
    <Stack spacing={1} sx={{ mb: 5 }}>
      <Typography
        component="h1"
        variant="h2"
        sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
      >
        Administração
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
        Gerencie as informações que formam o catálogo da plataforma.
      </Typography>
    </Stack>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent sx={{ p: 3.5 }}>
            <LibraryBooksRoundedIcon color="primary" sx={{ fontSize: 44, mb: 2 }} />
            <Typography component="h2" variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Livros
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Cadastre, consulte, edite e remova os livros disponíveis no catálogo.
            </Typography>
            <Button variant="contained" disabled>
              Gerenciar livros
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
)
