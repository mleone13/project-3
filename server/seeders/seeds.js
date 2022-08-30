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

const faker = require('faker');
const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    console.log("here in seeds")

    // create user data
    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        userData.push({ username, email, password });
    }

    const createdUsers = await User.collection.insertMany(userData);

    // create friends
    for (let i = 0; i < 100; i += 1) {
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