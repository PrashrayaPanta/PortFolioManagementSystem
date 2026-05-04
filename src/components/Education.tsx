import { useModelOpen } from "@/hooks/useModelOpen";



const educationData = [
  {
    years: "2016–2020",
    degree: "Bachelor in Computer Application K xa Thik xa ni lsdjknfjksndjkhfkj NCIT Ho ni k xa thik xa ni hjdsbfjhb",
    institution: "NAST",
  },
  {
    years: "2014–2016",
    degree: "High School",
    institution: "Kailali Model College sdfnmbndsbnmb",
  },
];

const EducationCard = ({ years, degree, institution }:{years:string, degree:string, institution:string}) => (
  <div className="flex items-center gap-8 rounded-2xl p-8 mb-6 
   backdrop-blur-lg border border-white/20
    shadow-[0_8px_32px_rgba(80,60,180,0.18)]
    transition-transform duration-300 hover:-translate-y-1">

    {/* Year Badge */}
    <div className="shrink-0 rounded-2xl px-5 py-3 
       backdrop-blur-sm border 
       text-sm font-semibold tracking-wide whitespace-nowrap">
      {years}
    </div>

    {/* Content */}
    <div>
      <h3 className=" font-bold text-xl mb-1">{degree}</h3>
      <p className=" text-base font-normal">{institution}</p>
    </div>
  </div>
);

export default function Education() {


  const {modalOpen} = useModelOpen();
  
  console.log("I am inside the education Component");

  console.log(modalOpen);
  
  
  return (
    <section className={`flex items-center justify-center px-6 
      bg-white-200 
      font-[Outfit] my-20 lg:scroll-mt-30 ${modalOpen && "scroll-mt-80"}`} id="education"  > 

      <div className="w-full max-w-3xl">

        {/* Title */}
        <h1 className="text-center font-extrabold text-black text-5xl 
          mb-8 tracking-tight drop-shadow-lg">
          Education
        </h1>

        {/* Cards */}
        {educationData.map((item, index) => (
          <EducationCard
            key={index}
            years={item.years}
            degree={item.degree}
            institution={item.institution}
          />
        ))}

      </div>
    </section>
  );
}