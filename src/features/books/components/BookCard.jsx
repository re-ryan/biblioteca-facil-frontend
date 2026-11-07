import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

export const BookCard = ({ book }) => {
  const { titulo, isbn10, isbn13, editora, anoPublicacao, edicao, urlImagemCapa } = book
  const isbn = isbn13 || isbn10

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {urlImagemCapa ? (
        <Box
          component="img"
          src={urlImagemCapa}
          alt={`Capa do livro ${titulo}`}
          sx={{ width: '100%', height: 210, objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            bgcolor: 'primary.light',
          }}
        >
          <MenuBookRoundedIcon sx={{ fontSize: 72 }} />
        </Box>
      )}

      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {anoPublicacao && <Chip label={anoPublicacao} size="small" />}
            {edicao && <Chip label={`${edicao}ª edição`} size="small" variant="outlined" />}
          </Stack>

          <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
            {titulo}
          </Typography>

          <Stack spacing={1.25} color="text.secondary">
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
              <BusinessRoundedIcon fontSize="small" />
              <Typography variant="body2">{editora || 'Editora não informada'}</Typography>
            </Stack>
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
              <QrCode2RoundedIcon fontSize="small" />
              <Typography variant="body2">{isbn ? `ISBN ${isbn}` : 'ISBN não informado'}</Typography>
            </Stack>
            {anoPublicacao && (
              <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                <CalendarMonthRoundedIcon fontSize="small" />
                <Typography variant="body2">Publicado em {anoPublicacao}</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

BookCard.propTypes = {
  book: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    isbn10: PropTypes.string,
    isbn13: PropTypes.string,
    editora: PropTypes.string,
    anoPublicacao: PropTypes.number,
    edicao: PropTypes.string,
    urlImagemCapa: PropTypes.string,
  }).isRequired,
}
