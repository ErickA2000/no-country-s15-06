//app/(landing)/page.tsx
import { MembershipTypes } from "@/components";
import Banner from "@/components/Banner/Banner";
import { Spinner } from "@nextui-org/spinner";
import CardsSection from "@/components/cardsSection/cardsSection";
import { Faq } from "@/components/Faq/Faq";
import { BenefitsSection, HeroSection } from "@/components";
import { getMemberShipTypes } from "@/actions";

export default async function Home() {
  const { membershipTypes } = await getMemberShipTypes();

  if (membershipTypes === null) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Spinner size="lg" label="Loading..." color="warning" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full p-0 bg-custom-gradien overflow-hidden">
      <HeroSection />
      <BenefitsSection />
      <CardsSection />
      <MembershipTypes memberships={membershipTypes} />
      <Faq />
      <Banner />
    </main>
  );
}
