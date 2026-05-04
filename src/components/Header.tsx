import { useModelOpen } from "@/hooks/useModelOpen";
import { useScroll, motion } from "framer-motion";
import { Menu, MenuIcon } from 'lucide-react';
import { X } from 'lucide-react';
import { Link } from "react-router-dom";



const Header = () => {

  
  const {modalOpen, setModalOpen} = useModelOpen();


  const handleChange = () => {
    setModalOpen(!modalOpen);
  }

  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Scroll progress bar - sits on top of the header */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-20"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="relative">
        {/* Main Header - Full width white background */}
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
          <div className="flex justify-between items-center p-4 max-w-[2000px] mx-auto">
            {/* Left: PP with rounded border */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-600 text-gray-800 font-bold">
              PP
            </div>

            {/* Right: Navigation links */}
            <nav className="flex space-x-6 text-2xl hidden lg:block">
              <Link
                to="/"
                className="relative text-gray-700 hover:text-blue-500 transition-all duration-300 group px-3 py-1 rounded-md border border-transparent hover:border-blue-500 hover:-translate-y-0.5"
              >
                Home
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
              <a
                href="#about"
                className="relative text-gray-700 hover:text-blue-500 transition-all duration-300 group px-3 py-1 rounded-md border border-transparent hover:border-blue-500 hover:-translate-y-0.5"
              >
                About
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-3/4"></span>
              </a>
              <a
                href="#contact"
                className="relative text-gray-700 hover:text-blue-500 transition-all duration-300 group px-3 py-1 rounded-md border border-transparent hover:border-blue-500 hover:-translate-y-0.5"
              >
                Contact
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-3/4"></span>
              </a>
              <a
                href="#skills"
                className="relative text-gray-700 hover:text-blue-500 transition-all duration-300 group px-3 py-1 rounded-md border border-transparent hover:border-blue-500 hover:-translate-y-0.5"
              >
                Skills
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-3/4"></span>
              </a>
              <a
                href="#projects"
                className="relative text-gray-700 hover:text-blue-500 transition-all duration-300 group px-3 py-1 rounded-md border border-transparent hover:border-blue-500 hover:-translate-y-0.5"
              >
                Projects
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-3/4"></span>
              </a>
              <a
                href="#education"
                className="relative text-gray-700 hover:text-blue-500 transition-all duration-300 group px-3 py-1 rounded-md border border-transparent hover:border-blue-500 hover:-translate-y-0.5"
              >
                Education
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-3/4"></span>
              </a>

              <a
                href="/login"
                className="relative text-gray-700 hover:text-blue-500 transition-all duration-300 group px-3 py-1 rounded-md border border-transparent hover:border-blue-500 hover:-translate-y-0.5"
              >
                Login
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-3/4"></span>
              </a>


            </nav>


            {

              modalOpen ? <X className="lg:hidden" onClick={handleChange} /> : <MenuIcon className="lg:hidden" onClick={handleChange} />

            }










          </div>
        </div>

        
        

        {

          modalOpen && (
            <div className="fixed top-18 right-0 left-0 px-3    bg-black  text-white z-10 lg:hidden">
              <nav className="py-2">

                <a href="#" className="flex justify-center">Home</a>
                <a href="#about" className="flex justify-center">About</a>

                <a href="#contact" className="flex justify-center">Contact</a>

                <a href="#skills" className="flex justify-center">Skills</a>

                <a href="#education" className="flex justify-center">Education</a>

              </nav>

            </div>

          )


        }

      </div>


    </>
  );
};

export default Header;