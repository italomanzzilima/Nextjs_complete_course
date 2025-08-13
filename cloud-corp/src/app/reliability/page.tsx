import Hero from "@/components/hero";
import reliabilityImg from "/public/reliability.jpg";

const ReliabilityPage = () => {
  return (
    <Hero
      imgData={reliabilityImg}
      imgAlt="welding"
      title="Super high reliability hosting"
    />
  );
};

export default ReliabilityPage;
