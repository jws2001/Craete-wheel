import Link from "next/link"
import { useRouter } from "next/router"
import style from './index.module.css'
export default () => {
    const router = useRouter();
    return <ul className={
        style.header
    }>
    <li>
        <Link href="/movies">
            <span href="">电影页</span>
        </Link>              
    </li>
    <li>
    <Link href="/movies/[id]" as="/movies/3">
            <span href="">电影详情页</span>
        </Link>
    </li>
    <li>
    <Link href="/" >
            <span href="">首页</span>
        </Link>
    </li>
    <li>
        <button onClick={() => {
            router.push('/movies/[...prams]', '/movies/3/q/w/w/q/w/qw', )
        }}>跳转到prams</button>
    </li>
</ul>
}