import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const onRemoveAll = () => {
        removeAllCartItems()
      }
      const amount =
        cartList.length !== 0
          ? cartList.map(each => each.price * each.quantity)
          : null

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <div className="head-remove">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    className="remove-all-btn"
                    type="button"
                    onClick={onRemoveAll}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="cart-summary">
                  <h1 className="total">
                    Order Total:{' '}
                    <span className="amount">
                      Rs. {amount.reduce((a, c) => a + c)}
                    </span>
                  </h1>
                  <p className="items-count">{cartList.length} items in cart</p>
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
