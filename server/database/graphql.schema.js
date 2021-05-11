import Product from './product.model'
import Seller from './seller.model'
import { validateTokenGraphql, createToken } from '../utils/jwt'
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql'

const onlyLetters = new RegExp(/^[a-zA-Z-åäöÅÄÖ\@\. ]+$/)

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        image: { type: GraphQLString },
        price: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        description: { type: GraphQLString },
        seller: {
            type: SellerType,
            resolve(parent, args){
                return Seller.findOne({name: parent.seller})
            }
        }
    })
})

const SellerType = new GraphQLObjectType({
    name: 'Seller',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({ seller: parent.name })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        product: {
            type: ProductType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args){
                return Product.findById(args._id)
            }
        },
        products : {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({})
            }    
        },
        products_search : {
            type: new GraphQLList(ProductType),
            args: { name: { type: GraphQLString } },
            resolve(parent, args){
                let regex
                if(onlyLetters.test(args.name)){
                    regex = new RegExp(args.name, 'i')
                }else{
                    regex = ''
                }
                return Product.find({name: regex})
            }    
        },
        products_by_category : {
            type: new GraphQLList(ProductType),
            args: { category: { type: GraphQLString } },
            resolve(parent, args){
                return Product.find({category: args.category})
            }    
        },
        seller: {
            type: SellerType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args){
                return Seller.findOne({name: args.name})
            }
        },
        sellers: {
            type: new GraphQLList(SellerType),
            resolve(parent, args){
                return Seller.find({})
            }    
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSeller: {
            type: SellerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let seller = new Seller({
                    name: args.name
                });
                return seller.save();
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) },
                seller: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                jwtToken: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                if(validateTokenGraphql(args.jwtToken)){
                    let product = new Product({
                        name: args.name,
                        category: args.category,
                        seller: args.seller,
                        price: args.price,
                        quantity: args.quantity,
                        image: args.image,
                        description: args.description
                    });
                    return product.save();

                }else{
                    return "jwt error"
                }
            }
        }
    }
})


export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
