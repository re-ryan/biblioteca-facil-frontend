import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const createFieldProps = (field, controlled, values, onChange, onFieldChange) => ({
  name: field,
  ...(controlled
    ? {
        value: values[field],
        onChange: (event) => onChange(field, event.target.value),
      }
    : {
        defaultValue: values[field],
        onChange: () => onFieldChange(field),
      }),
})

export const BookForm = ({
  values,
  errors,
  submitLabel,
  controlled,
  onChange,
  onFieldChange,
  onSubmit,
  onCancel,
  loading,
}) => (
  <Box component="form" noValidate onSubmit={onSubmit}>
    <Stack spacing={3}>
      <Box>
        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
          Dados bibliográficos
        </Typography>
        <Typography color="text.secondary">
          Preencha os campos para incluir ou atualizar o livro na biblioteca.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            required
            label="Título"
            error={Boolean(errors.titulo)}
            helperText={errors.titulo}
            {...createFieldProps('titulo', controlled, values, onChange, onFieldChange)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="ISBN-13"
            error={Boolean(errors.isbn)}
            helperText={errors.isbn || 'Aceita números com ou sem hífens.'}
            {...createFieldProps('isbn13', controlled, values, onChange, onFieldChange)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="ISBN-10"
            error={Boolean(errors.isbn)}
            {...createFieldProps('isbn10', controlled, values, onChange, onFieldChange)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Editora"
            {...createFieldProps('editora', controlled, values, onChange, onFieldChange)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Ano de publicação"
            type="number"
            error={Boolean(errors.anoPublicacao)}
            helperText={errors.anoPublicacao}
            slotProps={{ htmlInput: { min: 1 } }}
            {...createFieldProps('anoPublicacao', controlled, values, onChange, onFieldChange)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Edição"
            {...createFieldProps('edicao', controlled, values, onChange, onFieldChange)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="URL da imagem de capa"
            type="url"
            {...createFieldProps('urlImagemCapa', controlled, values, onChange, onFieldChange)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Descrição"
            {...createFieldProps('descricao', controlled, values, onChange, onFieldChange)}
          />
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        spacing={1.5}
        sx={{ justifyContent: 'flex-end' }}
      >
        <Button type="button" size="large" color="inherit" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button
          type="submit"
          size="large"
          variant="contained"
          startIcon={<SaveRoundedIcon />}
          disabled={loading}
        >
          {loading ? 'Salvando...' : submitLabel}
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
  submitLabel: PropTypes.string.isRequired,
  controlled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}
