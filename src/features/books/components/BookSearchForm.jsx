import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Button, InputAdornment, Stack, TextField } from '@mui/material'
import PropTypes from 'prop-types'

export const BookSearchForm = ({ value, onChange, onSubmit, onClear, loading }) => (
  <Stack
    component="form"
    role="search"
    onSubmit={onSubmit}
    direction={{ xs: 'column', sm: 'row' }}
    spacing={2}
    sx={{ alignItems: { sm: 'center' } }}
  >
    <TextField
      fullWidth
      label="Título do livro"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Ex.: Clean Architecture"
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
    <Button type="submit" variant="contained" size="large" disabled={loading}>
      Pesquisar
    </Button>
    {value && (
      <Button
        type="button"
        variant="text"
        size="large"
        startIcon={<ClearRoundedIcon />}
        onClick={onClear}
      >
        Limpar
      </Button>
    )}
  </Stack>
)

BookSearchForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}
