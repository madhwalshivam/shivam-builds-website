import { useEffect } from "react";
import { Hero } from "../components/Hero";
import { TrustStrip } from "../components/TrustStrip";
import { WhySection } from "../components/WhySection";
import { FounderVision } from "../components/FounderVision";
import { CampusExperience as OurServices } from "../components/CampusExperience";
import { AcademicEcosystem as DetailedServices } from "../components/AcademicEcosystem";
import { ResultsAndLife } from "../components/ResultsAndLife";
import { Testimonials } from "../components/Testimonials";
import { AdmissionsFunnel } from "../components/AdmissionsFunnel";

interface HomeProps {
  onBookNow?: () => void;
}

export default function Home({ onBookNow }: HomeProps) {
  useEffect(() => {
    document.title = "Best Website Developer in Delhi | Shivam Builds";
  }, []);

  return (
    <>
      <Hero onBookNow={onBookNow} />
      <TrustStrip />
      <WhySection />
      <FounderVision />
      <OurServices />
      <DetailedServices />
      <ResultsAndLife />
      <Testimonials />
      <AdmissionsFunnel />
    </>
  );
}
