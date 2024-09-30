import { ReactComponent as IconCart } from "../assets/svg/cart.svg";
import { Button, Badge } from "@nextui-org/react";
import Register from "./Register";
import Login from "./Login";
interface Props {
    productsAdded: number[];
}

function Header(props: Props) {
    const { productsAdded } = props;
    return (
        <>
            <div className="flex justify-center">
                <header className='style-header bg-gray-300 w-full rounded-full flex  justify-between mt-10'>
                    <div>
                        <h1 className='style-title-e-commerce' onClick={() => window.location.href = '/'}>COMMERCE</h1>
                    </div>


                    <div className='style-area-btn-header'>
                        

                        {
                            productsAdded.length > 0 ?
                                <Badge content={productsAdded.length} color="danger" style={{ fontSize: "16px", fontWeight: 'lighter', fontFamily: 'initial' }}>
                                    <Button className='style-btn-cart rounded-full w-full' onClick={() => window.location.href = '/cart'}>
                                        <IconCart />
                                        Cart
                                    </Button>
                                </Badge>
                                :
                                <Button className='style-btn-cart rounded-full w-full' onClick={() => window.location.href = '/cart'}>
                                    <IconCart />
                                    Cart
                                </Button>
                        }

                    </div>
                </header>
            </div>
        </>
    );
}


export default Header;