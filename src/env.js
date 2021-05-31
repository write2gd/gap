(function (globalThis) {
  globalThis.__env = globalThis.__env || {
    host: 'https://localhost:8080',
    api: 'https://localhost:3000',
    oauth: {
      url: 'https://federate-qa.volvo.com',
      clientId: 'jsvs-pos-app'
    },
    production: false,
    environmentName: 'dev',
    loaded: true
  };
}(this));
