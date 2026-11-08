export const DEMO_CREDENTIALS = Object.freeze({
  login: 'bibliotecario-linux',
  password: 'biblioteca123',
})

export const DEMO_USER = Object.freeze({
  name: 'Bibliotecário da Biblioteca Linux',
  login: DEMO_CREDENTIALS.login,
  role: 'ADMINISTRADOR',
})

export const authenticate = ({ login, password }) =>
  login.trim().toLowerCase() === DEMO_CREDENTIALS.login &&
  password === DEMO_CREDENTIALS.password
