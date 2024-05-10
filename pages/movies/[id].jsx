export default (props) => {
    console.log(props,'======')
    return <div>
        <h1>电影详情页</h1>
        <h1>
            {props.router.query.id}
        </h1>
    </div>
}