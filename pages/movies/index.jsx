import { getMovies } from '../../services/movieServices'
import React from 'react'
// export default ({pageProps}) => {
//         console.log(pageProps)
//     return (
//         <ul>
//             {
//                 pageProps.moviesData.map(item => {
//                     return <li key={item._id}>
//                         {item.name}
//                     </li>
//                 })
//             }
//         </ul>
//     )
// }

export default class Movies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moviesData:props.pageProps.moviesData,
            n:0
        }
    }
    changeState = () => {
        this.setState({
            n: this.state.n + 1
        })
        console.log(this.state.n)
    }
    render() {
        console.log('render')
        return (
            <ul>
                <li>
                    {
                        this.state.n
                    }
                </li>
                <li>
                    <button onClick={this.changeState}>add</button>
                </li>
                        {
                            this.state.moviesData.map(item => {
                                return <li key={item._id}>
                                    {item.name}
                                </li>
                            })
                        }
                    </ul>

        )
    }
}

export async function getStaticProps () {
    const resp = await getMovies()
    return {
        props:{
            moviesData:resp.data
        }
    }
}