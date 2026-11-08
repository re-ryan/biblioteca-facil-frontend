export const DEMO_CREDENTIALS = Object.freeze({
  login: 'bibliotecario-linux',
  password: 'biblioteca123',
})

export const READER_DEMO_CREDENTIALS = Object.freeze({
  login: 'leitor',
  password: 'leitura123',
})

export const USER_ROLES = Object.freeze({
  ADMINISTRATOR: 'ADMINISTRADOR',
  READER: 'LEITOR',
})

export const DEMO_USER = Object.freeze({
  name: 'Bibliotecário da Biblioteca Linux',
  login: DEMO_CREDENTIALS.login,
  role: USER_ROLES.ADMINISTRATOR,
})

export const READER_DEMO_USER = Object.freeze({
  name: 'Leitor de demonstração',
  login: READER_DEMO_CREDENTIALS.login,
  role: USER_ROLES.READER,
})

const demoAccounts = [
  { credentials: DEMO_CREDENTIALS, user: DEMO_USER },
  { credentials: READER_DEMO_CREDENTIALS, user: READER_DEMO_USER },
]

export const authenticate = ({ login, password }) => {
  const normalizedLogin = login.trim().toLowerCase()
  const account = demoAccounts.find(
    ({ credentials }) =>
      normalizedLogin === credentials.login && password === credentials.password,
  )

  return account?.user ?? null
}

export const getDefaultRoute = (user) => {
  if (!user) {
    return '/login'
  }

  return user.role === USER_ROLES.READER ? '/catalogo' : '/livros'
}
