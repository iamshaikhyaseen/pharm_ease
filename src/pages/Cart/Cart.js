import React, { useContext,useState } from 'react';
import { CartContext } from './CartContext';
import { MedicalContext } from '../LoginPage/components/MedicalContext';
import './Cart.css';
import { toast, ToastContainer } from 'react-toastify';  // For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingCart } from 'react-icons/fa';
import Navbar from '../Home/components/MedicalMainNav'
import Footer from '../Home/components/Footer'
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import jsPDF from 'jspdf';  
import 'jspdf-autotable'; 
import emailjs from 'emailjs-com';
import api from '../../axiosConfig'

const Cart = () => {
  const {medicalData}=useContext(MedicalContext);
  const { cartItems,updateQuantity,calculateTotal,removeFromCart,clearCart} = useContext(CartContext);
  const navigate=useNavigate();
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [billCreated, setBillCreated] = useState(false);
  const [billData, setBillData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentError, setPaymentError] = useState(''); 

  const sendOrderMail=(toEmail,name)=>{
    const templateParams = {
      to_email: toEmail,
      to_name: name,
      message: `Dear ${name}, your order has been placed successfully.`,
      order_id:billData._id,
      
    };
    emailjs.send(
      'service_yvuwvqn',
      'template_eb26q9d',
      templateParams,
      'utLCHS91Mp0fQhpNZ'
    )
    .then(
      (result) => {
        console.log('Login Email sent:', result.text);
      },
      (error) => {
        console.error('Failed to send email:', error.text);
      }
    );
  };
  
  const handleQuantityChange = (product, quantity) => {
    if (quantity >= 1) {
      updateQuantity(product, quantity);
    }
  };

  const handlePaymentMethodChange = (e) => {
    console.log("Selected payment method:", e.target.value);
    setPaymentMethod(e.target.value); 
    setPaymentError(''); // Use the event value to set the payment method
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\D/g, '');  // Remove non-numeric characters
      if (formattedValue.length <= 16) {
        setCardDetails({ ...cardDetails, [name]: formattedValue });
      }
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  const validateCardDetails = () => {
    const newErrors = {};
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be MM/YY format';
    }
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = (bill) => {
    const doc = new jsPDF();
    
    console.log(bill);
    
    doc.text(`Bill No: ${bill._id}`, 10, 10);
    doc.text(`Date: ${bill.date}`, 10, 20);
    doc.text(`Due Date: ${bill.dueDate}`, 10, 30);
    doc.text(`Medical Name: ${bill.medicalName}`, 10, 40);
    doc.text(`Medical Address: ${bill.medicalAddress}`, 10, 50);
    doc.text(`Region: ${bill.medicalRegion}`, 10, 60);
    doc.text(`GSTIN: ${bill.gstin}`, 10, 70);
    doc.text(`DLNO: ${bill.dlno}`, 10, 80);
    
    doc.autoTable({
      startY: 90,
      head: [['Product Name', 'Batch No', 'HSN Code', 'Pack', 'Expiry', 'Quantity', 'MRP','Rate','Total Price']],
      body: bill.products.map(item => [
        item.name, item.batchNo, item.hsn, item.pack, item.expiry, item.quantity, `₹${item.mrp}`, `₹${item.rate}`,`₹${item.totalPrice}`
      ])
    });
    doc.text(`Grand Total: ₹${bill.grandTotal}`, 10, doc.previousAutoTable.finalY + 10);
    doc.save(`PharmEase${bill._id}.pdf`);

    
  };

  const handleProceed = () => {
    if (!paymentMethod) {
      setPaymentError('Please select a payment option');
      return;  // Stop the function if no payment option is selected
    }
    if (paymentMethod === 'Card' && !validateCardDetails()) {
      return;
    }
  const handleOrderSuccess = () => {
    toast.success("Order Placed Successfully!");
    clearCart();
    };

    const billDetails = {
      
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
      medicalId:medicalData._id,
      medicalName: medicalData.name,
      medicalAddress: medicalData.address,  // Replace with actual data
      medicalRegion: medicalData.region,
      gstin: medicalData.gstIn,
      dlno: medicalData.dlNo,
      products: cartItems.map(item => ({
        _id:item._id,
        name: item.name,
        batchNo: item.batchNo,
        hsn: item.hsn,
        pack: item.pack,
        expiry: item.expiry,
        quantity: item.quantity,
        mrp: item.mrp,
        rate: item.rate
      })),
    };
    console.log(billDetails);
    // Send bill details to the API
    api.post('/bills', billDetails)
      .then(response => {
        const data = response.data;
        setBillData(data);
        console.log("billData: "+data);
        setBillCreated(true);
        sendOrderMail(medicalData.email,medicalData.name);
        generatePDF(data);
        handleOrderSuccess();  // Generate PDF after the bill is created
      })
      .catch(error => console.error('Error creating bill:', error));
      toast.error("Failed to place Order!")
  };

  const showPaymentOptions = () => {
    setShowPaymentSection(true);  // Open payment section when Order Now is clicked
  };

  const handleProductClick = (e, product) => {
    e.stopPropagation();  // Prevent any event bubbling
    navigate(`/${product._id}`);  // Navigate to the ProductDetails page
  };

  const handleRemove = (product) => {
    removeFromCart(product);  // Call removeFromCart function from context
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();  // Prevent click propagation for quantity controls
  };
  

  if (cartItems.length === 0) {
    return <>
    <Navbar/>
    <div className="cart-container1">
      
      <FaShoppingCart size={45}/>
      <h1>Your Cart is Empty</h1>
      
      </div>
      <Footer/>
      </>
  }
  

  return (
    <>
    <Navbar/>

    <div className="cart-container">
      <ToastContainer position="bottom-right" autoClose={3000}/>
      <div className="cartLogo">
    <FaShoppingCart size={35} color="#2c3e50" />
      <h1>Your Cart</h1>
      </div>
      <div className="cart-items">

        {cartItems.map((item) => (

          <div className="cart-item" key={item._id} onClick={(e)=>handleProductClick(e,item)}>

            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">

              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <div className="cart-item-actions">

                <div className="quantity-control" onClick={handleStopPropagation}>

                  <button onClick={(e) =>{handleStopPropagation(e); handleQuantityChange(item, item.quantity - 1)}}>-</button>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) =>{handleStopPropagation(e); handleQuantityChange(item, Number(e.target.value))}} 
                    min="1"
                  />

                  <button onClick={(e) =>{handleStopPropagation(e); handleQuantityChange(item, item.quantity + 1)}}>+</button>

                  <button className="remove-button" onClick={(e) => {
                  e.stopPropagation();  // Prevent navigating to product details
                  handleRemove(item);   // Remove item from cart
                }}>
                  <AiOutlineDelete />
                </button>

                </div>

                <p className="cart-item-price">Price: ₹{item.rate * item.quantity}</p>

              </div>

            </div>

          </div>

        ))}

      </div>
      <div className="cart-total">
        <h3>Total: ₹{calculateTotal()}</h3>
      </div>
      <button className="btn-order-now" onClick={showPaymentOptions}>Order Now</button>
      {showPaymentSection && (
        <div className="payment-section">
          <h3>Payment Options</h3>
          <div className="payment-methods">
          <label htmlFor="cod-option" >
          Cash on Delivery
            <input
              name="paymentMethod"
                type="radio"
                id="cod-option"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={handlePaymentMethodChange}
              />
              
            </label>
            <label htmlFor="card-option">
              Card Payment
            <input
              name="paymentMethod"
                type="radio"
                id="card-option"
                value="Card"
                checked={paymentMethod === 'Card'}
                onChange={handlePaymentMethodChange}
              />
              
            </label>
          </div>
          {paymentError && <p className="error" style={{ color: 'red' }}>{paymentError}</p>}

          {paymentMethod === 'Card' && (
            <div className="card-details">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                maxLength={16}
              />
              {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                maxLength={5}
              />
              {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                maxLength={3}
              />
              {errors.cvv && <p className="error">{errors.cvv}</p>}
            </div>
          )}

          <button onClick={handleProceed} className="btn-proceed">
            Proceed
          </button>
        </div>
      )}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Order Placed Successfully!</h3>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Cart;
