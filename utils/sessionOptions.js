// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

const sessionOptions = {
  password: "asdasjldkf;e*(^&^%hjahfdhs*(&(*)(afdfjadf",
  cookieName: 'iron-session',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false,
  },
}

export default sessionOptions