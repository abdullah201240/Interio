import Navbar from './Navbar';
import Footer from './Footer';
import Categories from './Categories';
import '../assets/css/Shipping.css'

import { useAppSelector } from './hooks/useLogin';
export default function Terms() {
  const { email } = useAppSelector((state) => state.auth);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Navbar
             isLoggedIn={!!email}  
                
              userHomeLink="/user-home" 
            />
            </div>
              <br/>


       <Categories />
       <br></br>
      <div className="container container2 py-4" style={{ backgroundColor: 'rgb(242, 238, 232)' }}>
       
        <h2 className="my-4">Terms & Conditions</h2>
        <br></br>
        <br></br>

        <p className="text-justify">
        Welcome to Interiobd.com also hereby known as “we”, “us” or “Interio”. Please read these Terms & Conditions carefully before using this Site. By using the Site, you hereby accept these terms and conditions and represent that you agree to comply with these terms and conditions (the “User Agreement”). This User Agreement is deemed effective upon your use of the Site which signifies your acceptance of these terms. If you do not agree to be bound by this User Agreement please do not access, register with, or use this Site. This Site is owned and operated by Interio. <b>(Registration number: TRAD/DNCC/039147/2023)</b>        </p>
        
        <p className="text-justify">
        The Site reserves the right to change, modify, add, or remove portions of these Terms and Conditions at any time without any prior notification. Changes will be effective when posted on the Site with no other notice provided. Please check these Terms and Conditions regularly for updates. Your continued use of the Site following the posting of changes to the Terms and Conditions of use constitutes your acceptance of those changes.           </p>

        <h2>শর্তাবলী:</h2>
        <p>Interiobd.com-এ আপনাকে স্বাগতম, এটি “we”, “us” বা “Interio” নামে পরিচিত। এই সাইটটি ব্যবহার করার আগে দয়া করে এই শর্তাবলী সাবধানে পড়ুন। সাইট ব্যবহার করে, আপনি এতদ্বারা এই শর্তাবলী স্বীকার করেন এবং প্রতিনিধিত্ব করেন যে আপনি এই শর্তাবলী (“ব্যবহারকারীর চুক্তি”) মেনে চলতে সম্মত হন। এই ইউজার এগ্রিমেন্ট আপনার সাইটের ব্যবহারের উপর কার্যকর বলে গণ্য করা হয় যা এই শর্তাবলীর আপনার সম্মতি নির্দেশ করে। আপনি যদি এই ব্যবহারকারী চুক্তির দ্বারা আবদ্ধ হতে সম্মত না হন তবে অনুগ্রহ করে এই সাইটে প্রবেশ, নিবন্ধন বা ব্যবহার করবেন না। এই সাইটটি ইন্টেরিও দ্বারা মালিকানাধীন এবং পরিচালিত।<b>(রেজিস্ট্রেশন নম্বর: TRAD/DNCC/039147/2023)</b></p>
       <p>সাইটটি কোন পূর্ব বিজ্ঞপ্তি ছাড়াই যে কোন সময়ে এই শর্তাবলীর পরিবর্তন, পরিবর্তন, যোগ বা অংশগুলিকে অপসারণ করার অধিকার সংরক্ষণ করে। অন্য কোন নোটিশ প্রদান না করে সাইটে পোস্ট করা হলে পরিবর্তন কার্যকর হবে। আপডেটের জন্য অনুগ্রহ করে নিয়মিত এই নিয়ম ও শর্তাবলী পরীক্ষা করুন। ব্যবহারের শর্তাদি এবং শর্তাবলীতে পরিবর্তনগুলি পোস্ট করার পরে সাইটের আপনার ক্রমাগত ব্যবহার সেই পরিবর্তনগুলির আপনার সম্মতি গঠন করে।</p>
      </div>
      <br></br>
      <br></br>

      <Footer />
    </div>
  );
}
