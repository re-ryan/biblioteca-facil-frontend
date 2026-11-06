import { useState } from 'react'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'

const navigation = [
  { label: 'Início', path: '/' },
]

export const AppLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isCurrentPath = (path) =>
    path === '/' ? location.pathname === path : location.pathname.startsWith(path)

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'rgba(23, 107, 91, 0.12)',
          bgcolor: 'rgba(255, 253, 248, 0.92)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 72 }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              spacing={1.25}
              sx={{
                alignItems: 'center',
                textDecoration: 'none',
                flexGrow: 1,
                color: 'primary.dark',
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 2.5,
                  color: 'primary.contrastText',
                  bgcolor: 'primary.main',
                }}
              >
                <MenuBookRoundedIcon />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    color: 'inherit',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    lineHeight: 1.1,
                  }}
                >
                  Biblioteca Fácil
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: { xs: 'none', sm: 'block' }, mt: 0.25 }}
                >
                  Livros mais perto de você
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navigation.map(({ label, path }) => (
                <Button
                  key={path}
                  component={RouterLink}
                  to={path}
                  color={isCurrentPath(path) ? 'primary' : 'inherit'}
                  variant={isCurrentPath(path) ? 'contained' : 'text'}
                >
                  {label}
                </Button>
              ))}
            </Stack>

            <Button
              component={RouterLink}
              to="/login"
              color="primary"
              variant={isCurrentPath('/login') ? 'contained' : 'outlined'}
              startIcon={<LoginRoundedIcon />}
              sx={{ display: { xs: 'none', md: 'inline-flex' }, ml: 1.5 }}
            >
              Entrar
            </Button>

            <IconButton
              aria-label="Abrir menu de navegação"
              color="primary"
              onClick={() => setMenuOpen(true)}
              sx={{ display: { md: 'none' } }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }} role="navigation">
          <Typography color="primary.dark" sx={{ px: 2, py: 1, fontWeight: 700 }}>
            Navegação
          </Typography>
          <List>
            {navigation.map(({ label, path }) => (
              <ListItemButton
                key={path}
                component={RouterLink}
                to={path}
                selected={isCurrentPath(path)}
                onClick={() => setMenuOpen(false)}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton
              component={RouterLink}
              to="/login"
              selected={isCurrentPath('/login')}
              onClick={() => setMenuOpen(false)}
            >
              <LoginRoundedIcon color="primary" sx={{ mr: 2 }} />
              <ListItemText primary="Entrar" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'rgba(23, 107, 91, 0.12)' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Biblioteca Fácil — um catálogo para aproximar pessoas, livros e bibliotecas.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
