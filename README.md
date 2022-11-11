# feedMyPixel Ltd. Holding page site
A site for feedMyPixel Ltd. A static html site built via nunjucks.

## Table of Contents
- [Requirements](#requirements)
- [Setup](#setup)
- [Development](#development)
- [Npm Scripts](#npm-scripts)
- [Releasing to Production](#releasing-to-production)
- [License](#license)

### Requirements

### [Node.js](http://nodejs.org/) & [npm](https://nodejs.org/download/)
Please install Node.js `>= v6.3.0` and npm `>= v4.1.1`.
You may find it easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)


### Setup
Install npm dependencies:
```bash
$ npm i
```

### Development
All development is done on the `develop` branch and static assets and markup are pushed to the `master` branch to deploy.

### Npm Scripts
To develop and work on the site locally:
```bash
$ npm run dev
```

To build the `/dist` directory for production
```bash
$ npm run build
```

If you wish to list all available `npm script` tasks for this project type:
```bash
$ npm run
```

### Releasing to Production
Once you have committed and pushed your changes to `develop`:
- `npm run pre:deploy`
- commit work
- push to `master`

### License
[Apache License 2.0](LICENSE)
