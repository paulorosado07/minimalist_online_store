
import { Button, Image } from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import socialShirt from '../assets/img/social-men.jpg';
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { listProducts } from "../utils/Products";
import { getCart, addItem } from "../utils/Api";
import { screenSize, spaceBetweenSwiper } from "../utils/VariablesSwiper";

function Main() {
    let storageProductsAdded = localStorage.getItem('productsAdded');

    let storageProductsAddedFiltered = storageProductsAdded !== null && Array.isArray(JSON.parse(storageProductsAdded)) ? JSON.parse(storageProductsAdded) : [];

    const [productsAdded, setProductsAdded] = useState<any[]>(storageProductsAddedFiltered);
    const [dynamicSpaceBetween, setDynamicSpaceBetween] = useState(25);

    function addProductToCart(id_product: number) {
        addItem(id_product).then(data => {
            setProductsAdded(data);
        })
        //setProductsAdded(prevArray => [...prevArray, id_product]);
    }

    function selectHere(obj: any, key: string) {
        if (key in obj) {
            return obj[key];
        }

        return false;
    }

    const handleResize = () => {
        let s = window.innerWidth;
        //console.log(screenSize.length)
        console.log(s)
        for (let i = 0; i < screenSize.length; i++) {
            let item = screenSize[i]

            if (s >= item) {

                let itemToString = item.toString();
                if (itemToString in spaceBetweenSwiper) {
                    let valueReceived = selectHere(spaceBetweenSwiper, itemToString);
                    if (valueReceived !== false) {
                        setDynamicSpaceBetween(valueReceived);
                    }
                }
                break
            }
        }


    };
    useEffect(() => {
        handleResize()

        window.addEventListener('resize', handleResize);
        getCart().then(data => {
            setProductsAdded(data);
        })

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        localStorage.setItem('productsAdded', JSON.stringify(productsAdded));
    }, [productsAdded])

    return (
        <>

            <Header
                productsAdded={productsAdded}
            />
            <div className='mt-5 text-center border-b-3'>
                <h2 className='style-title-products font-bold'>
                    Products
                </h2>
            </div>

            <div className='style-container-carrousel my-5'>
                <div className='style-space-carrousel'>
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={dynamicSpaceBetween}
                        pagination={{
                            clickable: true,
                        }}

                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {
                            listProducts.map((item, index) =>
                                <SwiperSlide key={index}>

                                    <div className='style-item-carrousel flex justify-around py-9'>
                                        <div className="style-container-img-description">

                                            <div className='flex justify-center '>

                                                <div className='style-conatainer-product-img'>

                                                    <Image
                                                        isZoomed
                                                        isBlurred

                                                        src={item['img_product']}
                                                        alt="NextUI hero Image"
                                                        className='style-product-img-size'
                                                    />


                                                </div>
                                            </div>
                                            <div>
                                            <div className="style-title-name-product-tablet">
                                                <h3 className='text-white style-fs-name-product-tablet font-bold'>
                                                    {item.name_product}
                                                </h3>
                                            </div>

                                            <div className='text-white style-description-product mt-5 font-bold'>
                                                <div className="style-title-description-product">Description:</div>
                                                {item.description}
                                            </div>

                                            <div>

                                                <div className='mb-3 flex justify-between items-center style-price-btn-tablet'>
                                                    <h3 className='text-white font-bold style-fs-price-tablet'>
                                                        ${item.price}
                                                    </h3>
                                                    <Button className='style-btn-item-cart rounded-full text-white style-common-fs font-bold bg-transparent' onClick={() => { addProductToCart(item['id_product']) }}>
                                                        Add Cart
                                                    </Button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className='w-2/5 flex flex-col justify-between style-session-title-price-desktop'>


                                            <div>
                                                <span className='text-white style-title-products font-bold'>
                                                    ${item.price}
                                                </span>

                                                <div className='mt-10'>
                                                    <h3 className='text-white style-name-product font-bold'>
                                                        {item.name_product}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className='mb-3 flex justify-center'>
                                                <Button className='style-btn-item-cart rounded-full text-white style-common-fs font-bold bg-transparent' onClick={() => { addProductToCart(item['id_product']) }}>
                                                    Add Cart
                                                </Button>
                                            </div>
                                        </div>

                                    </div>

                                </SwiperSlide>
                            )
                        }

                    </Swiper>

                </div>
            </div>
        </>
    );
}

export default Main;