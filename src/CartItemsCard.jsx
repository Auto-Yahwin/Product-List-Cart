import { FaRegCircleXmark } from "react-icons/fa6";
import "./CartItemsCard.css";

export default function CartItemsCard(props) {
    return(
        <div className="group-container" id={props.id}>
            <div className="group-container-group">
                <h5>{props.name}</h5>
                <div className="count-price">
                    <h6>{props.quantity}x</h6>
                    <p>@${props.price}</p>
                    <p>${props.price*props.quantity}</p>
                </div>
            </div>
            <FaRegCircleXmark size="1em" onClick={props.remove} data-id={props.id} className="fa-icon" />
        </div>
    )
}