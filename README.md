# best-bot [![Build Status](https://travis-ci.com/LBG-Moscow/best-bot.svg?token=LprjWcQjL2BzzoK5rQeq&branch=master)](https://travis-ci.com/LBG-Moscow/best-bot) ![](https://img.shields.io/discord/688689789196959745.svg?color=7289DA&label=Discord%20Chat&logo=Discord&logoColor=7289DA&style=plastic)

This is the main bot for the Local Board of European Students of Technology Group Moscow at it's social media's groups [VK](https://vk.com/) and [Discord](https://discordapp.com/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Bot is configured to work (at the current version) via the Discord API and with access to a PostgreSQL DB

```
Node.js version >= 10
npm version >= 6
PostgreSQL
```

### Installing


```
git clone git@github.com:LBG-Moscow/best-bot.git
cd best-bot/
npm install
npm run dev
```

Finally edit the config.json files according with the examples

```
config.json
./database/db_config.json
```

## Deployment

Deployment is done via the Heroku CLI, it automatically deploys from the master branch.
For access to the Heroku app settings and other information contact the project leader [Caio Fleury](mailto:caio.fleury.r@gmail.com)

## Built With

* [Node.js](https://nodejs.org/en/)
* [Heroku](https://devcenter.heroku.com/)

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Caio Fleury** - *Initial work & Project leader* - [CaioF](https://github.com/CaioF)

See also the list of [contributors]() who participated in this project.

## License

This project is licensed under the Attribution-NonCommercial-NoDerivatives 4.0 International License - see the [LICENSE.md](LICENSE.md) file for details
