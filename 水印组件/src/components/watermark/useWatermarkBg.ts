interface PropType {
    readonly text:string
    readonly fontSize:number
    readonly gap:number
}
export default (props:PropType) => {
    console.log(props,'-=-=')
}