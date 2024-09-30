import Header from "../components/Header";
import { Button } from "@nextui-org/react";
import { ReactComponent as ArrowLeft } from "../assets/svg/arrow-left.svg";
import { ReactComponent as IconTrash } from "../assets/svg/trash.svg";
import { ReactComponent as IconLetterX } from "../assets/svg/letter-x.svg";
import { Image } from "@nextui-org/react";
import socialShirt from '../assets/img/social-men.jpg';
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Toaster, toast } from 'sonner';
import { useState, useEffect } from "react";
import { listProducts } from "../utils/Products";
import { getCart, removeItem, finishOrder } from "../utils/Api";
import {Chip} from "@nextui-org/react";

function Cart() {
    let storageProductsAdded = localStorage.getItem('productsAdded');
    let storageProductsAddedFiltered = storageProductsAdded !== null && Array.isArray(JSON.parse(storageProductsAdded)) ? JSON.parse(storageProductsAdded) : [];
    
    const [productsAdded, setProductsAdded] = useState<number[]>(storageProductsAddedFiltered);
    const [totalOrder, setTotalOrder] = useState(0);
    const [valueShip, setValueShip] = useState(0);

    const removeProductsAdded = (index:number) => {
        removeItem(index).then(data =>{
            setProductsAdded(data);
            toast.error('Oops! Your product has been removed from the cart. 😕'); 
        })
        
    };


    useEffect(()=>{
        getCart().then(data =>{
            setProductsAdded(data);
        })
    },[]);

    useEffect( ()=>{
        let totalOrder0 = 0;
        for(let i = 0; i < productsAdded.length; i++){
            let idProduct = productsAdded[i];
            totalOrder0 += listProducts[idProduct]['price'];
        }

        console.log('totalOrder0', totalOrder0);
        setTotalOrder(totalOrder0);
        localStorage.setItem('productsAdded', JSON.stringify(productsAdded));
    },[productsAdded])    

    return (
        <>
            <style>
                {`
            body{
                min-height: 100vh;
                background-color: #E3E6E9;
            }
            `}
            </style>
            <Toaster richColors expand={true} />
            <Header
                productsAdded={productsAdded}
            />

            <div className="flex justify-center mt-9">
                <div className="style-container-cart px-12">

                    <div>
                        <div className="flex justify-between items-center style-name-cart-btn-back">

                            <h2 className="style-title-name-cart font-bold">My Cart</h2>

                            <Button className='style-btn-back-initial-page rounded-full' onClick={()=>{ window.location.href = '/'; }}>
                                <div className='style-container-icon-arrow-left'>
                                    <ArrowLeft />
                                </div>
                                Continue Shopping
                            </Button>

                        </div>

                        <div className="style-table-cart">

                            <div className="style-title-head-table-cart">

                                <div className="style-col-product-table-cart font-bold ps-5">
                                    <p className="style-col-title-product-cart"> Product</p>
                                </div>
                                <div className="styler-container-trash"></div>
                                <div className="style-col-total-table-cart font-bold text-center">
                                    Total
                                </div>

                            </div>

                            <div className="style-body-table-cart">
                                {

                                productsAdded.map( (item, index) =>(

                                <div className="flex items-center mt-2 style-content-cart" key={index}>
                                    <div className="style-col-product-table-cart flex items-center">

                                        <Image
                                            isZoomed
                                            isBlurred
                                            src={ listProducts[item]['img_product'] }
                                            alt="NextUI hero Image"
                                            className="style-img-cart"
                                        />

                                        <span className="ms-5 style-name-product-cart">
                                        {listProducts[item]['name_product']}

                                        <div className=" font-bold style-price-mobile-cart">
                                        $ {listProducts[item]['price']}
                                        
                                    </div>
                                        </span>
                                        
                                        
                                    </div>

                                    <div className="styler-container-trash">
                                        <Button color="danger" onClick={() => {removeProductsAdded(listProducts[item]['id_product'])}}>
                                            <IconTrash />
                                        </Button>

                                    </div>

                                    <div className="style-col-total-table-cart font-bold text-center">
                                        $ {listProducts[item]['price']}
                                    </div>
                                    <div className="style-container-btn-close-cart">
                                    <button className="style-btn-remove-cart" onClick={() => {removeProductsAdded(listProducts[item]['id_product'])}}>
                                        <IconLetterX/>
                                    </button>
                                    </div>
                                </div>
                                ))
                                }
                            </div>

                        </div>

                    </div>

                    <div className="style-panel-finish-order flex justify-between">
                        <div>
                            <div className="style-ship-word font-bold">Choose shipping mode:</div>
                            <RadioGroup>
                                <Radio value="free-ship"  onChange={()=>{setValueShip(0)}}>Store pickup - free</Radio>
                                <Radio value="paid-ship" onChange={()=>{setValueShip(9.90)}}>Delivery at home - $9.90</Radio>
                            </RadioGroup>
                        </div>

                        <div className="style-container-values-btn-finish-order">
                            <div className="flex justify-between style-color-gray">
                                <span>SUBTOTAL TTC</span>
                                <span>${totalOrder.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between style-color-gray">
                                <span>SHIPPING</span>
                                <span>{valueShip === 0 ? 'FREE' : `$${valueShip.toFixed(2)}`}</span>
                                
                            </div>
                            <div className="style-line-separete-subtotal-total"></div>
                            <div className="flex justify-between style-color-gray">
                                <span>TOTAL</span>

                                <span>${(totalOrder + valueShip).toFixed(2)}</span>
                            </div>

                            <div>
                                <Button className='style-btn-finish-order rounded-lg text-white w-full font-bold flex justify-between'
                                    onClick={() => {
                                        

                                        finishOrder().then(data =>{
                                            setProductsAdded(data);
                                            toast.success('Congrats! Your order is now complete and on its way. 🎉');
                                        })
                                        
                                    }}
                                >
                                    <div>
                                        Checkout
                                    </div>
                                    <div>
                                        ${(totalOrder + valueShip).toFixed(2)}
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;