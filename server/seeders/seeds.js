const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
//const faker = require('faker');
const db = require('../config/connection');
const { User } = require('../models');
const { faker } = require('@faker-js/faker');
const dogPun = require('./dogpun.json')
const dogApi = "https://dog.ceo/api/breeds/image/random"
db.once('open', async () => {
    await User.deleteMany({});

    // create user data
    const userData = [];

    for (let i = 0; i < 50; i += 1) {


        const username = faker.internet.userName()
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        const img = await fetch(dogApi)
            .then(function (data) { return data.json(); }
            ).then(function (json) {
                return json.message;
            }
            )
        const age = faker.mersenne.rand(85, 20);
        // const aboutMe = faker.lorem.lines();
        //console.log(dogPun[0].pun)
        const aboutMe = faker.helpers.arrayElement(dogPun).pun;
        console.log(aboutMe)
        const bestFeature = faker.word.adjective();
        const lookingFor = faker.word.adjective();


        userData.push({ username, email, password, img, age, aboutMe, bestFeature, lookingFor });
    }

    const createdUsers = await User.collection.insertMany(userData);
    console.log("hello im here")
    //console.log(JSON.stringify(createdUsers.insertedIds.))
    const keys = Object.keys(createdUsers.insertedIds)
    // create friends, cant get this to work for some reason
    for (let i = 0; i < 30; i++) {
        // console.log(createdUsers.insertedIds.length)
        //this code grabs a random user

        const randomUserIndex = Math.floor(Math.random() * keys.length);
        const userId = createdUsers.insertedIds[`${randomUserIndex}`];

        let friendId = userId;

        //this code grabs another random user
        while (friendId === userId) {
            const randomUserIndex2 = Math.floor(Math.random() * keys.length);

            friendId = createdUsers.insertedIds[`${randomUserIndex2}`];
        }
        try {

            await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
        }
        catch (error) {
            console.log("error" + error.message)
        }
    }

    console.log('all done!');
    process.exit(0);
});