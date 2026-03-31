import { FaCartPlus } from "react-icons/fa"
import "./ProductCard.css"

export default function ProductCard(props) {

    function handleClick() {
        props.selectEvent(props.id)
        props.ActiveID(props.id)
        //alert(props.id)
        //console.log(props.ActiveID);
        //console.log(window.innerWidth);
        
    }

    return(
        <div className="product-grid-cell"
        >
            {/*console.log("status:", props.status, "id:", props.id)*/
            /*console.log(props.statusID, typeof props.statusID, props.id, typeof props.id)*/
            }
            
            <img src={props.img} alt={`image from ${props.category} category`} style={{border: props.status ? "2px solid hsl(14, 86%, 42%)" : "1px solid transparent"}}
            />
            {
                props.status ?
                    <button className="manual-increase">
                        <div className="decrease">
                            <h5 onClick={(event)=>props.decrease(event)} data-id={props.id}>-</h5>
                        </div>
                        
                            <h5>{props.count}</h5>
                        
                        <div className="increase">
                            <h5 onClick={()=>props.increase(props.id)}>+</h5>
                        </div>
                    </button> :
                    <button className="add-to-cart" onClick={handleClick}>
                        <FaCartPlus size="1.5em" color="hsl(14, 86%, 42%)" />
                        Add to Cart
                    </button>
            }
            <h6>{props.category}</h6>
            <h5>{props.name}</h5>
            <p>${props.price}</p>
        </div>
    )
}