#!/usr/bin/node
/* prints all characters of Star Wars movie passed as command-line argument */

const request = require('request');

const movieId = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request(url, async (err, res, body) => {
    if (err) {
        console.error(err);
        return;
    }

    const charactersArray = JSON.parse(body).characters;

    for (const character of charactersArray) {
        await new Promise((resolve, reject) => {
            request(character, (err, res, body) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                console.log(JSON.parse(body).name);
                resolve();
            });
        });
    }
});
