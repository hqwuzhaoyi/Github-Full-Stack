import withRepoBasic from '../../components/with-repo-basic'
import dynamic from 'next/dynamic'

import api from '../../lib/api'

const MDRenderer = dynamic(() => import('../../components/MarkdownRender'),{
    loading: () => <p>Loading</p>
})


const Detail = ({ readme }) => {
    return <MDRenderer content={readme.content} isBase64={true} />
}

Detail.getInitialProps = async ({ ctx: { query: { owner, name, req, res } } }) => {
    const readmeResp = await api.request({
        url: `/repos/${owner}/${name}/readme`
    }, req, res)

    return {
        readme: readmeResp.data
    }
}

// import Repo from '../../components/Repo'
// import Link from 'next/link'

// import api from '../../lib/api'


// function makeQuery(queryObject) {
//     const query = Object.entries(queryObject)
//         .reduce((result, entry) => {
//             result.push(entry.join('='))
//             return result;
//         }, []).join('&')

//     return `?${query}`
// }

// function Detail({ repoBasic, router }) {
//     console.log(repoBasic)
//     const query = makeQuery(router.query)
//     return (
//         <div className="root">
//             <div className="repo-basic">
//                 <Repo repo={repoBasic} />
//                 <div className="tabs">
//                     <Link href={`/detail${query}`} >
//                         <a className="tab index">Read Me</a>
//                     </Link>
//                     <Link href={`/detail/issues${query}`}>  
//                         <a className="tab issues">issues</a>
//                     </Link>
//                 </div>
//             </div>
//             <div>ReadMe</div>
//             <style jsx>
//                 {`
//                     .root {
//                         padding-top: 20px;
//                     }
//                     .repo-basic {
//                         padding: 20px;
//                         border: 1px solid #eee;
//                         margin-bottom: 20px;
//                         border-radius: 5px;
//                     }
//                     .tab + .tab {
//                         margin-left: 20px;
//                     }
//                 `}
//             </style>
//         </div>
//     )
// }

// Detail.getInitialProps = async ({ router, ctx }) => {
//     // return new Promise(resolve => {
//     //     setTimeout(() => {
//     //         resolve({})
//     //     }, 1000)
//     // })
//     console.log(ctx)
//     const { owner, name } = ctx.query
//     const repoBasic = await api.request({
//         url: `/repos/${owner}/${name}`
//     }, ctx.req, ctx.res)

//     return {
//         repoBasic:repoBasic.data
//     }
// }

export default withRepoBasic(Detail, 'index')