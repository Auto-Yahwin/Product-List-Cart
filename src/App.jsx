import "./App.css";
import data from "./data.json"
import ProductCard from "./ProductCard";
import CartItemsCard from "./CartItemsCard";
import { useState } from "react";
import OrderConfirmation from "./OrderConfirmation";
import { FaCloud } from "react-icons/fa";
//Importations end here

//App() begins here
export default function App() {

  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemsIncrease, setItemsIncrease] = useState(0);
  const [confirmationPopup, setPopup] = useState(false)
  const [activeID, setActiveID] = useState(null)
  const [status, setStatus] = useState(false)
  

  // Create dataWithId once so generated IDs remain stable across renders.
  // If `data.json` already contains a stable `id` field, prefer that instead.
  /*const dataWithId = 
    data.map(item => ({
      id: crypto.randomUUID(),
      count: 0,
      active: false,
      ...item
    }))*/
  

  const [dataWithId, setDataWithId] = useState(data.map(item => ({
      id: crypto.randomUUID(),
      count: 0,
      active: false,
      ...item
    })))


  //function that manages adding items to cart begins here
  function select(id) {
    //getting the id of whats clicked and storing it in i
    let i;
    dataWithId.map(function(element, index){
      if (element.id===id) {
        i = index
        return i
      }
    })

    setDataWithId(prev=>prev.map(el=>
      {
        return prev.indexOf(el) === i ? {...el, count: el.count + 1, active: true} : el}
    ))

    /*stored[i].count >= 1 ? setStatus(true) : setStatus(false)*/ 
    
    //setChoosen(true)

    //updating the array that stores what has been clicked
    setSelected(function (prevState){
      if (prevState.length===0) {
        //console.log(i)
        //console.log(dataWithId);
        
        
        //setTotal(dataWithId[i].price)
        setItemsIncrease(1)
        //alert(choosen)
        //console.log(setChoosen(true));
        
        return [{...dataWithId[i], count: 1, active: true}]
      }

      let found = false
      const updated = prevState.map(item=>{
        
          if (item.name === dataWithId[i].name) {
            found = true
            return {...item, count: item.count + 1}
          }
          return item
      })

      if (found) {
        /*setTotal(
          updated.reduce((sum, item) => {
          return sum + (item.price)*(item.count)
        }, 0)
        )*/ 
        return updated
      }

      //Updating total cost of items added to cart
      /*setTotal(
        [dataWithId[i], ...prevState].reduce((sum, item) => sum + (item.price) * (item.count) ,0)
      )*/

      return [{...dataWithId[i], active: true, count: 1}, ...prevState]
    })
    //console.log(selected);
    //alert(choosen)
    
    

    //console.log(selected);
    
    setItemsIncrease(prevCount=>prevCount + 1)

    //function that manages adding items to cart stops here
  }

  //function that manages removing items from cart begins here
  function Remove(event) {
      const id=event.currentTarget.dataset.id;
      
      //if (condition) {
        
      //}
      setDataWithId(prev=>prev.map(el=>
      {
        //console.log("prevID: ", el.id, id);
        
        if (el.id === id) {
          if (el.count <= 1) {
            return {...el, count: el.count - 1, active: false}
          }
          return {...el, count: el.count - 1}
        }
        return el
        /*(el.id === id && el.count <= 1) ? {...el, count: el.count - 1, active: false} : el*/
      }
      ))

      setSelected(prevState=>{
        const updated = prevState.map(element=>{
          if (element.id === id) {
            return {...element, count: element.count - 1}
          }

          /*if (updated[id].count <= 0) {
            setActiveID(null)
          }*/
          
          return element
        })
        
        /*setTotal(
          updated.reduce((sum, item)=>sum + item.count*item.price, 0)
        )*/
        setItemsIncrease(prevCount=>prevCount - 0.5)

        return updated.filter(item=>item.count >= 1)
      })



      //function that manages removing items from cart stops here
  }

  function handleClick() {
    setPopup(false)
    setSelected([])
  }
  
  //console.log(dataWithId);
  
  


  //return for App() begins here
  return(
    <div className="main-container">
      {confirmationPopup &&
                <div className="overlay" onClick={(event)=>event.target === event.currentTarget ? setPopup(false) : null}>
                  <OrderConfirmation
                    properties={selected}
                    onclick={handleClick}
                  />
                </div>
      }
      <div className="app-container">

        <div className="container-holder">
          <h1>Desserts</h1>
          <div className="product-container">
            {dataWithId.map(elements =>
              (<ProductCard 
                img={
                  window.innerWidth<=500 ? elements.image.mobile : window.innerWidth > 500 && window.innerWidth <=1024 ? elements.image.tablet : elements.image.desktop}
                name={elements.name}
                category={elements.category}
                count={elements.count}
                price={elements.price}
                selectEvent={select}
                id={elements.id}
                key={elements.id}
                increase={select}
                decrease={Remove}
                ActiveID={setActiveID}
                statusID={activeID}
                //status={activeID === elements.id}
                status={elements.active}
            />
            ))}
          </div>
        </div>

        <div className="container-holder">
          
          <div className="cart-container">
            <h2>Your Cart ({itemsIncrease})</h2>
            {selected.length === 0 && <div className="sub-div">
              <img src="/images/illustration-empty-cart.svg" alt="" />
              <p>Your added items will appear here</p>
            </div>}

            {selected.map(elements=>(
              <CartItemsCard 
                img={elements.image.thumbnail}
                name={elements.name}
                category={elements.category}
                price={elements.price}
                quantity={elements.count}
                id={elements.id}
                key={elements.id}
                remove={Remove}
              />
            ))
            }

            {selected.length !== 0 && <div className="summary">
              <div className="group-container">
                <p>Order Total</p>
                <h2>${selected.reduce((init, value)=>init + (value.price*value.count), 0)}</h2>
              </div>
              <div className="label">
                <FaCloud size="1em" color="hsl(159, 69%, 38%)" />
                <p>This is a <span id="span">carbon-neutral</span> delivery</p>
              </div>
              <button onClick={()=>{
                //handleClick(selected)
                setPopup(true)
              }}>Confirm Order</button>
              
            </div>}
          </div>
        </div>

      </div>
    </div>
  )
}