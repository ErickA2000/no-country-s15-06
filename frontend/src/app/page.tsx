import { MembershipTypes } from "@/components";
import Banner from "@/components/Banner/Banner";
import CardsSection from "@/components/cardsSection/cardsSection";
import { Faq } from "@/components/Faq/Faq";
import { BenefitsSection, HeroSection } from "@/components";
import UserStatus from "@/components/userStatus/UserStatus";
import { getMemberShipTypes, getUserStatus } from "@/actions";


const userData = {
  membershipStatus: "Activa",
  monthlyValue: 1000,
  expirationDate: "20/10/2025",
  numberOfUses: 850,
};

export default async function Home() {

  const { membershipTypes } = await getMemberShipTypes()
  const   UserStatus  = await getUserStatus('793d7d6d-96b8-413a-bd6e-8f9de5ce5264') 

  const response = await getMemberShipTypes();
  const membershipTypes = response.membershipTypes.map((membership) => ({
    name: membership.name,
    description: membership.description,
    idPlanProvider: membership.idPlanProvider,
    price: String(membership.price),
    numberPeople: membership.numberPeople,
    paymentFrequency: membership.paymentFrequency,
    activities: membership.activities.map((activity) => String(activity)), // Esto asume que cada actividad puede ser convertida a una cadena
  }));


  return (
    <main className="flex min-h-screen flex-col items-center justify-between mobile:p-24 p-0 bg-custom-gradient">
      <HeroSection />
      <BenefitsSection />
      <CardsSection />
      <MembershipTypes memberships={membershipTypes} />
      <Faq />
      <Banner />
      {/* <UserStatus {...userData}/>  */}
    </main>
  );
}
