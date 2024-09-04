import Navbar from './Navbar';
import Footer from './Footer';
import Categories from './Categories';
import '../assets/css/Shipping.css'
import { useAppSelector } from './hooks/useLogin';
export default function Cancellation() {
    const { email } = useAppSelector((state) => state.auth);


    return (
        <div>
            <Navbar
                isLoggedIn={!!email}

                userHomeLink="/user-home"
            />
            <br />

            <Categories />
            <br></br>
            <div className="container2 py-4" style={{ backgroundColor: 'rgb(242, 238, 232)' }}>

                <h2 className="my-4">Cancellation Policy</h2>
                <br></br>
                <br></br>

                <p className="text-justify">

                    At Interio, we strive to provide a seamless shopping experience and understand that sometimes plans change. Our Order Cancellation Policy is designed to be fair and transparent to ensure customer satisfaction.
                </p>
                <h5>Cancellation Before Shipment:</h5>
                <ul>
                    <li>Timeframe: You can cancel your order within 24 hours of placing it, provided it has not been shipped yet.
                    </li>
                    <li>How to Cancel: To cancel your order, log in to your Interio account, go to your order history, and select the order you wish to cancel. Click on the “Cancel Order” button and follow the prompts.

                    </li>
                    <li>Confirmation: Once your cancellation request is processed, you will receive an email confirming the cancellation. Any payments made will be refunded to the original payment method within 7-10 business days.

                    </li>


                </ul>

                <h5>Cancellation After Shipment:</h5>
                <ul>
                    <li>Shipped Orders: If your order has already been shipped, it cannot be canceled. However, you may be eligible to return the product after it has been delivered, subject to our Return Policy.
                    </li>
                    <li>Refusal of Delivery: If you refuse delivery of an order that has already been shipped, the return shipping fees will be deducted from your refund.

                    </li>



                </ul>

                <h5>Custom or Made-to-Order Products:
                </h5>
                <ul>
                    <li>Custom Orders: Orders for custom or made-to-order products cannot be canceled once production has started. Please contact our customer service team as soon as possible if you need to make changes to a custom order.


                    </li>




                </ul>
                <h5>Order Cancellation by Interio:</h5>
                <ul>
                    <li>Right to Cancel: Interio reserves the right to cancel any order due to stock unavailability, payment issues, or if the order violates our Terms and Conditions.</li>
                    <li>Notification: If your order is canceled by Interio, you will be notified via email, and a full refund will be processed to your original payment method.</li>




                </ul>
                <h5>Refund Processing:</h5>
                <ul>

                    <li>Refund Timeframe: Refunds are typically processed within 7-10 business days. Depending on your bank or payment provider, it may take additional time for the refund to reflect in your account.</li>
                    <li>Payment Method: Refunds will be issued to the original payment method used during purchase. If the payment was made via credit card, the refund will appear on your card statement.</li>

                </ul>

                <p className="text-justify">
                    <b>Contact Us:</b> For any questions or assistance, please contact our customer service team at contact@interiobd.com or call us at +8801896057824.


                </p>

                <h5>বাতিলকরণ নীতিমালা</h5>

                <p>ইনটেরিওতে, আমরা প্রতিটি কেনাকাটায় আপনার সন্তুষ্টি নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। যদি কোনো কারণে আপনি আপনার কেনাকাটায় সন্তুষ্ট না হন, আমাদের রিটার্ন ও রিফান্ড পলিসি আপনাকে সহায়তা করার জন্য এখানে রয়েছে।

                </p>

                <h5>শিপমেন্টের আগে বাতিলকরণ:</h5>
                <ul>
                    <li>সময়সীমা: আপনি আপনার অর্ডারটি স্থাপনের ২৪ ঘন্টার মধ্যে বাতিল করতে পারেন, যদি এটি এখনও পাঠানো না হয়।

                    </li>
                    <li>কিভাবে বাতিল করবেন: আপনার ইনটেরিও অ্যাকাউন্টে লগ ইন করুন, আপনার অর্ডার ইতিহাসে যান এবং আপনি যে অর্ডারটি বাতিল করতে চান তা নির্বাচন করুন। “অর্ডার বাতিল করুন” বোতামে ক্লিক করুন এবং প্রদত্ত নির্দেশনা অনুসরণ করুন।

                    </li>
                    <li>নিশ্চিতকরণ: একবার আপনার বাতিলের অনুরোধ প্রক্রিয়া করা হলে, আপনি বাতিলকরণের নিশ্চিতকরণ ইমেল পাবেন। প্রদত্ত যে কোনো অর্থ ৭-১০ ব্যবসায়িক দিনের মধ্যে মূল পেমেন্ট পদ্ধতিতে ফেরত দেওয়া হবে।

                    </li>
                </ul>

                <h5>শিপমেন্টের পরে বাতিলকরণ:</h5>
                <ul>
                    <li>পাঠানো অর্ডার: যদি আপনার অর্ডারটি ইতিমধ্যেই পাঠানো হয়ে থাকে, তবে এটি বাতিল করা যাবে না। তবে, আমাদের রিটার্ন নীতির শর্তাধীন, এটি সরবরাহের পরে পণ্যটি ফেরত দেওয়ার যোগ্য হতে পারে।

                    </li>
                    <li>ডেলিভারি প্রত্যাখ্যান: যদি আপনি ইতিমধ্যেই পাঠানো একটি অর্ডারের ডেলিভারি প্রত্যাখ্যান করেন, তবে ফেরতের শিপিং ফি আপনার রিফান্ড থেকে কেটে নেওয়া হবে।

                    </li>

                </ul>






                <h5>কাস্টম বা অর্ডার অনুযায়ী তৈরি পণ্য:</h5>
                <ul>
                    <li>কাস্টম অর্ডার: কাস্টম বা অর্ডার অনুযায়ী তৈরি পণ্যের অর্ডারগুলি উৎপাদন শুরু হওয়ার পরে বাতিল করা যাবে না। আপনি যদি কাস্টম অর্ডারে পরিবর্তন করার প্রয়োজন হয় তবে যত তাড়াতাড়ি সম্ভব আমাদের গ্রাহক পরিষেবা দলের সাথে যোগাযোগ করুন।


                    </li>

                </ul>

                <h5>ইনটেরিও দ্বারা অর্ডার বাতিলকরণ:</h5>
                <ul>
                    <li>বাতিল করার অধিকার: ইনটেরিও যে কোনও অর্ডার বাতিল করার অধিকার সংরক্ষণ করে, স্টক অপ্রাপ্যতা, পেমেন্ট সমস্যা, বা যদি অর্ডারটি আমাদের শর্তাবলী লঙ্ঘন করে।</li>
                    <li>বিজ্ঞপ্তি: যদি আপনার অর্ডারটি ইনটেরিও দ্বারা বাতিল করা হয়, তাহলে আপনাকে ইমেলের মাধ্যমে অবহিত করা হবে এবং মূল পেমেন্ট পদ্ধতিতে সম্পূর্ণ ফেরত প্রক্রিয়া করা হবে।</li>
                </ul>
                <h5>বিজ্ঞপ্তি: যদি আপনার অর্ডারটি ইনটেরিও দ্বারা বাতিল করা হয়, তাহলে আপনাকে ইমেলের মাধ্যমে অবহিত করা হবে এবং মূল পেমেন্ট পদ্ধতিতে সম্পূর্ণ ফেরত প্রক্রিয়া করা হবে।</h5>
                <ul>

                    <li>রিফান্ড সময়সীমা: সাধারণত রিফান্ড ৭-১০ ব্যবসায়িক দিনের মধ্যে প্রক্রিয়া করা হয়। আপনার ব্যাংক বা পেমেন্ট প্রদানকারীর উপর নির্ভর করে, আপনার অ্যাকাউন্টে রিফান্ডটি প্রতিফলিত হতে অতিরিক্ত সময় লাগতে পারে।</li>
                    <li>পেমেন্ট পদ্ধতি: ক্রয়ের সময় ব্যবহৃত মূল পেমেন্ট পদ্ধতিতে রিফান্ড প্রদান করা হবে। যদি পেমেন্টটি ক্রেডিট কার্ডের মাধ্যমে করা হয়, তবে রিফান্ডটি আপনার কার্ড বিবৃতিতে প্রদর্শিত হবে।</li>
                </ul>

                <p> <b>আমাদের সাথে যোগাযোগ করুন:</b> যদি আপনার কোনও প্রশ্ন থাকে বা অর্ডার বাতিল করার জন্য সহায়তার প্রয়োজন হয়, অনুগ্রহ করে আমাদের গ্রাহক পরিষেবা দলের সাথে যোগাযোগ করুন contact@interiobd.com এ বা +৮৮০১৮৯৬০৫৭৮২৪ নম্বরে কল করুন।</p>



            </div>
            <br></br>
            <br></br>

            <Footer />
        </div>
    );
}