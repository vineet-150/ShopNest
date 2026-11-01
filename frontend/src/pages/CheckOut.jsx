
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [isPaying, setIsPaying] = useState(false);

  // Razorpay configuration
  const razorpayEnabled =
    import.meta.env.VITE_ENABLE_RAZORPAY === 'true' &&
    Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID);

  // Calculate total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Common validation
  const validateCheckout = () => {
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return false;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      navigate('/cart');
      return false;
    }

    if (
      Object.values(address).some(
        (value) => !value.trim()
      )
    ) {
      alert('Please complete your shipping address');
      return false;
    }

    return true;
  };

  // Common order saving function
  const saveOrder = async (paymentId, paymentMethod) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          product: item.productId,
          qty: item.qty,
          price: item.price
        })),
        totalAmount: totalPrice,
        address,
        paymentId,
        paymentMethod
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message || 'Order saving failed'
      );
    }

    // Clear cart only after successful order creation
    dispatch(clearCart());

    // Navigate to success page
    navigate('/ordersuccess');
  };

  // =====================================
  // 1. RAZORPAY PAYMENT
  // =====================================

  const handlePayment = async () => {

    // Prevent multiple clicks
    if (isPaying) return;

    // Check Razorpay configuration FIRST
    if (!razorpayEnabled) {
      alert(
        'Razorpay is not enabled. Please go with Student Payment.'
      );
      return;
    }

    if (!validateCheckout()) return;

    if (!window.Razorpay) {
      alert(
        'Razorpay SDK could not load. Please try again.'
      );
      return;
    }

    setIsPaying(true);

    try {
      // Create Razorpay order
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          amount: totalPrice
        })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(
          orderData.message || 'Payment initialization failed'
        );
      }

      // Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'ShopNest Order Payment',
        order_id: orderData.id,

        // Payment success
        handler: async (response) => {
          try {
            // Verify payment
            const verifyRes = await fetch(
              '/api/payment/verify',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(response)
              }
            );

            const verifyData = await verifyRes.json()
              .catch(() => ({}));

            if (!verifyRes.ok) {
              throw new Error(
                verifyData.message ||
                'Payment verification failed'
              );
            }

            // Save order after successful verification
            await saveOrder(
              response.razorpay_payment_id,
              'RAZORPAY'
            );

          } catch (error) {
            console.error(error);
            alert(error.message);
          } finally {
            setIsPaying(false);
          }
        },

        prefill: {
          name: address.fullName,
          email: user.email || '',
          contact: ''
        },

        theme: {
          color: '#f97316'
        },

        modal: {
          ondismiss: () => {
            setIsPaying(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', (response) => {
        alert(
          response.error?.description ||
          'Payment failed. Please try again.'
        );

        setIsPaying(false);
      });

      razorpay.open();

    } catch (error) {
      console.error('Razorpay error:', error);

      alert(error.message || 'Unable to start payment');

      setIsPaying(false);
    }
  };

  // =====================================
  // 2. STUDENT PAYMENT BYPASS
  // =====================================

  const handleBypassPayment = async () => {

    // Prevent multiple clicks
    if (isPaying) return;

    if (!validateCheckout()) return;

    setIsPaying(true);

    try {
      const testPaymentId =
        `STUDENT_BYPASS_${Date.now()}`;

      // Save order without online payment
      await saveOrder(
        testPaymentId,
        'STUDENT_BYPASS'
      );

    } catch (error) {
      console.error('Student payment error:', error);

      alert(
        error.message ||
        'Unable to place student order'
      );

    } finally {
      setIsPaying(false);
    }
  };

  // =====================================
  // 3. UI
  // =====================================

  return (
    <div className="checkout-container">

      <h2>Checkout</h2>

      <div className="checkout-content">

        <form
          className="shipping-form"
          onSubmit={(e) => e.preventDefault()}
        >

          <h3>Shipping Address</h3>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            disabled={isPaying}
            onChange={(e) =>
              setAddress({
                ...address,
                fullName: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            disabled={isPaying}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            disabled={isPaying}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            disabled={isPaying}
            onChange={(e) =>
              setAddress({
                ...address,
                postalCode: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            disabled={isPaying}
            onChange={(e) =>
              setAddress({
                ...address,
                country: e.target.value
              })
            }
          />

          {/* Checkout Summary */}

          <div className="checkout-summary">

            <h3>
              Total Amount: ₹{totalPrice.toFixed(2)}
            </h3>

            {/* Razorpay Button */}

            <button
              type="button"
              className="btn"
              disabled={isPaying}
              onClick={handlePayment}
            >
              Continue with Razorpay
            </button>

            

            {/* Student Payment Button */}

            <button
              type="button"
              className="btn"
              disabled={isPaying}
              onClick={handleBypassPayment}
              style={{
                marginTop: '12px',
                backgroundColor: '#52525b',
                color: '#fff',
                marginLeft:"10px"
              }}
            >
              {isPaying
                ? 'Processing...'
                : 'Student Payment'}
            </button>

            {!razorpayEnabled && (
              <p style={{
                color: '#d97706',
                marginTop: '12px'
              }}>
                Razorpay is not enabled.
                Please use Student Payment.
              </p>
            )}

            <p style={{
              fontSize: '13px',
              color: '#777',
              marginTop: '10px'
            }}>
              Choose your preferred payment method.
            </p>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Checkout;
