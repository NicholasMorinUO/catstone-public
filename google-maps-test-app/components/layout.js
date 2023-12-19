import CustomNavbar from './navbar';
import Head from 'next/head';


export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>CatMaps</title>
            </Head>
            <CustomNavbar />
            <main>{children}</main>
        </>
    )
}