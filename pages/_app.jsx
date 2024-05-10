import Header from "../components/header"
import './global.css'
export default ({Component, ...props}) => {
    return <div>
        <Header/>
        <Component {...props} />
    </div>
}