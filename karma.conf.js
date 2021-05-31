// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-*',
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcov' ],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 70,
        functions: 90
      }
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 60000, //default 10000
    singleRun: true,
    reportSlowerThan: 100
  });
};
