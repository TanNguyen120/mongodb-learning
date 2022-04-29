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


const planet = { name: "Sayan", orderFromSun: 12, hasRing: false };
insertAPlanet(planet);