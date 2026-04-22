import { useState, useEffect } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
import Education from "@/components/Education";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { Skill } from "../Admin";
import Footer from "@/components/Footer";
import { IconArrowBarToUp } from "@tabler/icons-react";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 300px
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="dark:bg-red-800">

        <Header />


        <Hero />
        <About />
        <hr />
        <Contact />
        <hr />
        <hr />
        <Education />
        <Skills />
        <ContactForm />
        <Footer />

        {/* Conditionally render the scroll button */}
        {showScrollButton && (
          <button
            className="rounded-full bg-red-400 fixed bottom-4 right-4 p-3 md:p-4 transition-colors duration-300 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 z-50 shadow-lg"
            onClick={scrollToTop}
          >
            <IconArrowBarToUp className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

      </div>


      <hr />
      <hr />
    </>
  );
};

export default Home;