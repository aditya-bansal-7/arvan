import dynamic from "next/dynamic";
import Landing_overlay from "@/components/Sections/landing_overlay";
import LandingPage from "@/components/Sections/LandingPage";
import Navbar from "@/components/Navbar";
import NewArrivals from "@/components/Sections/NewArrivals";
import BestSellers from "@/components/Sections/bestSellers";
import Section2 from "@/components/Sections/Section2";
import WhoWeAre from "@/components/Sections/WhoWeAre";
import ShopNowAt from "@/components/Sections/ShopNowAt";
import ClientOnlyContent from "@/components/ClientOnlyContent";
// Dynamically import ClientOnlyContent
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Landing_overlay />
      <div className="px-1 pt-1 md:px-2 md:pt-2">
        <LandingPage />
      </div>
      <Navbar />
      <Section2 />
      <NewArrivals />
      <BestSellers />
      <section className="mt-10 md:mt-20">
        <WhoWeAre />
      </section>
      <ShopNowAt />
      <ClientOnlyContent />
    </div>
  );
}
