import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserContext, DispatchContext } from '../contexts/contexts'
import { URL } from '../../url'
import axios from 'axios'
import '../../public/css/product.css'

const Product = () => {
    const userstate = useContext(UserContext)
    const dispatch = useContext(DispatchContext)
    const { _id, name, category, seller, price, image, description } = userstate.current_product
    const [categoryProducts, setCategoryProducts] = useState([])
    const [sellerProducts, setSellerProducts] = useState([])
    const [reverse, setReverse] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)


    const shuffleArray = (array) => {
        const new_array = [...array].sort(() => Math.random() - 0.5)
        if(reverse) new_array.reverse()
        setReverse(!reverse)
        return new_array
    }

    useEffect( () => {
        setLoading1(true)
        setLoading2(true)

        axios
            .post( URL + "/graphql", {query : `
            {
                products_by_category(category: "${category}") {
                    _id,
                    name,
                    category,
                    price,
                    quantity,
                    image,
                    description,
                    seller {
                        name,
                        products {
                            _id,
                            name,
                            image,
                            price
                        }
                    }
                }
            }`})
            .then((res) => {
                setLoading1(false)
                const temp_array = shuffleArray(res.data.data.products_by_category)
                temp_array.length = 3
                setCategoryProducts(temp_array)
            })
            .catch( err => console.log(err))

        axios
            .post( URL + "/graphql", {query : `
            {
                seller(name: "${seller.name}") {
                    name,
                    products {
                        _id,
                        name,
                        category,
                        price,
                        quantity,
                        image,
                        description,
                        seller {
                            name
                        }
                    }
                }
            }`})
            .then((res) => {
                setLoading2(false)
                const temp_array = shuffleArray(res.data.data.seller.products)
                temp_array.length = 3
                setSellerProducts(temp_array)
            })
            .catch( err => console.log(err) )
    },[_id])

    const addToCart = ( e, _id, name, seller, price, image ) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch({type: 'add_to_cart', payload: { _id, name, seller, price, image } })
    }

    return(
        <>
            <section className="product_info">
                <section className="name_img_desc">
                    <h1 className="product_name_h1">
                        {name}
                    </h1>
                    <section className="product_img">
                        <img src={`/images/${image}`} className="product_image"/>  
                    </section>
                    <section className="product_description">
                        Beskrivning: {description}
                    </section>
                </section>
                <section className="price_add_seller">
                    <div className="product_preview_price">
                        <div>
                            {price}<span className="currency">kr</span>
                        </div>
                        <div className="buy_button" onClick={ (e) => addToCart(e, _id, name, seller, price, image) }>
                            köp
                        </div>
                    </div>
                    <section className="product_seller">
                        {seller.name}
                    </section>
                </section>
                <section className="related">
                    <h4 className="related_h4">--- relaterade produkter ---</h4>
                    { loading2 && <section>Loading...</section>} 
                      {
                          categoryProducts.map( product => {
                              return (
                                <Link
                                    to={`/products/${product._id}`}
                                    key={product._id} 
                                    onClick={ () => dispatch({type: 'current_product', payload: product}) } >
                                    <div className="product_preview">
                                        <h3 className="product_preview_h3">{product.name}</h3>
                                        <img src={`/images/${product.image}`} className="product_preview_image" />
                                        <div className="product_preview_price">
                                            <div>
                                                {product.price}<span className="currency">kr</span>
                                            </div>
                                            <div className="buy_button" onClick={ (e) => addToCart(e, product._id, product.name, product.seller, product.price, product.image) }>
                                                köp
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                              )
                          } )
                      }                
                </section>
            </section>
            <section className="sellers_section">
                <h4 className="sellers_h4">FLER PRODUKTER FRÅN {seller.name}:</h4>
                <section className="sellers_products">
                { loading1 && <section>Loading...</section>} 
                {
                    sellerProducts.map( product => {
                        return (
                            <Link
                                to={`/products/${product._id}`}
                                key={product._id} 
                                onClick={ () => dispatch({type: 'current_product', payload: product}) } >
                                <div className="product_preview">
                                    <h3 className="product_preview_h3">{product.name}</h3>
                                    <img src={`/images/${product.image}`} className="product_preview_image" />
                                    <div className="product_preview_price">
                                        <div>
                                            {product.price}<span className="currency">kr</span>
                                        </div>
                                        <div className="buy_button" onClick={ (e) => addToCart(e, product._id, product.name, product.seller, product.price, product.image) }>
                                            köp
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    } )
                }
                </section>
            </section>
        </>
    )
}

export default Product