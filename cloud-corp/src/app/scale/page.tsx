import Hero from "@/components/hero";
import scaleImg from "/public/scale.jpg";

const ScalePage = () => {
  return (
    <Hero
      imgData={scaleImg}
      imgAlt="Steel factory"
      title="Scale your app to infinity."
    />
  );
};

export default ScalePage;
