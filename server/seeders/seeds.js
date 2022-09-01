// const userData = [
//     {
//         id: 1,
//         username: "Sassy_Maxxy",
//         email: "test@test.com",
//         password: "test123",
//         img: "imgLink",
//         age: 15,
//         aboutMe: "Sassy to the bone"
//     },
//     {
//         id: 2,
//         username: "Zach_the_Mach",
//         email: "speedyboi@doggo.com",
//         password: "test123",
//         img: "imgLink",
//         age: 55,
//         aboutMe: "I'm fast AF boiii"
//     },
//     {
//         id: 3,
//         username: "Tommy_and_Tina",
//         email: "Tommy_Tina_You@gmail.com",
//         password: "test123",
//         img: "imgLink",
//         age: 35,
//         aboutMe: "Double Trouble"
//     },
// ]
// const fetch = require('node-fetch');
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
//const faker = require('faker');
const db = require('../config/connection');
const { User } = require('../models');
const { faker } = require('@faker-js/faker');
//const aboutMeFiller = require('../../client/public/dogpun.json')
const dogApi = "https://dog.ceo/api/breeds/image/random"
db.once('open', async () => {
    await User.deleteMany({});

    // create user data
    const userData = [];

    for (let i = 0; i < 10; i += 1) {
        // const webDog = async () => {
        //     const fetchedData = await fetch("https://dog.ceo/api/breeds/image/random");
        //     const data = await fetchedData.json();
        //     return data.message
        // };

        // function dogphoto() {
        //     fetch(dogApi)
        //         .then(function (response) {
        //             return response.json();
        //         })
        //         .then(function (data) {
        //             console.log(data.message);
        //             return data.message;
        //         })
        //         .catch(function (err) {
        //             console.log(err)
        //         })
        // }
        // const firstName = faker.internet.firstName()
        // const lastName = faker.internet.lastName()
        const username = faker.internet.userName()
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        const img = await fetch(dogApi)
            .then(function (data) { return data.json(); }
            ).then(function (json) {
                //console.log(json);
                return json.message;
            }
            )
        const age = faker.mersenne.rand(85, 20);
        const aboutMe = faker.lorem.lines();
        const bestFeature = faker.word.adjective();
        const lookingFor = faker.word.adjective();
        // console.log(aboutMeFiller.dogpun)
        // const aboutMe = await fetch(aboutMeFiller)
        //     .then(function (data) { return data.json(); }
        //     ).then(function (json) {
        //         //console.log(json);
        //         return json.pun[0];
        //     }
        //     )

        userData.push({ username, email, password, img, age, aboutMe, bestFeature, lookingFor });
    }

    const createdUsers = await User.collection.insertMany(userData);
    console.log("hello im here")
    //console.log(JSON.stringify(createdUsers.insertedIds.))
    const keys = Object.keys(createdUsers.insertedIds)
    // create friends, cant get this to work for some reason
    for (let i = 0; i < 10; i++) {
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