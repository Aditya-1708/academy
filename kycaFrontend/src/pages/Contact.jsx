import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import axiosInstance from "../axios";

const ContactUs = () => {

  const user = useRecoilValue(userState);
  const [name,setName] = useState(user.name || "")
  const [email , setEmail] = useState(user.email || "")
  const [phone , setPhone] = useState("");
  const [message , setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async(e)=>{
    e.preventDefault();
    setIsSubmitting(true);
    try{
      const response = await axiosInstance.post('/api/inquiries/',{name,email,message,phone})
      console.log(response.data);
      if(response.status === 201)
      {
        setName(user.name||"")
        setMessage("")
        setPhone("")
        setEmail(user.email||"")
      }
      alert("Enquiry Submitted!");
    }
    catch(e)
    {
      alert('Failed to send enquiry.')
      console.error(e);
    }
    finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-black text-green-500 min-h-screen">
      {/* Contact Us Section */}
      <section
        className="py-16"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
      >
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold mb-8 tracking-wide">
            Contact Us
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Whether you have questions about
            enrolling in our programs, becoming a coach, or anything else, feel
            free to reach out to us using the form below.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        className="py-16 bg-black"
        data-aos="fade-right"
        data-aos-duration="1200"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide text-green-500">
            Get in Touch
          </h2>
          <div className="max-w-2xl mx-auto space-y-8">
            <form
              onSubmit={(e)=>handleSubmit(e)}
              action="#"
              method="POST"
              className="space-y-6 bg-black p-8 rounded-lg shadow-lg"
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="mt-2 px-4 py-3 bg-gray-700 text-white rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-2 px-4 py-3 bg-gray-700 text-white rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e)=>{setPhone(e.target.value)}}
                  placeholder="1234567890"
                  pattern="[0-9]{10}"
                  required
                  className="mt-2 px-4 py-3 bg-gray-700 text-white rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="enquiry" className="text-gray-300">
                  Enquiry
                </label>
                <textarea
                  id="enquiry"
                  name="enquiry"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows="5"
                  required
                  className="mt-2 px-4 py-3 bg-gray-700 text-white rounded-md"
                ></textarea>
              </div>
              <button
  type="submit"
  disabled={isSubmitting}
  className={`bg-green-500 text-white px-6 py-3 rounded-md ${
    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
  } transition duration-300`}
>
  {isSubmitting ? "Submitting..." : "Enquire"}
</button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16" data-aos="fade-left" data-aos-duration="1200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
            Our Location
          </h2>
          <div className="max-w-2xl mx-auto space-y-6 text-gray-300">
            <p className="flex items-center gap-4">
              <span className="text-green-500">&#x1F3E0;</span> Karnataka Youth
              Cricket Academy, 123 Main Street, Bangalore, India
            </p>
            <p className="flex items-center gap-4">
              <span className="text-green-500">&#x1F4E7;</span>{" "}
              info@karnatakacricketacademy.com
            </p>
            <p className="flex items-center gap-4">
              <span className="text-green-500">&#x1F4DE;</span> +91 123 456 7890
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
