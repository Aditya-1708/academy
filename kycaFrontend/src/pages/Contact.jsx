import { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin } from "lucide-react";
import {useRecoilValue} from 'recoil'
import {userState} from '../atoms'
import axiosInstance from "../axios";
// Button Component
const Button = ({ children, ...props }) => (
  <button
    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    {...props}
  >
    {children}
  </button>
);

// Input Component
const Input = (props) => (
  <input
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
    {...props}
  />
);

// Textarea Component
const Textarea = (props) => (
  <textarea
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
    {...props}
  />
);

// Card Component
const Card = ({ children, title }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    {title && (
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
    )}
    <div className="px-6 py-4">{children}</div>
  </div>
);

const ContactUs = () => {
  const user = useRecoilValue(userState);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/api/inquiries/", { name, email, message, phone });
      console.log(response.data);
      if (response.status === 201) {
        setName(user.name || "");
        setMessage("");
        setPhone("");
        setEmail(user.email || "");
      }
      alert("Enquiry Submitted!");
    } catch (e) {
      alert("Failed to send enquiry.");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <Card title="Get in Touch">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="1234567890"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div>
                <label htmlFor="enquiry" className="block text-sm font-medium text-gray-700">
                  Enquiry
                </label>
                <Textarea
                  id="enquiry"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Send Enquiry"}
              </Button>
            </form>
          </Card>

          <Card title="Our Location">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="text-emerald-600" />
                <p>Karnataka Youth Cricket Academy, 123 Main Street, Bangalore, India</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-emerald-600" />
                <p>info@karnatakacricketacademy.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-emerald-600" />
                <p>+91 123 456 7890</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
