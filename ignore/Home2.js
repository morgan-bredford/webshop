import React, { useContext, useEffect, useState } from 'react';
import { UserContext, DispatchContext } from '../contexts/contexts'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Home2 = () => {
    const dispatch = useContext(DispatchContext)
    const userstate = useContext(UserContext)
    const [products, setProducts] = useState([])
    const history = useHistory()
    const [reverse, setReverse] = useState(true)

    const shuffleArray = (array) => {
        const new_array = [...array].sort(() => Math.random() - 0.5)
        if(reverse) new_array.reverse()
        setReverse(!reverse)
        return new_array
    }

    useEffect( () => {
        axios
            .post("http://127.0.0.1:5000/graphql", {query : `
            {
                products 
                    {
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
            }`})
            .then((res) => { 
                const temp_array = shuffleArray(res.data.data.products)
                temp_array.length = 5
                setProducts(temp_array)
            })
    },[])

    const showUser = () => {
        console.log(JSON.parse(localStorage.getItem('user')))
    }

    const getProducts = () => {
        axios
            .post("http://127.0.0.1:5000/db/getproducts", {})
            .then((res) => { 
                setProducts(res.data)
                console.log(products)
            })
    }

    const getCart = () => {
        const cart = JSON.parse(localStorage.getItem('user')).cart
        console.log(cart)
        axios
            .post("http://127.0.0.1:5000/db/getcart", cart)
            .then((res) => { 
                console.log(res.data)
            })
    }

    const getAllProducts = () => {
        axios
            .post("http://127.0.0.1:5000/graphql", {query : `
            {
                products 
                    {
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
            }`})
            .then((res) => { 
                setProducts(res.data.data.products)
            })
    }

    const forw = () => {
        let t_a = products
        const p = t_a.shift()
        t_a.push(p)
        setProducts(t_a)
    }

    return(
        <>
            Welcome
            <button onClick={getAllProducts}>gra</button>
            <button onClick={showUser}>user</button>
            <button onClick={getProducts}>products</button>
            <button onClick={getCart}>cart</button>
            <button onClick={() => console.log(products)}>klick</button>
            <button onClick={() => history.push('/search')}>klick2</button>
            <section style={{display: 'flex'}}>
                <span>back</span>
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
                    })
                }
                <span onClick={forw}>forw</span>
            </section>
            {/* { products && products.map( (prod) => {
                return (
                    <div key={prod._id}>
                        <Link onClick={ () => dispatch({type: 'current_product', payload: prod}) } to={`/products/${prod._id}`}>
                            {prod.name}
                        </Link>, {prod.category}, {prod.price}
                        <button 
                            onClick={ () => {
                                setProduct({...prod})
                                setShowModal(true)
                            }
                            }>uppdatera</button>
                        <button onClick={ () => removeProduct(prod._id)}>ta bort</button>
                    </div>
                )
            })
            } */}
        </>
    )
}

export default Home2