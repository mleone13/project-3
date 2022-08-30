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
const faker = require('faker');
const db = require('../config/connection');
const { User } = require('../models');
const dogApi = "https://dog.ceo/api/breeds/image/random"
db.once('open', async () => {
    await User.deleteMany({});
    console.log("here in seeds")

    // create user data
    const userData = [];

    for (let i = 0; i < 10; i += 1) {
        // const webDog = async () => {
        //     const fetchedData = await fetch("https://dog.ceo/api/breeds/image/random");
        //     const data = await fetchedData.json();
        //     return data.message
        // };

        function dogphoto() {
            fetch(dogApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data.message);
                    return data.message;
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        const img = dogphoto();
        const age = faker.mersenne.rand(85, 20);
        const aboutMe = faker.lorem.lines();

        userData.push({ username, email, password, img, age, aboutMe });
    }

    const createdUsers = await User.collection.insertMany(userData);

    // create friends
    for (let i = 0; i < 10; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];

        let friendId = userId;

        while (friendId === userId) {
            const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
            friendId = createdUsers.ops[randomUserIndex];
        }

        await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    }

    console.log('all done!');
    process.exit(0);
});