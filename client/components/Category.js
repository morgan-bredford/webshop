import React, { useContext, useEffect, useState } from 'react';
import { UserContext, DispatchContext } from '../contexts/contexts'
import { Link } from 'react-router-dom'
import { URL } from '../../url'
import axios from 'axios'

const Category = () => {
    const dispatch = useContext(DispatchContext)
    const { current_category } = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        setLoading(true)

        axios
            .post( URL + "/graphql", {query : `
            {
                products_by_category(category: "${current_category}") {
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
                setLoading(false)
                setProducts(res.data.data.products_by_category)
            })    
    },[current_category])

    const addToCart = ( e, _id, name, seller, price, image ) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch({type: 'add_to_cart', payload: { _id, name, seller, price, image } })
    }

    return(
        <>
            <h2 className="h2_categories">{current_category}</h2>
            <section className="category_main">
            { loading && <section>Loading...</section>} 
                {
                    products.map( product => {
                        const { _id, name, seller, price, image } = product
                        return (
                            <Link
                                to={`/products/${_id}`}
                                key={_id} 
                                onClick={ () => dispatch({type: 'current_product', payload: product}) } >
                                <div className="product_preview">
                                    <h3 className="product_preview_h3">{name}</h3>
                                    <img src={`/images/${image}`} className="product_preview_image" />
                                    <div className="product_preview_price">
                                        <div>
                                            {price}<span className="currency">kr</span>
                                        </div>
                                        <div className="buy_button" onClick={ (e) => addToCart(e, _id, name, seller, price, image) }>
                                            köp
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    } )
                }
            </section>
        </>
    )
}

export default Category