import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const client = await MongoClient.connect(
            'mongodb+srv://admin:VE5C6WvtIKChZKUp@cluster0.xr26k.mongodb.net/meetups?retryWrites=true&w=majority'
        );

        const db = client.db();
        const meetupsCollection = db.collection('meetupsCollection');

        const result = await meetupsCollection.insertOne(req.body);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup created' });
    }
}

export default handler;
