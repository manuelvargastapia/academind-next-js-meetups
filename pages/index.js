import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highliy active React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
};

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// }

export async function getStaticProps() {
    const client = await MongoClient.connect(
        'mongodb+srv://admin:VE5C6WvtIKChZKUp@cluster0.xr26k.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetupsCollection');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(({ _id, title, address, image }) => ({
                id: _id.toString(),
                title,
                address,
                image,
            })),
        },
        revalidate: 10,
    };
}

export default HomePage;
