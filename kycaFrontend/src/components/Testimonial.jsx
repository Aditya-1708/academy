import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import axiosInstance from "../axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import Font Awesome icons

const Testimonial = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback data from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosInstance.get("/api/user/getFeedback");
        console.log(response.data);
        setFeedbacks(response.data.feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true, // Animation occurs once on scroll
    });
  }, []);

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-emerald-500" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-emerald-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-emerald-500" />);
      }
    }
    return stars;
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Testimonials
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Hear from some of our successful cricketers
          </p>
        </div>
        {feedbacks.length > 0 ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {feedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                className="rounded-lg bg-gray-50 p-6 shadow-md hover:shadow-xl transition duration-300"
                data-aos="fade-up" // AOS scroll animation
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-emerald-600">"{feedback.message}"</p>
                <div className="mt-2 flex items-center">
                  {renderStars(feedback.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({feedback.rating})
                  </span>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-gray-900">
                    - {feedback.name}
                  </p>
                  <p className="text-sm text-gray-500">{feedback.role}</p>
                </div>
                {/* Rating Section */}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No testimonials available.
          </p>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
