import CartItemsCard from './CartItemsCard'
import './OrderCOnfirmation.css'
import { FaRegCheckCircle } from 'react-icons/fa'

export default function OrderConfirmation(props) {

    return(
        <div className="confirmation-card">
            <FaRegCheckCircle size="2em" color="hsl(159, 69%, 38%)" stroke='white' strokeWidth='15px' />
            <h1>Order Confirmed</h1>
            <p>We hope you enjoy your food!</p>
            {
                props.properties.map(element=>(
                    <div className="item-card">
                        <div className="group1">
                            <img src={element.image.thumbnail} alt="" />
                        </div>
                        <div className='group2'>
                            <h6>{element.name}</h6>
                            <div className='sub-group'>
                                <h6>{element.count}x</h6>
                                <p>@${element.price}</p>
                            </div>
                        </div>
                        <div className='group3'>
                            <h6>${element.price*element.count}</h6>
                        </div>
                    </div>
                    ))
                }
               
            <div className="group">
                <p>Order Total</p>
                <h3>${props.properties.reduce((init, val)=>init + (val.count * val.price), 0)}</h3>
            </div>
            <button onClick={props.onclick}>Start New Order</button>
        </div>
    )
}