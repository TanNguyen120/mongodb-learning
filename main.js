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


listDataBase();