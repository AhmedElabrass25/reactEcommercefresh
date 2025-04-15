import amazonPay from "../../assets/images/amazon-pay.png";
import mastercard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
//
import apple from "../../assets/images/get-apple-store.png";
import googlePlay from "../../assets/images/get-google-play.png";
const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <footer className="bg-light py-10 mt-10">
      <div className="container">
        <div className="head mb-5">
          <h1 className="text-2xl mb-1">Get The FreshCart App</h1>
          <p className="text-slate-600">
            We Will Send You a Link, Open it on Your Phone to download the app
          </p>
        </div>
        <form action="" onSubmit={handleSubmit} className="w-full mb-8">
          <div className="w-full flex items-center justify-between flex-wrap">
            <input
              type="email"
              placeholder="Email....."
              required
              className="px-4 py-2 rounded-lg w-full md:w-[70%] border border-slate-300 outline-none mb-3 md:mb-0"
            />
            <button
              type="submit"
              className="text-white md:w-[25%] capitalize bg-main hover:main focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 flex items-center justify-center"
            >
              share app link
            </button>
          </div>
        </form>
        <div className="row">
          <div className="paymentSide flex items-center gap-3 w-full lg:w-[48%] mb-3 lg:mb-0">
            <h2 className="text-xl md:block hidden capitalize">
              Payment partners
            </h2>
            <img src={amazonPay} className="w-16" alt="amazonPay" />
            <img src={mastercard} className="w-16" alt="mastercard" />
            <img src={paypal} className="w-16" alt="paypal" />
          </div>
          <div className="downloadSide flex items-center justify-end lg:justify-end gap-3 w-full lg:w-[48%]">
            <h2 className="text-xl md:block hidden capitalize">
              Get Deliveries with FreshCart
            </h2>
            <img src={apple} className="w-16" alt="apple" />
            <img src={googlePlay} className="w-16" alt="googlePlay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
