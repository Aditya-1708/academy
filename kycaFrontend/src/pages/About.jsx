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
      The Karnataka Youth Cricket Academy was started on 23 December 2010 with
      the specific aim of focusing on the deliverance of top-quality,
      high-performance coaching in a professional manner with an eye on getting
      the best out of kids with fire, passion, ability, and the desire to make
      it big.
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
      ) : (
        coaches.map((coach, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className={`cursor-pointer w-60 mx-auto p-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0px_10px_20px_rgba(16,185,129,0.4)] ${
                selectedCoach === index ? "ring-emerald-400" : ""
              }`}
              onClick={() => setSelectedCoach(index)}
            >
              <div className="flex justify-center">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${coach.img}`}
                  alt={`Coach ${index + 1}`}
                  className="w-32 h-32 rounded-full shadow-lg transition-transform transform hover:scale-110"
                />
              </div>
              <CardContent>
                <CardTitle>{coach.name}</CardTitle>
                <CardDescription>
                  {[
                    "With over 15 years of experience, John specializes in developing all-round skills in players and has mentored numerous national and international cricketers.",
                    "Jane is an expert batting coach with a proven track record of elevating players' techniques and enabling them to perform under pressure.",
                    "Robert's expertise in bowling strategies and techniques has helped players enhance their skills, making him a sought-after coach for budding bowlers.",
                    "Emily is renowned for her innovative drills and techniques that improve agility and fielding accuracy, crucial for modern cricket.",
                  ][index]}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  </div>
</section>



     {/* Activities Section */}
<section className="py-16">
  <div className="container mx-auto px-4" data-aos="fade-up">
    <motion.h2
      className="text-4xl font-extrabold text-center mb-12 tracking-wide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      Activities
    </motion.h2>
    <div className="flex flex-col gap-12">
      {[activity1, activity2].map((activity, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""} items-center gap-6`}
        >
          <img
            src={activity}
            alt={`Activity ${index + 1}`}
            className="w-2/3 md:w-1/4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
          />
          <div className="text-lg text-gray-600 md:w-1/2">
            <p>
              {[
                "Personal one-on-one training sessions for budding cricketers, leveraging state-of-the-art technology such as Pitch Vision, StanceBeam, and bowling machines.",
                "Regular domestic and international tours to provide exposure to trainees, ensuring they experience diverse playing conditions and cultures.",
              ][index]}
            </p>
          </div>
        </div>
      ))}
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