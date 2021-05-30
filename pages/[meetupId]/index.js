import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = ({ meetupData }) => {
    return (
        <>
            <Head>
                <title>{meetupData.title}</title>
                <meta name="description" content={meetupData.description} />
            </Head>
            <MeetupDetail
                image={meetupData.image}
                title={meetupData.title}
                address={meetupData.address}
                description={meetupData.description}
            />
        </>
    );
};

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://admin:VE5C6WvtIKChZKUp@cluster0.xr26k.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetupsCollection');

    const meetups = await meetupsCollection.find({}, { _id: true }).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(({ _id }) => ({
            params: { meetupId: _id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://admin:VE5C6WvtIKChZKUp@cluster0.xr26k.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetupsCollection');

    const meetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
            },
        },
    };
}

export default MeetupDetails;
