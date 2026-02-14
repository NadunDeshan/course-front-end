export default function ProductCard(props){

    console.log(props)

    return(
        <div>
        <h1>{props.name}</h1>
        <p>{props.price}</p>
        <img src={props.image}
        />
        <button>Add to card</button>
        </div>
    )

}