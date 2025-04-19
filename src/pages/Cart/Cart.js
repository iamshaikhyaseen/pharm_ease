import React, { useContext,useState,useEffect } from 'react';
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
  const [showAddressForm,setShowAddressForm]=useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [medicalDetails,setMedicaldetails]=useState({});
  useEffect(() => {
    if (medicalData) {
      setMedicaldetails(medicalData);
    }
  }, [medicalData]);
  const [billCreated, setBillCreated] = useState(false);
  const [billData, setBillData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentError, setPaymentError] = useState(''); 

  const sendOrderMail=(toEmail,name,billId)=>{
    if (!billId) {
      console.error("Error: Bill ID is null, skipping email.");
      return;
    }
    const templateParams = {
      to_email: toEmail,
      to_name: name,
      message: `Dear ${name}, your order has been placed successfully.`,
      order_id:billId,
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
    const paymentMethod=e.target.value;
    console.log("Selected payment method:", e.target.value);
    setPaymentMethod(paymentMethod);
    if (paymentMethod === 'COD') {
      setShowAddressForm(true); 
    } else {
      setShowAddressForm(false); 
    }
    setPaymentError(''); 
  };

  const handleAddressChange=(e)=>{
    setMedicaldetails({
      ...medicalDetails,[e.target.name]:e.target.value,
    });
  };

  const handleRegionChange=(e)=>{
    setMedicaldetails({
      ...medicalDetails,[e.target.name]:e.target.value,
    });
  };

  const confirmAddress=async()=>{
    try{
      await api.put(`/medicals/${medicalDetails._id}`,medicalDetails);
      toast.success("Address confirmed");
    }catch(error){
      console.log("Error updating address: "+error);
      toast.error("Failed to confirm address");
    };
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
    }else {
      // Check if the card is expired
      const [expMonth, expYear] = cardDetails.expiryDate.split('/').map(Number);
      
      const currentYear = new Date().getFullYear() % 100; // Get last two digits of the year
      const currentMonth = new Date().getMonth() + 1; // Months are 0-based
  
      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        newErrors.expiryDate = 'Card is expired';
      }
    }

    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = (bill) => {
    const doc = new jsPDF();
    
    console.log("Bill: "+bill);
    
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
        item.name, item.batchNo, item.hsn, item.pack, item.expiry, item.quantity, item.mrp, item.rate,item.totalPrice
      ])
    });
    doc.text(`Grand Total: ${bill.grandTotal}`, 10, doc.previousAutoTable.finalY + 10);
    doc.save(`PharmEase${bill._id}.pdf`);

    
  };

  const handleProceed = async () => {
    if (!paymentMethod) {
      setPaymentError('Please select a payment option');
      return;  // Stop the function if no payment option is selected
    }
    if (paymentMethod === 'Card' && !validateCardDetails()) {
      return;
    }
  const handleOrderSuccess =async () => {
    toast.success("Order Placed Successfully!");
    clearCart();
    };

    const salesData = {
      date: new Date().toISOString(),
      medicalId: medicalData._id,
      medicalName: medicalData.name,
      region: medicalData.region,
      totalAmount: calculateTotal(),
      products: cartItems.map(item => ({
        productId: item._id,
        productName: item.name,
        quantity: item.quantity,
        price: item.rate
      }))
    };

    const billDetails = {
      medicalId:medicalData?._id,
      medicalName: medicalData?.name,
      medicalAddress: medicalData?.address,
      medicalRegion: medicalData?.region,
      gstin: medicalData?.gstin,
      dlno: medicalData?.dlNo,
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
    console.log("Bill details: "+billDetails);

    api.post('/sales', salesData)
    .then(response => {
      console.log('Sales data saved:', response.data);
      toast.success('Order Placed & Sales Updated');
    })
    .catch(error => {
      console.error('Error saving sales data:', error);
      toast.error('Failed to record sales data');

    });
   try{ 
   const response= await api.post('/bills', billDetails);
   const createdBill=response.data;
        if(createdBill){
        console.log("Response Data: "+response.data);
        console.log("Bill Data: "+billData);
        setBillCreated(true);
        setBillData(response.data);
        sendOrderMail(medicalData.email,medicalData.name,createdBill._id);
        generatePDF(response.data);
        handleOrderSuccess(); 
        }
   }  
      catch(error){console.error('Error creating bill:', error);
      toast.error("Failed to place Order!")
      }
  };

  const showPaymentOptions = () => {
    setShowPaymentSection(true);  // Open payment section when Order Now is clicked
  };

  const handleProductClick = (e, product) => {
    e.stopPropagation();  // Prevent any event bubbling
    navigate(`/${product._id}`);  
  };

  const handleRemove = (product) => {
    removeFromCart(product);  
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

        {showAddressForm && (
              <div className="address-confirmation">
                <h4>Confirm Address</h4>
                <p>Please confirm or update your delivery address.</p>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <textarea
                    name="address"
                    id="address"
                    value={medicalDetails.address || ''}
                    onChange={handleAddressChange}
                    className="form-control"
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="region">Region:</label>
                  <input
                    type="text"
                    name="region"
                    id="region"
                    value={medicalDetails.region || ''}
                    onChange={handleRegionChange}
                    className="form-control"
                    required
                  />
                </div>
                <button className="btn btn-primary" onClick={confirmAddress}>
                  Confirm Address
                </button>
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
