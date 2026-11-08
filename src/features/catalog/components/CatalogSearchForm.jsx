import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import PropTypes from 'prop-types'

export const CatalogSearchForm = ({
  values,
  onChange,
  onSubmit,
  onClear,
  loading,
}) => {
  const hasValues = Object.values(values).some((value) => value.trim())

  return (
    <Stack component="form" spacing={2.5} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Título"
            name="titulo"
            value={values.titulo}
            onChange={onChange}
            placeholder="Ex.: Dom Casmurro"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Autor"
            name="autor"
            value={values.autor}
            onChange={onChange}
            placeholder="Ex.: Machado de Assis"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Categoria"
            name="categoria"
            value={values.categoria}
            onChange={onChange}
            placeholder="Ex.: Romance"
          />
        </Grid>
      </Grid>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar livros'}
        </Button>
        <Button
          type="button"
          color="inherit"
          variant="outlined"
          onClick={onClear}
          disabled={loading || !hasValues}
        >
          Limpar filtros
        </Button>
      </Stack>
    </Stack>
  )
}

CatalogSearchForm.propTypes = {
  values: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}
