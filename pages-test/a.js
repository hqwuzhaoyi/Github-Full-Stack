import { withRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

// import moment from 'moment'

// import Comp from '../components/comp'

const Title = styled.h1`
    color: yellow;
    font-size: 40px;
`
const Comp = dynamic(import('../components/comp'))

const A = ({ router, name, time }) => {
    // console.log(arguments)
    return (
        <>
            <Title>This is title {time}</Title>
            <Comp><Link href="#aaa"><a className="link">a {name}</a></Link></Comp>
            <style jsx>{`
            a {
                color: blue;
            }
            . link {
                color: red;
            }
        `}</style>
            <style jsx global>{`
            a {
                color: green;
            }
        `}</style>
        </>
    )

}

A.getInitialProps = async (ctx) => {
    const moment = await import('moment')

    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'jocky',
                time: moment.default(Date.now() - 60 * 1000).fromNow()
            })
        }, 1000)
    })

    return await promise
}

export default withRouter(A)