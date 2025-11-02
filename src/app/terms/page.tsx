import { AlertTriangle, CheckCircle, FileText, Scale } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | FrancesHR",
  description: "Terms of Service and User Agreement for FrancesHR",
};

export default function TermsOfService() {
  const lastUpdated = "October 29, 2025";
  const effectiveDate = "October 29, 2025";

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-linear-to-r from-blue-600 to-purple-600 p-4 shadow-xl">
              <Scale className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last Updated: {lastUpdated} | Effective Date: {effectiveDate}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
          {/* Agreement to Terms */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <FileText className="h-6 w-6 text-blue-600" />
              Agreement to Terms
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement
              between you and FrancesHR (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;) governing your access to and use of our HR services platform,
              including our website, applications, and services (collectively, the
              &quot;Services&quot;).
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing or using our Services, you agree to be bound by these Terms and our
              Privacy Policy (&quot;Privacy Policy&quot;). If you do not agree to these Terms, you
              must not access or use our Services.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Eligibility</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">To use our Services, you must:</p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be prohibited from using our Services under applicable laws</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
          </section>

          {/* Services Description */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Services Description
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              FrancesHR provides the following services:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Resume Optimization:</strong> Professional review and enhancement of
                resumes/CVs
              </li>
              <li>
                <strong>Career Guidance:</strong> Personalized career counseling and job search
                strategies
              </li>
              <li>
                <strong>Document Management:</strong> Secure storage and management of career
                documents
              </li>
              <li>
                <strong>Professional Services:</strong> HR consulting and career development support
              </li>
            </ul>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              We reserve the right to modify, suspend, or discontinue any aspect of our Services at
              any time with or without notice. Any such modifications will be effective immediately.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              User Accounts and Authentication
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Account Creation
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You must create an account using Google OAuth authentication. You are responsible
                  for:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Maintaining the confidentiality of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Ensuring your account information is accurate and current</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Account Termination
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We reserve the right to suspend or terminate your account if you:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Violate these Terms or applicable laws</li>
                  <li>Engage in fraudulent or abusive behavior</li>
                  <li>Provide false or misleading information</li>
                  <li>Fail to pay for services rendered</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Payment Terms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Pricing and Fees
                </h3>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>All prices are displayed in US Dollars (USD)</li>
                  <li>Prices are subject to change with 30 days notice</li>
                  <li>Payment is processed securely through Stripe</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Refund Policy
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Refunds may be issued at our sole discretion within 7 days of purchase if:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Services were not delivered as described</li>
                  <li>Technical issues prevented service delivery</li>
                  <li>You have not received or accessed the deliverables</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Taxes
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You are responsible for all applicable taxes, including sales tax, VAT, or other
                  local taxes based on your jurisdiction.
                </p>
              </div>
            </div>
          </section>

          {/* taxes* User Obligations */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              User Obligations and Acceptable Use
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">You agree to:</p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use the Services only for lawful purposes</li>
              <li>Provide accurate and truthful information</li>
              <li>Respect intellectual property rights</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not upload malicious code or viruses</li>
              <li>Not engage in any activity that disrupts or interferes with the Services</li>
              <li>Not use automated systems (bots, scrapers) without permission</li>
              <li>Not impersonate others or misrepresent your affiliation</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Prohibited Activities
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The following activities are strictly prohibited:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights</li>
              <li>Transmitting harmful or malicious code</li>
              <li>Engaging in fraudulent activities</li>
              <li>Harassing, threatening, or abusing others</li>
              <li>Collecting personal information without consent</li>
              <li>Reverse engineering or decompiling our software</li>
              <li>Reselling or redistributing our Services without authorization</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Intellectual Property Rights
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Our Content
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  All content, features, and functionality of the Services, including but not
                  limited to text, graphics, logos, software, and design, are owned by FrancesHR and
                  protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Your Content
                </h3>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                  You retain ownership of content you upload (resumes, documents, etc.). By
                  uploading content, you grant us a limited license to:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Store and process your content to provide Services</li>
                  <li>Use your content for service improvement (anonymized)</li>
                  <li>Display your content back to you through our platform</li>
                </ul>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  This license terminates when you delete your content or account.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Disclaimers and Warranties
            </h2>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
              <p className="mb-4 font-semibold text-gray-900 dark:text-white">
                IMPORTANT LEGAL NOTICE:
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT.
              </p>
              <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>We do not guarantee employment or job placement outcomes</li>
                <li>We do not warrant that Services will be uninterrupted or error-free</li>
                <li>We do not guarantee specific results from our services</li>
                <li>Career advice is provided for informational purposes only</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Limitation of Liability
            </h2>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, FRANCESHR SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Damages arising from your use or inability to use the Services</li>
                <li>Damages resulting from unauthorized access to your account</li>
              </ul>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Our total liability shall not exceed the amount you paid for Services in the 12
                months preceding the claim, or $100 USD, whichever is greater.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              You agree to indemnify, defend, and hold harmless FrancesHR, its officers, directors,
              employees, and agents from any claims, liabilities, damages, losses, and expenses
              (including legal fees) arising from:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>Your violation of these Terms</li>
              <li>Your violation of any law or third-party rights</li>
              <li>Your use of the Services</li>
              <li>Content you submit or upload</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Governing Law and Jurisdiction
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  United States and Puerto Rico Users
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These Terms are governed by the laws of the Commonwealth of Puerto Rico and
                  federal laws of the United States, without regard to conflict of law principles.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  United Kingdom and EU Users
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  UK and EU users retain their consumer rights under local law. Nothing in these
                  Terms affects your statutory rights.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Dispute Resolution
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Any disputes shall be resolved through binding arbitration in accordance with the
                  rules of the American Arbitration Association, except where prohibited by law. EU
                  and UK consumers may use the EU Online Dispute Resolution platform.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify these Terms at any time. We will notify you of material
              changes by email or prominent notice on our platform at least 30 days before the
              effective date. Continued use of the Services after changes become effective
              constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Severability and Waiver
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              If any provision of these Terms is found to be unenforceable, the remaining provisions
              will continue in full force and effect. Our failure to enforce any right or provision
              does not constitute a waiver of such right or provision.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Entire Agreement
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire
              agreement between you and FrancesHR regarding the Services and supersede all prior
              agreements and understandings.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Contact Information
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              For questions about these Terms, please contact us:
            </p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:legal@franceshr.com"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  legal@franceshr.com
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Legal Department:</strong> FrancesHR Legal Team
              </p>
            </div>
          </section>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
            ← Back to Home
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
