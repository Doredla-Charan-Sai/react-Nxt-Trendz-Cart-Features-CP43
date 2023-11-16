import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = uniqueId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem =>
        eachCartItem.id === uniqueId
          ? {...eachCartItem, quantity: eachCartItem.quantity + 1}
          : eachCartItem,
      ),
    }))
  }

  decrementCartItemQuantity = uniqueId => {
    const {cartList} = this.state
    const getItem = cartList.find(object => object.id === uniqueId)
    if (getItem.quantity === 1) {
      this.removeCartItem(getItem.id)
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem =>
          eachCartItem.id === uniqueId
            ? {
                ...eachCartItem,
                quantity: eachCartItem.quantity - 1,
              }
            : eachCartItem,
        ),
      }))
    }
  }

  removeCartItem = uniqueId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== uniqueId),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state
    const getExistingItem = cartList.find(each => each.id === product.id)
    console.log(getExistingItem)
    if (getExistingItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => ({
          ...eachCartItem,
          quantity: eachCartItem.quantity + product.quantity,
        })),
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
