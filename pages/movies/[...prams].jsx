import Head from 'next/head'


export default (props) => {
    return <div>
        <Head>
            <title>...params</title>
        </Head>
        <h1>{props.router.query.prams}</h1>
        <img src="/car.jpeg" alt="" />
    </div>
}