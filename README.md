# flanci-cotacao

API Rest implemented with Node.js, Restify, and Mongoose. Security implemented with Auth0. Logs Implemented with Bunyan. Tests implemented with Jest and Supertest.

---
## Requirements

Project developed in Node.js (v12.18.3)

## Install

    $ git clone https://github.com/brunaamorelli/flanci-cotacao.git
    $ cd flanci-cotacao
    $ npm install

## Configure app

Open `common/environment.ts` then edit it with your settings. You will need:

    - A MongoDB Database URL;
    - Your domain at Auth0;
    - Your identifier or API at Auth0;
    - Your Auth0 test token;

To run the application using pm2, open `ecosystem.config.ts` then edit it with your settings. You will need:

    - A MongoDB Database URL;
    - Your domain at Auth0;
    - Your identifier or API at Auth0;

## Running 

    $tsc
    $node dist/main.js

## Tests

    $npm test
