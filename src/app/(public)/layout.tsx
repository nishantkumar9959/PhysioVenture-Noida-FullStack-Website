import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import FloatingCTAs from "@/components/shared/floating-ctas";
import FaqSection from "@/components/shared/FaqSection";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full flex flex-col pt-16">
        {children}
        <FaqSection />
      </main>
      <Footer />
      <FloatingCTAs />
    </>
  );
}

