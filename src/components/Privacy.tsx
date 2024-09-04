import Navbar from './Navbar';
import Footer from './Footer';
import Categories from './Categories';
import '../assets/css/Shipping.css'
import { useAppSelector } from './hooks/useLogin';
export default function Privacy() {
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
            <div className=" container2 py-4" style={{ backgroundColor: 'rgb(242, 238, 232)' }}>

                <h2 className="my-4">Privacy Policy</h2>
                <br></br>
                <br></br>

                <p className="text-justify">
                    At Interio BD, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit or make a purchase from our website.              </p>
                <h5>Data That We Collect</h5>
                <p className="text-justify">
                    We collect various types of personal data to provide you with our services, including:</p>
                <ul>
                    <li>Personal Information: Name, address, email, phone number, and payment details when you place an order.
                    </li>
                    <li>Browsing Data: Information about your interaction with our website, including your IP address, browser type, and pages visited.
                    </li>
                    <li>Transaction Information: Details about your purchases, order history, and preferences.
                    </li>




                </ul>
                <h5>Other Uses of Your Personal Information</h5>
                <p>In addition to processing your orders, we may use your personal information for the following purposes:</p>

                <ul>
                    <li>Customer Support: To provide assistance with your orders, handle inquiries, and address any issues.</li>
                    <li>Marketing: To send you promotional offers, newsletters, and updates about our products and services, if you have opted in.</li>
                    <li>Improvement: To analyze and improve our website, services, and customer experience.</li>
                </ul>

                <h5>Competitions</h5>
                <p className="text-justify">
                    If you participate in any competitions or promotions, we may collect additional information related to your entry, such as your responses or other competition-related data. This information may be used to administer the competition, notify winners, and for marketing purposes.
                </p>
                <h5>Third Parties and Links</h5>
                <p className="text-justify">
                    Our website may contain links to third-party websites, plugins, and applications. Please note that we are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party websites you visit.
                </p>

                <h5>Cookies</h5>
                <p className="text-justify">
                    We use cookies and similar tracking technologies to enhance your browsing experience and to analyze website traffic. Cookies allow us to recognize your browser and capture certain information. You can manage your cookie preferences through your browser settings.
                </p>
                <h5>Security</h5>
                <p className="text-justify">
                    We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                </p>
                <h5>Your Rights</h5>
                <p className="text-justify">
                    You have the right to:
                </p>
                <ul>

                    <li>Access: Request a copy of the personal information we hold about you.</li>
                    <li>Correction: Request that we correct any inaccuracies in your personal information.</li>
                    <li>Deletion: Request the deletion of your personal data, subject to legal and contractual obligations.</li>
                    <li>Opt-Out: Unsubscribe from our marketing communications at any time.</li>
                </ul>

                <h5>Data Deletion</h5>
                <p className="text-justify">
                    If you wish to have your personal data deleted, please contact us at contact@interiobd.com. We will process your request in accordance with applicable laws and regulations, and will delete your data unless it is required to fulfill our legal obligations.
                </p>
                <p>Interio BD-তে, আমরা আপনার গোপনীয়তাকে মূল্য দেই এবং আপনার ব্যক্তিগত তথ্য রক্ষার জন্য প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতিতে আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত করি তা ব্যাখ্যা করা হয়েছে।</p>
                <h5>আমরা যে তথ্য সংগ্রহ করি</h5>
                <p>আমরা আমাদের পরিষেবাগুলি সরবরাহ করার জন্য বিভিন্ন ধরণের ব্যক্তিগত ডেটা সংগ্রহ করি, যার মধ্যে রয়েছে:</p>
                <ul>
                    <li>
                        ব্যক্তিগত তথ্য: নাম, ঠিকানা, ইমেল, ফোন নম্বর এবং অর্থপ্রদানের বিশদ বিবরণ যখন আপনি একটি অর্ডার দেন।

                    </li>
                    <li>ব্রাউজিং ডেটা: আপনার আইপি ঠিকানা, ব্রাউজার প্রকার এবং পরিদর্শিত পৃষ্ঠাসহ আমাদের ওয়েবসাইটের সাথে আপনার মিথস্ক্রিয়া সম্পর্কিত তথ্য।</li>
                    <li>লেনদেনের তথ্য: আপনার ক্রয়, অর্ডার ইতিহাস এবং পছন্দের বিবরণ।</li>

                </ul>
                <h5>আপনার ব্যক্তিগত তথ্যের অন্যান্য ব্যবহার</h5>
                <p>আপনার অর্ডারগুলি প্রক্রিয়া করার পাশাপাশি, আমরা নিম্নলিখিত উদ্দেশ্যগুলির জন্য আপনার ব্যক্তিগত তথ্য ব্যবহার করতে পারি:</p>
                <ul>

                    <li>গ্রাহক সহায়তা: আপনার অর্ডারগুলির সাথে সহায়তা প্রদান, অনুসন্ধানগুলি পরিচালনা এবং যে কোনও সমস্যা সমাধান করতে।</li>
                    <li>বিপণন: যদি আপনি রাজি থাকেন তবে আপনাকে প্রচারমূলক অফার, নিউজলেটার এবং আমাদের পণ্য ও পরিষেবাগুলির আপডেট পাঠাতে।</li>
                    <li>উন্নতি: আমাদের ওয়েবসাইট, পরিষেবা এবং গ্রাহকের অভিজ্ঞতা বিশ্লেষণ এবং উন্নত করতে।</li>
                </ul>
                <h5>প্রতিযোগিতা</h5>
                <p>যদি আপনি কোনো প্রতিযোগিতা বা প্রচারে অংশ নেন, আমরা আপনার এন্ট্রির সাথে সম্পর্কিত অতিরিক্ত তথ্য সংগ্রহ করতে পারি, যেমন আপনার প্রতিক্রিয়া বা অন্যান্য প্রতিযোগিতার সাথে সম্পর্কিত ডেটা। এই তথ্য প্রতিযোগিতা পরিচালনা করতে, বিজয়ীদের জানাতে এবং বিপণন উদ্দেশ্যে ব্যবহার করা যেতে পারে।</p>
                <h5>তৃতীয় পক্ষ এবং লিঙ্ক</h5>
                <p>আমাদের ওয়েবসাইটে তৃতীয় পক্ষের ওয়েবসাইট, প্লাগইন এবং অ্যাপ্লিকেশনগুলির লিঙ্ক থাকতে পারে। অনুগ্রহ করে মনে রাখবেন যে এই বাহ্যিক সাইটগুলির গোপনীয়তা অনুশীলনের জন্য আমরা দায়ী নই। আপনি যে কোনও তৃতীয় পক্ষের ওয়েবসাইট পরিদর্শন করলে তাদের গোপনীয়তা নীতি পড়ার জন্য আমরা আপনাকে উত্সাহিত করি।</p>
                <h5>কুকিজ</h5>
                <p>আমরা আপনার ব্রাউজিংয়ের অভিজ্ঞতা উন্নত করতে এবং ওয়েবসাইটের ট্র্যাফিক বিশ্লেষণ করতে কুকিজ এবং অনুরূপ ট্র্যাকিং প্রযুক্তি ব্যবহার করি। কুকিজ আমাদের আপনার ব্রাউজারটি চিনতে এবং নির্দিষ্ট তথ্য সংগ্রহ করতে দেয়। আপনি আপনার ব্রাউজার সেটিংসের মাধ্যমে আপনার কুকি পছন্দগুলি পরিচালনা করতে পারেন।</p>
                <h5>সুরক্ষা</h5>
                <p>আমরা আপনার ব্যক্তিগত তথ্য অননুমোদিত অ্যাক্সেস, পরিবর্তন, প্রকাশ বা ধ্বংস থেকে রক্ষা করার জন্য যুক্তিসঙ্গত পদক্ষেপ গ্রহণ করি। তবে, ইন্টারনেটের মাধ্যমে সংক্রমণের কোনো পদ্ধতি বা বৈদ্যুতিন সঞ্চয়স্থানের পদ্ধতি সম্পূর্ণ নিরাপদ নয়, এবং আমরা সম্পূর্ণ নিরাপত্তার গ্যারান্টি দিতে পারি না।</p>
                <h5>আপনার অধিকার</h5>
                <p>আপনার অধিকার রয়েছে:</p>
                <ul>

                    <li>অ্যাক্সেস: আমরা আপনার সম্পর্কে যে ব্যক্তিগত তথ্য রেখেছি তার একটি কপি অনুরোধ করতে।</li>
                    <li>সংশোধন: আমরা যে কোনও ভুল ব্যক্তিগত তথ্য সংশোধন করার অনুরোধ করতে।</li>
                    <li>মুছে ফেলা: আইনি এবং চুক্তিগত বাধ্যবাধকতার অধীন, আপনার ব্যক্তিগত ডেটা মুছে ফেলার অনুরোধ করতে।</li>
                    <li>অপ্ট-আউট: যে কোনও সময় আমাদের বিপণন যোগাযোগগুলি থেকে সদস্যতা ত্যাগ করতে।</li>
                </ul>
                <h5>ডেটা মুছে ফেলা</h5>
                <p>আপনার ব্যক্তিগত ডেটা মুছে ফেলতে চান, তাহলে দয়া করে আমাদের contact@interiobd.com– এ যোগাযোগ করুন। আমরা প্রযোজ্য আইন এবং প্রবিধান অনুসারে আপনার অনুরোধ প্রক্রিয়া করব এবং আমাদের আইনি বাধ্যবাধকতা পূরণ না হলে আপনার ডেটা মুছে ফেলব।</p>


            </div>
            <br></br>
            <br></br>

            <Footer />
        </div>
    );
}
