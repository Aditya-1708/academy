import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import activity1 from "../assets/activity1.jpg";
import activity2 from "../assets/activity2.jpg";
import founder from "../assets/founder.jpg";
import "aos/dist/aos.css";
import AOS from "aos";
import { Card, CardContent, CardTitle, CardDescription } from "../components/Card";
import axiosInstance from "../axios";


AOS.init();

function About() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const activities = [
    {
      image: "/activity1.jpg",
      description:
        "Personal one-on-one training sessions for budding cricketers, leveraging state-of-the-art technology such as Pitch Vision, StanceBeam, and bowling machines.",
    },
    {
      image: "/activity2.jpg",
      description:
        "Regular domestic and international tours to provide exposure to trainees, ensuring they experience diverse playing conditions and cultures.",
    },
  ]
  const services = [
    {
      title: "Pitches",
      description:
        "Matting, Astroturf, and turf pitches so that the kids are exposed to different kinds of playing surfaces early on.",
    },
    {
      title: "Fitness Centre",
      description:
        "A newly constructed fitness centre with qualified professionals at hand to advocate the right methods of training, including Radha Krishnaswamy, the former fitness trainer of the India Women senior national team.",
    },
    {
      title: "Hostel and Transportation",
      description: "Comfortable hostel accommodations and reliable transportation for a hassle-free experience.",
    },
    {
      title: "Floodlit Facility",
      description: "Floodlit facility to ensure ease of practice without having to worry about constraints of time.",
    },
    {
      title: "Technique Analysis",
      description: "Technique analysis from our array of coaches well-versed in the use of technology.",
    },
  ]
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axiosInstance.get('/api/coach');
        setCoaches(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coach:", error);
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
    {/* About Section */}
    <section className="py-16 bg-gradient-to-r from-emerald-100 to-white relative overflow-hidden">
{/* Content */}
<div className="container mx-auto relative z-10 text-center px-6">
  <motion.h2
    className="text-5xl font-extrabold mb-6 tracking-wide text-gray-800"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    About KYCA
  </motion.h2>
  <motion.p
    className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.5 }}
  >
    The Karnataka Youth Cricket Academy was started on 23 December 2010 with the specific aim of focussing on the deliverance of top-quality, high-performance coaching in a professional manner with an eye on getting the best out of kids with fire, passion, ability and the desire to make it big. A conscious decision was made by the founder,
    Ranjith Ravi -- a Cricket Australia Level 2 certified coach -- to provide equal opportunities to boys and girls alike with a view to bridging the gap that exists between men’s and women’s cricket both in India and worldwide.
  </motion.p>
  {/* Call to Action */}
</div>
</section>
    {/* Founder Section */}
    <section className="py-16 bg-white">
<div className="container mx-auto px-4" data-aos="fade-up">
  <motion.h2
    className="text-4xl font-extrabold text-center mb-12 tracking-wide text-emerald-600"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    Our Founder
  </motion.h2>
  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
    {/* Image */}
    <motion.div
      className="flex justify-center md:w-1/3"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={founder}
        alt="Founder"
        className="w-80 h-80 rounded-full shadow-xl transform transition-all duration-300"
        width={320}
        height={320}
      />
    </motion.div>
    {/* Text */}
    <div className="text-center md:text-left md:w-2/3">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">Ranjith Ravi</h3>
      <p className="text-lg text-gray-600 leading-relaxed">
     Ranjith Ravi is a Cricket Australia Level 2 certified coach  to provide equal opportunities to boys and girls alike with a view to bridging the gap that exists between men’s and women’s cricket both in India and worldwide.
      </p>
    </div>
  </div>
