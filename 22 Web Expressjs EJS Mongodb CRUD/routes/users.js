var express = require('express');
var router = express.Router();

module.exports = function (client, dbName) {
  router.get('/', function (req, res, next) {
    let sort = req.query
    if (sort.iddesc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ _id: -1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.stringasc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ stringdb: 1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.stringdesc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ stringdb: -1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.integerasc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ integerdb: 1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.integerdesc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ integerdb: -1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.floatasc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ floatdb: 1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.floatdesc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ floatdb: -1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.dateasc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ datedb: 1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.datedesc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ datedb: -1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.booleanasc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ booleandb: 1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else if (sort.booleandesc == '') {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find().sort({ booleandb: -1 }).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }
    else {
      async function main() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('c22');
        const findResult = await collection.find({}).toArray();
        findResult.forEach((item, index) => {
          item.id = index + 1
        });
        res.json(findResult);
        return 'done default.';
      }
      main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    }

  });

  router.post('/', function (req, res, next) {
    async function main() {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('c22');

      const insertResult = await collection.insertOne({
        stringdb: req.body.stringdb,
        integerdb: Number(req.body.integerdb),
        floatdb: Number(req.body.floatdb),
        datedb: req.body.datedb,
        booleandb: req.body.booleandb == 'true' ? true : false
      });

      const findResult = await collection.find({}).toArray();
      res.json(findResult);

      return 'done.';
    }
    main()
      .then(console.log)
      .catch(console.error)
      .finally(() => client.close());
  });

  router.put('/:id', function (req, res, next) {
    async function main() {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('c22');
      let findResult = await collection.find({}).toArray();
      const objectId = findResult[req.params.id - 1]._id;
      const updateResult = await collection.updateOne({ "_id": objectId }, {
        $set: {
          stringdb: req.body.stringdb,
          integerdb: Number(req.body.integerdb),
          floatdb: Number(req.body.floatdb),
          datedb: req.body.datedb,
          booleandb: req.body.booleandb == 'true' ? true : false
        }
      });
      findResult = await collection.find({}).toArray();
      res.json(findResult);

      return 'done.';
    }
    main()
      .then(console.log)
      .catch(console.error)
      .finally(() => client.close());
  });

  router.delete('/:id', function (req, res, next) {
    console.log(req.params.id)
    async function main() {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('c22');
      let findResult = await collection.find({}).toArray();
      const objectId = findResult[req.params.id - 1]._id;
      const indexName = await collection.deleteOne({ "_id": objectId });
      findResult = await collection.find({}).toArray();
      res.json(findResult);
      return 'done.';
    }
    main()
      .then(console.log)
      .catch(console.error)
      .finally(() => client.close());
  });
  return router;
}