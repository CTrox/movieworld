const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'movieworld';

module.exports = {
  insert: function (collection, document) {
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      console.log("Connected to the mongo server");
      insertDocument(db, collection, document, (docs) => {
        client.close();
      });
    });
  },
  find: function (collection, fn) {
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      console.log("Connected to the mongo server");
      findDocuments(db, collection, (docs) => {
        client.close();
        fn(docs);
      });
    });
  },
  remove: function (collection, document, fn) {
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      console.log("Connected to the mongo server");
      removeDocument(db, collection, document, (docs) => {
        client.close();
      });
    });
  }
};

var findDocuments = (db, collection, callback) => {
  var collection = db.collection(collection);
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
}

var insertDocument = (db, collection, document, callback) => {
  // Get the documents collection
  var collection = db.collection(collection);
  // Insert some documents
  collection.replaceOne({id: document.id}, document, {upsert: true}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 document into the collection");
    callback(result);
  });
}

var removeDocument = (db, collection, document, callback) => {
  // Get the documents collection
  var collection = db.collection(collection);
  // Insert some documents
  collection.remove({id: document.id}, function(err, result) {
    assert.equal(err, null);
    console.log("Removed 1 document");
    callback(result);
  });
}
