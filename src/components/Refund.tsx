import Navbar from './Navbar';
import Footer from './Footer';
import Categories from './Categories';
import '../assets/css/Shipping.css'
import { useAppSelector } from './hooks/useLogin';
export default function Refund() {
  const { email } = useAppSelector((state) => state.auth);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Navbar
        isLoggedIn={!!email}

        userHomeLink="/user-home"
      />
      </div>
      <br />

      <Categories />
      <br></br>
      <div className="container2 py-4" style={{ backgroundColor: 'rgb(242, 238, 232)' }}>

        <h2 className="my-4">REFUND & RETURN POLICY</h2>
        <br></br>
        <br></br>

        <p className="text-justify">
          At Interio, we are committed to ensuring your satisfaction with every purchase. If for any reason you are not satisfied with your purchase, our Return & Refund Policy is here to assist you.</p>
        <h5>Return Eligibility:</h5>
        <ul>
          <li>Timeframe: You can return a product within 7 days of receiving it.</li>
          <li>Condition: The product must be unused, in its original packaging, and in the same condition as when you received it.
          </li>
          <li>Non-returnable Items: Custom-made products, perishable goods, and personal care items cannot be returned.
          </li>


        </ul>

        <h5>How to Return:</h5>
        <ul>
          <li>Log in to your Interio account and go to your order history.
          </li>
          <li>Select the order you wish to return and click on the “Return Item” button.
          </li>
          <li>Follow the instructions provided to complete the return process.

          </li>


        </ul>

        <h5>Refund Process:
        </h5>
        <ul>
          <li>Refund Timeframe: Once your return is received and inspected, we will process your refund within 7-10 business days.

          </li>
          <li>Payment Method: Refunds will be issued to the original payment method used during purchase.

          </li>
          <li>Shipping Costs: Original shipping fees are non-refundable. If the return is due to a defective product or an error on our part, we will cover the return shipping costs.


          </li>


        </ul>

        <p className="text-justify">
          <b>Contact Us:</b> For any questions or assistance, please contact our customer service team at contact@interiobd.com or call us at +8801896057824.


        </p>

        <p>ইনটেরিওতে, আমরা প্রতিটি কেনাকাটায় আপনার সন্তুষ্টি নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। যদি কোনো কারণে আপনি আপনার কেনাকাটায় সন্তুষ্ট না হন, আমাদের রিটার্ন ও রিফান্ড পলিসি আপনাকে সহায়তা করার জন্য এখানে রয়েছে।

        </p>
        <h5>ফিরিয়ে দেওয়ার যোগ্যতা:</h5>
        <ul>
          <li>সময়সীমা: আপনি পণ্যটি পাওয়ার ৭ দিনের মধ্যে পণ্যটি ফেরত দিতে পারেন।
          </li>
          <li>অবস্থা: পণ্যটি অব্যবহৃত থাকতে হবে, মূল প্যাকেজিংয়ে থাকতে হবে এবং আপনি যখন পেয়েছিলেন তখনকার মতো অবস্থায় থাকতে হবে।
          </li>
          <li>ফেরতযোগ্য নয় এমন আইটেম: কাস্টম তৈরি পণ্য, ক্ষয়প্রাপ্ত পণ্য এবং ব্যক্তিগত যত্নের আইটেম ফেরত দেওয়া যাবে না।
          </li>
        </ul>

        <h5>কিভাবে ফেরত দিবেন:</h5>
        <ul>
          <li>আপনার ইনটেরিও অ্যাকাউন্টে লগ ইন করুন এবং আপনার অর্ডার ইতিহাসে যান।
          </li>
          <li>আপনি যে অর্ডারটি ফেরত দিতে চান তা নির্বাচন করুন এবং “আইটেম ফেরত” বোতামে ক্লিক করুন।
          </li>
          <li>রিটার্ন প্রক্রিয়া সম্পূর্ণ করতে প্রদত্ত নির্দেশাবলী অনুসরণ করুন।

          </li>
        </ul>






        <h5>রিফান্ড প্রক্রিয়া:</h5>
        <ul>
          <li>রিফান্ড সময়সীমা: আপনার ফেরত প্রাপ্তির পর এবং পরিদর্শন করা হলে, আমরা আপনার রিফান্ডটি ৭-১০ ব্যবসায়িক দিনের মধ্যে প্রক্রিয়া করব।

          </li>
          <li>পেমেন্ট পদ্ধতি: ক্রয়ের সময় ব্যবহৃত মূল পেমেন্ট পদ্ধতিতে রিফান্ড প্রদান করা হবে।

          </li>
          <li>শিপিং খরচ: মূল শিপিং ফি ফেরতযোগ্য নয়। যদি পণ্যটির ত্রুটির কারণে বা আমাদের অংশে কোনো ভুলের কারণে রিটার্ন করা হয়, আমরা রিটার্ন শিপিং খরচ কভার করব।

          </li>
        </ul>

        <p>আমাদের সাথে যোগাযোগ করুন: যদি আপনার কোনো প্রশ্ন থাকে বা সহায়তা প্রয়োজন হয়, অনুগ্রহ করে আমাদের কাস্টমার সার্ভিস টিমের সাথে যোগাযোগ করুন contact@interiobd.com এ বা +৮৮০১৮৯৬০৫৭৮২৪ নম্বরে কল করুন।</p>

        



      </div>
      <br></br>
      <br></br>

      <Footer />
    </div>
  );
}
