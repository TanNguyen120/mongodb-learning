const { MongoClient } = require('mongodb');



// kết nối tới database mongo ở server bằng URI (đoạn taan:1234 là usrname và password của super admin cho mongodb)
const URI = "mongodb+srv://taan:1234@text-table.j3yxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


// tạo một mongo client để kết nối tới server bằng URI ở trên
const mongoClient = new MongoClient(URI);



// hàm lấy danh sách các database hiện có trong cluster sau khi lấy xong thì đóng connection
const listDataBase = async () => {
    try {
        await mongoClient.connect();
        const dbs = await mongoClient.db().admin().listDatabases();
        console.log("data base list is: " + JSON.stringify(dbs.databases));
    } catch (error) {
        console.log(error);
    } finally {
        await mongoClient.close();
    }
}


// hàm insert vào collection planet một document mới
const insertAPlanet = async (planet) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("sample_guides");
        const collection = db.collection("planets");
        const relsult = await collection.insertOne(planet);
        console.log('inserted a planet to sample_guides database successfully with id: ' + relsult.insertedId);
    } catch (error) {
        console.log(error);
    } finally {
        await mongoClient.close();
    }
}


// hàm lấy danh sách các document trong collection planet
const listOfPlanets = async () => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("sample_guides");
        const collection = db.collection("planets");
        const planets = await collection.find({}).toArray();
        if (planets) {
            console.log("planets list is: ");
            planets.forEach(planet => {
                console.log("name : " + planet.name);
            });
        }
        else {
            console.log("planets list is empty");
        }
    } catch (error) {
        console.log(error);
    } finally { mongoClient.close(); }
}

// hàm lấy 1 document trong collection planet theo name
const getAPlanet = async (name) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("sample_guides");
        const collection = db.collection("planets");
        const planet = await collection.findOne({ name: name });
        if (planet) {
            console.log("planet is: " + JSON.stringify(planet));
        }
        else {
            console.log("there is no planet with name: " + name);
        }
    } catch (error) {
        console.log(error);
    } finally { mongoClient.close(); }
}

// hàm tìm những hành tinh có vòng tròn bao quanh sắp xếp theo thứ tự từ gần đến xa mặt trời nhất
const getPlanetHasRing = async () => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("sample_guides");
        const collection = db.collection("planets");
        const query = { hasRings: true };
        const option = { sort: { orderFromSun: 1 }, limit: 10 };
        const planets = await collection.find(query, option).toArray();
        if (planets) {
            console.log("planets have ring list is: ");
            planets.forEach(planet => {
                console.log("name : " + planet.name);
            });
        }
        else {
            console.log("planets list is empty");
        }
    } catch (error) {
        console.log(error);
    } finally { mongoClient.close(); }
}

getPlanetHasRing();