import "./ProductCard.css"

export default function ProductCard(props) {

    function handleClick() {
        props.selectEvent(props.id)
        props.ActiveID(props.id)
    }
    
    return(
        <div className="product-grid-cell">
            
            <img src={props.img} alt={`image from ${props.category} category`} style={{border: props.status ? "2px solid hsl(14, 86%, 42%)" : "1px solid transparent"}}
            />
            {
                props.status ?
                    <button className="manual-increase">
                        <div className="decrease" style={{padding: "6px 2px"}} onClick={(event)=>props.decrease(event)} data-id={props.id}>
                            <img src={`${import.meta.env.BASE_URL}/images/icon-decrement-quantity.svg`} alt="decrement icon" className="icon" />
                        </div>
                        <h5>{props.count}</h5>
                        <div className="increase" style={{padding: "3px 2px"}} onClick={()=>props.increase(props.id)}>
                            <img src={`${import.meta.env.BASE_URL}/images/icon-increment-quantity.svg`} alt="increment icon"  className="icon" />
                        </div>
                    </button> :
                    <button className="add-to-cart" onClick={handleClick}>
                        <img src={`${import.meta.env.BASE_URL}/images/icon-add-to-cart.svg`} alt="add to cart icon" className="fa-icons" />
                        Add to Cart
                    </button>
            }
            <h6>{props.category}</h6>
            <h5>{props.name}</h5>
            <p>${props.price}</p>
        </div>
    )
}