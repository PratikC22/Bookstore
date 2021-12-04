import React, { useState, useEffect } from 'react';
import { placeOrder, removeItemFromCart } from '../../service/DataService';
import './Order_style.scss';
import { useHistory } from 'react-router';

const Order = (props) => {
	const { cart } = props;
	const [totalprice, setTotalprice] = useState(0);
	const history = useHistory();

	// Method to handle place order
	const handlePlaceOrder = () => {
		let cartItems = cart.map((book) => {
			return {
				product_id: book._id,
				product_name: book.product_id.bookName,
				product_quantity: `${book.quantityToBuy}`,
				product_price: `${book.product_id.price}`,
			};
		});

		let order = {
			orders: cartItems,
		};

		placeOrder(order)
			.then(() => {
				clearCart();
				history.push('/order-placed');
			})
			.catch((err) => console.log(err));

		// console.log(cartItems);
	};

	// Method to clear cart once order is placed
	const clearCart = () => {
		cart.forEach((book) => {
			removeItemFromCart(book._id)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		});
	};

	useEffect(() => {
		const calculateTotal = () => {
			let total = 0;
			cart.forEach((element) => {
				total += element.product_id.discountPrice * element.quantityToBuy;
			});
			setTotalprice(total);
		};
		calculateTotal();
	}, [cart]);

	return (
		<div className='orderOuterContainer'>
			<div className='orderBookItem1'>
				<div className='orderBookItem1Text'>Order Summary</div>
			</div>
			<div>
				{cart.map((book) => (
					<div key={book.product_id.bookName} className='orderBookContainer'>
						<div className='orderBookImageContainer'>
							<div className='orderBookImage'></div>
						</div>
						<div className='orderBookInfoContainer'>
							<div className='orderBookName'> {book.product_id.bookName} </div>
							<div className='orderBookAuthor'>by {book.product_id.author}</div>
							<div className='orderBookPrice'>
								<div className='orderBookNewPrice'>
									Rs. {book.product_id.discountPrice}
								</div>
								<div className='orderBookOldPrice'>
									Rs. {book.product_id.price}
								</div>
							</div>
							<div className='orderBookQuantity'>
								Quantity : {book.quantityToBuy}
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='checkoutBtnContainer'>
				<div className='orderBookName'>Total Price : Rs. {totalprice}</div>
				<button onClick={handlePlaceOrder}>CHECKOUT</button>
			</div>
		</div>
	);
};

export default Order;
