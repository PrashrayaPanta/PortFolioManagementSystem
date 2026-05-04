import { motion } from 'framer-motion';
import { FileText, Info, ProjectorIcon, View } from 'lucide-react';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import PrashrayaPantaPhoto from "../assets/prashraya_pantaPhoto.jpg";
import { useModelOpen } from '@/hooks/useModelOpen';
import LasithMaklinga from "../assets/malinga.webp"
import AnotherMalinga from "../assets/anotherMalinga.webp"

const tabs = [
  { id: "category1", label: "Edit Username and Email", icon: FileText },
  { id: "category2", label: "Category 2", icon: ProjectorIcon },
  { id: "category3", label: "Category 3", icon: Info },
];

const projects = [
  { id: 1, title: "The Coldest Sunset Vanni pani Xa k vaneko", image: PrashrayaPantaPhoto },
  { id: 2, title: "The Coldest Sunset", image: PrashrayaPantaPhoto },
  { id: 3, title: "The Coldest Sunset", image: PrashrayaPantaPhoto },
  { id: 4, title: "The Coldest Sunset", image: AnotherMalinga },
  { id: 5, title: "The Coldest Sunset", image: LasithMaklinga },
];

interface ProjectCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const ProjectCard = ({ title, image, onClick }: ProjectCardProps) => (
  <div className="w-full rounded overflow-hidden shadow-lg">  
    <img className="w-full h-100 object-cover" src={image} alt={title} />
    <div className="px-6 mb-2">
      <div className="font-bold text-xl truncate">{title}</div>  
    </div>
    <div className="flex px-6 py-4">
      <button
        onClick={onClick}
        className="bg-black text-white px-4 py-2 rounded-sm flex gap-2"
      >
        <View /> View Projects
      </button>
    </div>
  </div>
);

const Projects = () => {
  const { modalOpen } = useModelOpen();
  const [activeTab, setActiveTab] = useState("category1");

  const handleViewProject = (projectId: number) => {
    console.log("View project:", projectId);
    // Add your navigation or modal logic here
  };

  return (
    <section className={`my-20 scroll-mt-20 ${modalOpen && "scroll-mt-60"}`} id="project">
      <h1 className="font-bold text-2xl text-center">Projects</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center pb-4 pt-2 px-1 ${
                activeTab === tab.id
                  ? "text-orange-500"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  layoutId="activeTab"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mb-20">
        {activeTab === "category1" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Swiper without extra wrapper divs */}
            <Swiper
              spaceBetween={18}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              navigation
                          modules={[Navigation]}
                          className='max-w-[2000px] container px-2 mx-auto bg-amber-300'>
            
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <ProjectCard
                    title={project.title}
                    image={project.image}
                    onClick={() => handleViewProject(project.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* View All button outside Swiper */}
            <div className="mt-6 flex justify-center">
              <button className="bg-black text-white px-4 py-2 rounded-sm flex gap-2">
                <View /> View All Projects
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;