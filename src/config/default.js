/* @flow */

module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Shark Kontrol',
    titleTemplate: 'Shark Kontrol - %s',
    meta: [
      {
        name: 'description',
        content: 'React Interface for sharks.'
      }
    ]
  }
};
