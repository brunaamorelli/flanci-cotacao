module.exports = {
  apps : [{
    name   : "flanci-cotacao",
    script : "./dist/main.js",
    instances : 0,
    exec_mode : "cluster",
    merge_logs : true,
    env : {
      SERVER_PORT: 5000,
      DB_URL: "<MONGODB_URL>",
      NODE_ENV: "development",
      AUTH0_DOMAIN: "<AUTH0_DOMAIN>",
      AUTH0_AUDIENCE: "<AUTH0_AUDIENCE>"
    },
    env_production : {
      SERVER_PORT: 5001,
      DB_URL: "<MONGODB_URL>",
      NODE_ENV: "production",
      AUTH0_DOMAIN: "<AUTH0_DOMAIN>",
      AUTH0_AUDIENCE: "<AUTH0_AUDIENCE>"
    }
  }]
}