module.exports = {
  apps: [
    {
      name: 'messenger-server',
      script: 'server.js',
      env: {},
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
