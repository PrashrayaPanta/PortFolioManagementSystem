const About = () => {
  return (
    <section className="py-20 px-6 bg-white" id="about">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Who I Am
        </h2>

        {/* Bio content in a box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
            <p>
              Hello! My name is <span className="font-semibold text-gray-800">Prashraya panta</span>. 
              I'm an aspiring web developer based in <span className="font-semibold">Kathmandu, Nepal</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;