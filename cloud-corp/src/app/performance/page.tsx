import Hero from "@/components/hero";
import performanceImg from "/public/performance.jpg";

const PerfomancePage = () => {
  return (
    <Hero
      imgData={performanceImg}
      imgAlt="welding"
      title="We serve high performance applications"
    />
  );
};

export default PerfomancePage;
