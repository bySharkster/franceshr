import { CookieConsentBanner } from "@/components/molecules/cookie-consent-banner";
import { Footer } from "@/components/organisms/sections/footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      {children}
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