</div>
</section>
    {/* Coaches Section */}
{/* Coaches Section */}
<section className="py-16">
<div className="container mx-auto px-4" data-aos="fade-up">
  <motion.h2
    className="text-4xl font-extrabold text-center mb-12 tracking-wide"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.5 }}
  >
    Meet Our Coaches
  </motion.h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {loading ? (
      <p className="text-center text-gray-500">Loading coaches...</p>
    ) : coaches.map((coach, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full flex justify-center"
      >
        <Card
          className={`cursor-pointer w-[350px] sm:w-[500px] md:w-[600px] flex flex-row items-center mx-auto p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-[0px_10px_20px_rgba(16,185,129,0.4)]`}
          onClick={() => setSelectedCoach(index)}
        >
          {/* Image Section (Left Side) */}
          <div className="flex-shrink-0">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${coach.img}`}
              alt={`Coach ${index + 1}`}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full shadow-md transition-transform transform hover:scale-110"
            />
          </div>
    
          {/* Content Section (Right Side) */}
          <CardContent className="ml-4 flex-1">
            <CardTitle className="text-lg md:text-xl">{coach.name}</CardTitle>
            <CardDescription className="text-sm md:text-base leading-relaxed">
              {coach.description}
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    ))
  }    
  </div>
</div>
</section>
{/* location services */}
<section className="py-16 flex flex-col items-center gap-8">
<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Locations
          </h2>
          <p className="mt-2 text-xl text-gray-500">
            Check out our locations on Google maps
          </p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">KYCA Main Location</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3889.2065335074917!2d77.6521941539673!3d12.894437116040578!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15d7a83c36a3%3A0xaa448f0be04b408!2sKYCA!5e0!3m2!1sen!2sin!4v1741157071264!5m2!1sen!2sin"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <p className="mt-4 text-gray-600">Our main facility offers state-of-the-art training grounds, professional coaching, and a welcoming environment for aspiring cricketers.</p>
    </div>
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">KYCA Indus Sarjapura-Attibele Road</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.218245808132!2d77.77357017572164!3d12.829169017983682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae730015f63a2b%3A0x380fcc6d87af3d6e!2sKYCA%20INDUS%20SARJAPURA-ATTIBELE%20ROAD!5e0!3m2!1sen!2sin!4v1741157055967!5m2!1sen!2sin"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <p className="mt-4 text-gray-600">This branch provides excellent facilities and top-tier coaching, ensuring players get exposure to diverse playing environments.</p>
    </div>
  </div>
</section>

    {/* Services Section */}
    <section className="py-16 bg-white">
<div className="container mx-auto px-4" data-aos="fade-up">
  <motion.h2
    className="text-4xl font-extrabold text-center mb-12 tracking-wide text-emerald-600"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.5 }}
  >
    Our Services
  </motion.h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {[
      {
        title: "Fitness Centre",
        description:
          "A newly constructed fitness centre with qualified professionals at hand to advocate the right methods of training, including Radha Krishnaswamy, the former fitness trainer of the India Women senior national team.",
      },
      {
        title: "Hostel and Transportation",
        description:
          "Comfortable hostel accommodations and reliable transportation for a hassle-free experience.",
      },
      {
        title: "Floodlit Facility",
        description:
          "Floodlit facility to ensure ease of practice without having to worry about constraints of time.",
      },
      {
        title: "Technique Analysis",
        description:
          "Technique analysis from our array of coaches well-versed in the use of technology.",
      },
      {
        title: "Turf & Matting pitches - Good box nets",
        description:
          "High-quality turf and matting pitches with well-maintained box nets, providing an ideal environment for focused training and skill enhancement.",
      },
      {
        title: "Match Practices",
        description:
          "Regular match practice sessions to help players refine their skills, develop match awareness, and gain valuable on-field experience.",
      },
      {
        title: "One on One coaching (Advanced booking)",
        description:
         "Personalized one-on-one coaching sessions with expert trainers, available through advanced booking, ensuring tailored guidance and focused improvement.",
      },
    ].map((service, index) => (
      <motion.div
        key={index}
        className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0px_10px_20px_rgba(16,185,129,0.4)]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
        <p className="mt-2 text-lg text-gray-500">{service.description}</p>
      </motion.div>
    ))}
  </div>
</div>
</section>
  </div>
  );
}

export default About;