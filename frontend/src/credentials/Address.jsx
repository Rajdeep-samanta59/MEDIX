import {
  getAccordionDetailsUtilityClass,
  getCardHeaderUtilityClass,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Address.css";

// import { findOneAndDelete } from "../../../Backend/models/medicine";

export default function Address() {
  let loc = useLocation();
  // uselocation hook is used to access the location object which contains information about the current URL and its state.
  let nav = useNavigate();
  // usenavigate hook is used to programmatically navigate to different routes in the application.
  // console.log(l)
  let [idAd, setIdAd] = useState("");
  // idAd is used to store the selected address ID from the list of addresses.
  // setIdAd is a function that updates the value of idAd when a new address is selected.
  let [total, setTotal] = useState();
  // total is used to store the total amount to be paid for the order.
  // setTotal is a function that updates the value of total when the order amount changes.

  let [det, setDet] = useState([]);
  // det is an array that stores boolean values indicating whether each field in the address form is valid or not.
  // setDet is a function that updates the value of det when the user interacts with the form.

  // add is an object that stores the values of the address 
  // add → This is a variable (object) that stores the new address you're typing into a form.setAdd → Function used to update the add object as the user types
  let [add, setAdd] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  let [login, setLogin] = useState({});
  // login is an object that stores the user details after fetching them from the server.
  // setLogin is a function that updates the value of login when the user logs in or registers.
  let [addresses, setAddressses] = useState([]);
  // addresses is an array that stores the list of addresses associated with the user.
  // setAddressses is a function that updates the value of addresses when the user adds or deletes an address.
  let order = {};
  // order is an object that stores the order details after fetching them from the server.

  function chgAdd(e) {
    //    console.log(e.target.value);
    setIdAd(e.target.value);
  }
  // chgAdd is a function that updates the value of idAd when the user selects a different address from the list.
  // It is called when the user clicks on a radio button to select an address.

// RELLOAD HOLE THEN  RUN HOGA
  useEffect(() => {
    // useEffect is a React hook that allows you to perform side effects in function components.
    // It runs once only after the component mounts and whenever the dependencies change.
    let token = localStorage.getItem("token");
    // It fetches the token stored in the user's browser (used for authentication)   This token tells the server: “Hey, this is me, I’m logged in.”.

    setTotal(loc.state + loc.state * 0.25);
    // setTotal is called to calculate the total amount to be paid for the order.

    // getAdd is an asynchronous function that fetches the user details and addresses from the server.
    async function getAdd() {

      const resp = await axios.post("http://localhost:8080/getUser", {
        token: token,
      });
      // resp is an object that stores the response from the server after sending the token.
      // It contains the user details and addresses associated with the token.
      // The function checks if the response indicates that no details were found.

      // If no details were found, the user is redirected to the login page.
      if (resp.data.details == "nf") {
        return nav("/");
      }

      // Otherwise, the user details and addresses are stored in the state variables.
      setLogin(resp.data.details);
      // setLogin is called to update the user details in the state.

      console.log(resp.data.details);
      let cred = resp.data.details;
      // cred is an object that stores the user details after fetching them from the server.
      await axios
        .get(`http://localhost:8080/getUserAdd/${cred._id}`)

        .then((res) => {
          // console.log(res.data.add);
          setAddressses(res.data.add);
        })
        // res is an object that stores the response from the server after fetching the addresses.
        // It contains the list of addresses associated with the user.
        .catch((err) => {
          console.log(err.message);
        });
    }

    getAdd();
    // console.log(total);
    // getAdd is called to fetch the user details and addresses from the server.
    // It is called only once when the component mounts.
  }, []);
  //

  // pay is an asynchronous function that handles the payment process using Razorpay.
  // It is called when the user clicks the "Pay" button.
  async function pay(p) {
    console.log(p);
    let res = await axios.get("http://localhost:8080/getKey");
    // res is an object that stores the response from the server after fetching the Razorpay key.
    // It contains the key ID required for initiating the payment.

    let key = res.data.key;
    // key is a string that stores the Razorpay key ID.
    // It is used to authenticate the payment request.
    const amountInPaise = Math.round(p * 100);
    // amountInPaise is a number that stores the total amount to be paid in paise.
    console.log(key);

    await axios
      .post("http://localhost:8080/order", {
        currency: "INR",
        amount: amountInPaise,
      })
      // axios is a library used to make HTTP requests from the client-side.
      // It is used to send a POST request to the server to create a new order.
      .then((res) => {
        order = res.data.order;
        // console.log(order,"df");
      });

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: amountInPaise, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image:
        "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=600",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: `http://localhost:8080/paymentVerification`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: login.username, //your customer's name
        email: login.email,
        // contact: //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      handler: function (response) {
        handlePaymentSuccess(response);
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

    const handlePaymentSuccess = async (response) => {
      let resp = await axios.get(`http://localhost:8080/getAddress`, {
        params: { id: idAd },
      });

      let Order = await axios.get(`http://localhost:8080/getOrder`, {
        params: { mail: login.email },
      });

      let { product } = Order.data.order;

      let order = [];

      product.forEach((e) => {
        let obj = { prod: e.prod, qty: e.qty };
        order.push(obj);
      });

      // console.log(order);

      let { finAdd } = resp.data;
      console.log(finAdd);

      const paymentData = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        user_id: login._id,
        product: order,
        status: "success",
        amount: total,
        currency: "INR",
        payment_method: "card",
        name: finAdd.name,

        address:
          finAdd.street +
          ", " +
          finAdd.city +
          ", " +
          finAdd.state +
          ", " +
          finAdd.postalCode +
          ", " +
          finAdd.country,
        mobile: finAdd.phone,
      };

      console.log(paymentData);

      try {
        const res = await axios.post(
          "http://localhost:8080/paymentVerification",
          paymentData
        );
        if (res.data.mess == "okk") {
          nav("/");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };
  }

  function doc(e) {
    setAdd({ ...add, [e.target.name]: e.target.value });
  }

  //sub is a function that handles the submission of the address form.
  // It is called when the user clicks the "Add Address" button.
  async function sub(e) {
    let take = false;
    let arr = [false, false, false, false, false, false, false];
    e.preventDefault();

    if (add.name.length == 0) {
      arr[0] = true;
    }
    if (add.street.length == 0) {
      arr[1] = true;
    }
    if (add.city.length == 0) {
      arr[2] = true;
    }
    if (add.state.length == 0) {
      arr[3] = true;
    }
    if (add.postalCode.length == 0) {
      arr[4] = true;
    }
    if (add.country.length == 0) {
      arr[5] = true;
    }
    if (add.phone.length == 0) {
      arr[6] = true;
    }

    console.log(arr);

    for (let i of arr) {
      if (i == true) {
        take = true;
        break;
      }
    }

    setDet(arr);
    if (!take) {
      await axios
        .post("http://localhost:8080/saveAdd", { add, login })
        .then((res) => {
          console.log(res.data);
          setAddressses([...addresses, add]);
          setAdd({
            name: "",
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phone: "",
          });

          console.log("yes");
        })
        .catch((err) => {
          console.log(arr);
        });

      await axios
        .get(`http://localhost:8080/getUserAdd/${login._id}`)
        .then((res) => {
          // console.log(res.data.add);
          console.log("yes");
          setAddressses(res.data.add);
          console.log(res.data.add);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  return (
    <>
      <div>
        <div className="detAdd">
          {addresses.map((e) => {
            return (
              <div className="addresses">
                <input
                  onChange={chgAdd}
                  type="radio"
                  class="add1"
                  name="add"
                  id={e._id}
                  value={e._id}
                ></input>

                <label className="add2" htmlFor={e._id}>
                  <div className="dt1">
                    <p>{e.name}</p>
                    <p>{e.phone}</p>
                  </div>
                  <div className="dt1">
                    <p>{e.street}</p>
                  </div>
                  <div className="dt1">
                    <p>{e.state}</p>
                    <p>{e.postalCode}</p>
                    <p>{e.country}</p>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mt-3 ">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2>Add new Shipping Address</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  style={{ border: det[0] ? "1.5px solid red" : null }}
                  className="form-control"
                  id="name"
                  onChange={doc}
                  value={add.name}
                  name="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="street" className="form-label">
                  Street
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  style={{ border: det[1] ? "1.5px solid red" : null }}
                  onChange={doc}
                  value={add.street}
                  name="street"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ border: det[2] ? "1.5px solid red" : null }}
                  id="city"
                  onChange={doc}
                  value={add.city}
                  name="city"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ border: det[3] ? "1.5px solid red" : null }}
                  id="state"
                  onChange={doc}
                  value={add.state}
                  name="state"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  style={{ border: det[4] ? "1.5px solid red" : null }}
                  onChange={doc}
                  value={add.postalCode}
                  name="postalCode"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ border: det[5] ? "1.5px solid red" : null }}
                  id="country"
                  onChange={doc}
                  value={add.country}
                  name="country"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  style={{ border: det[6] ? "1.5px solid red" : null }}
                  id="phone"
                  onChange={doc}
                  value={add.phone}
                  name="phone"
                  required
                />
              </div>
              <button onClick={sub} className="btn btn-primary">
                Add Address{" "}
              </button>
            </form>
          </div>
        </div>

        <div className="btcntr">
          <Button
            className="payBtn"
            disabled={idAd.length == 0 ? true : false}
            onClick={() => {
              pay(total);
            }}
            id="crt"
            variant="contained"
            color="primary"
          >
            Pay &nbsp;&nbsp;&nbsp; &#8377;{total}
          </Button>
        </div>
      </div>
    </>
  );
}
