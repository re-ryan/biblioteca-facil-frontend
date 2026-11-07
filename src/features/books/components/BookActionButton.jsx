import { Button } from '@mui/material'
import PropTypes from 'prop-types'

export const BookActionButton = ({ children, ...buttonProps }) => (
  <Button type="button" size="small" {...buttonProps}>
    {children}
  </Button>
)

BookActionButton.propTypes = {
  children: PropTypes.node.isRequired,
}
