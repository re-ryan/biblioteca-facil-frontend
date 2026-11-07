import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import { Alert, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'

export const BookForm = ({
  values,
  errors,
  feedback,
  saving,
  lookingUpIsbn,
  onChange,
  onSubmit,
  onCancel,
  onIsbnLookup,
}) => (
  <Box component="form" noValidate onSubmit={onSubmit}>
    <Stack spacing={3}>
      <Box>
        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
          Dados bibliográficos
        </Typography>
        <Typography color="text.secondary">
          Informe um ISBN para consultar os metadados ou preencha os campos manualmente.
        </Typography>
      </Box>

      {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            required
            label="Título"
            value={values.titulo}
            error={Boolean(errors.titulo)}
            helperText={errors.titulo}
            onChange={(event) => onChange('titulo', event.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 7, md: 5 }}>
          <TextField
            fullWidth
            label="ISBN-13"
            value={values.isbn13}
            error={Boolean(errors.isbn)}
            helperText={errors.isbn || 'Aceita números com ou sem hífens.'}
            onChange={(event) => onChange('isbn13', event.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 5, md: 3 }} sx={{ display: 'flex' }}>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            startIcon={<AutoFixHighRoundedIcon />}
            disabled={lookingUpIsbn || saving}
            onClick={onIsbnLookup}
          >
            {lookingUpIsbn ? 'Consultando...' : 'Consultar ISBN'}
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="ISBN-10"
            value={values.isbn10}
            error={Boolean(errors.isbn)}
            onChange={(event) => onChange('isbn10', event.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Editora"
            value={values.editora}
            onChange={(event) => onChange('editora', event.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Ano de publicação"
            type="number"
            value={values.anoPublicacao}
            error={Boolean(errors.anoPublicacao)}
            helperText={errors.anoPublicacao}
            onChange={(event) => onChange('anoPublicacao', event.target.value)}
            slotProps={{ htmlInput: { min: 1 } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Edição"
            value={values.edicao}
            onChange={(event) => onChange('edicao', event.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="URL da imagem de capa"
            type="url"
            value={values.urlImagemCapa}
            onChange={(event) => onChange('urlImagemCapa', event.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Descrição"
            value={values.descricao}
            onChange={(event) => onChange('descricao', event.target.value)}
          />
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        spacing={1.5}
        sx={{ justifyContent: 'flex-end' }}
      >
        <Button type="button" size="large" color="inherit" onClick={onCancel} disabled={saving}>
          Cancelar
        </Button>
        <Button
          type="submit"
          size="large"
          variant="contained"
          startIcon={<SaveRoundedIcon />}
          disabled={saving || lookingUpIsbn}
        >
          {saving ? 'Salvando...' : 'Salvar livro'}
        </Button>
      </Stack>
    </Stack>
  </Box>
)

BookForm.propTypes = {
  values: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    isbn10: PropTypes.string.isRequired,
    isbn13: PropTypes.string.isRequired,
    editora: PropTypes.string.isRequired,
    anoPublicacao: PropTypes.string.isRequired,
    edicao: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    urlImagemCapa: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  feedback: PropTypes.shape({
    severity: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
    message: PropTypes.string.isRequired,
  }),
  saving: PropTypes.bool.isRequired,
  lookingUpIsbn: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onIsbnLookup: PropTypes.func.isRequired,
}
