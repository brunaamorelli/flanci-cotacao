module.exports = {
  apps : [{
    name   : "flanci-cotacao",
    script : "./dist/main.js",
    instances : 0,
    exec_mode : "cluster",
    merge_logs : true,
    env : {
      SERVER_PORT: 5000,
      DB_URL: "mongodb+srv://flanci-cotacao:HSbrqkugMYpiRRfMsoe@licitacao.iwaja.mongodb.net/Aeronautica?retryWrites=true&w=majority",
      NODE_ENV: "development",
      AUTH0_DOMAIN: "flanci-hml-cotacoes.us.auth0.com",
      AUTH0_AUDIENCE: "OKGdALXrMg6iWxdRCg8IkcvbVQK4k8qv"
    },
    env_production : {
      SERVER_PORT: 5001,
      DB_URL: "mongodb+srv://flanci-cotacao:HSbrqkugMYpiRRfMsoe@licitacao.iwaja.mongodb.net/Aeronautica?retryWrites=true&w=majority",
      NODE_ENV: "production",
      AUTH0_DOMAIN: "flanci-hml-cotacoes.us.auth0.com",
      AUTH0_AUDIENCE: "OKGdALXrMg6iWxdRCg8IkcvbVQK4k8qv"
    }
  }]
}
