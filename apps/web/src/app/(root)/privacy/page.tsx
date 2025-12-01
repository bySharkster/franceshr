import { Database, Eye, FileText, Lock, Mail, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and Data Protection Information for FrancesHR",
};

export default function PrivacyPolicy() {
  const lastUpdated = "October 29, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-xl">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last Updated: {lastUpdated}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <FileText className="h-6 w-6 text-blue-600" />
              Introduction
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              FrancesHR (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
              protecting your privacy and ensuring the security of your personal information. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our HR services platform.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              This policy complies with the General Data Protection Regulation (GDPR), UK GDPR,
              California Consumer Privacy Act (CCPA), and other applicable data protection laws in
              the United States and Puerto Rico.
            </p>
          </section>

          {/* Data Controller */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <Database className="h-6 w-6 text-blue-600" />
              Data Controller
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              FrancesHR acts as the data controller for the personal information we process. For
              inquiries regarding your data, please contact us at:{" "}
              <a
                href="mailto:privacy@franceshr.com"
                className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                privacy@franceshr.com
              </a>
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <Eye className="h-6 w-6 text-blue-600" />
              Information We Collect
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  1. Personal Information (Unencrypted)
                </h3>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Google Email Address:</strong> Used for authentication and communication
                  </li>
                  <li>
                    <strong>Full Name:</strong> Used for personalization and service delivery
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  2. Encrypted Information
                </h3>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                  All other personal and sensitive information is encrypted at rest and in transit,
                  including:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Resume/CV documents</li>
                  <li>Professional history and qualifications</li>
                  <li>Contact information (phone numbers, addresses)</li>
                  <li>Employment preferences and career goals</li>
                  <li>Payment information (processed via Stripe - we do not store card details)</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  3. Automatically Collected Information
                </h3>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <Lock className="h-6 w-6 text-blue-600" />
              How We Use Your Information
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We process your personal information for the following purposes:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Service Delivery:</strong> To provide HR services, resume optimization, and
                career guidance
              </li>
              <li>
                <strong>Authentication:</strong> To verify your identity and manage your account
              </li>
              <li>
                <strong>Communication:</strong> To send service updates, notifications, and respond
                to inquiries
              </li>
              <li>
                <strong>Payment Processing:</strong> To process transactions via Stripe (PCI-DSS
                compliant)
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with legal obligations and protect our
                rights
              </li>
              <li>
                <strong>Service Improvement:</strong> To analyze usage patterns and improve our
                platform
              </li>
            </ul>
          </section>

          {/* Legal Basis for Processing */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Legal Basis for Processing (GDPR/UK GDPR)
            </h2>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Contract Performance:</strong> Processing necessary to fulfill our service
                agreement with you
              </li>
              <li>
                <strong>Legitimate Interests:</strong> To improve our services and prevent fraud
              </li>
              <li>
                <strong>Legal Obligation:</strong> To comply with applicable laws and regulations
              </li>
              <li>
                <strong>Consent:</strong> Where you have provided explicit consent for specific
                processing activities
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <Shield className="h-6 w-6 text-blue-600" />
              Data Security Measures
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Encryption:</strong> AES-256 encryption at rest and TLS 1.3 in transit
              </li>
              <li>
                <strong>Access Controls:</strong> Role-based access with multi-factor authentication
              </li>
              <li>
                <strong>Secure Infrastructure:</strong> Hosted on Supabase with SOC 2 Type II
                compliance
              </li>
              <li>
                <strong>Regular Audits:</strong> Periodic security assessments and vulnerability
                scanning
              </li>
              <li>
                <strong>Data Minimization:</strong> We only collect data necessary for service
                delivery
              </li>
              <li>
                <strong>Secure File Storage:</strong> Resume files stored with signed URLs and
                time-limited access
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Data Sharing and Third Parties
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We share your information only with trusted third-party service providers:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Supabase:</strong> Database and authentication services (GDPR compliant)
              </li>
              <li>
                <strong>Stripe:</strong> Payment processing (PCI-DSS Level 1 certified)
              </li>
              <li>
                <strong>Resend:</strong> Transactional email delivery (GDPR compliant)
              </li>
              <li>
                <strong>Google OAuth:</strong> Authentication services (subject to Google&apos;s
                Privacy Policy)
              </li>
            </ul>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              We do not sell, rent, or trade your personal information to third parties for
              marketing purposes.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Your Privacy Rights
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  GDPR/UK GDPR Rights (EU/UK Residents)
                </h3>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Right to Access:</strong> Request a copy of your personal data
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> Correct inaccurate or incomplete data
                  </li>
                  <li>
                    <strong>Right to Erasure:</strong> Request deletion of your data (&quot;right to
                    be forgotten&quot;)
                  </li>
                  <li>
                    <strong>Right to Restriction:</strong> Limit how we process your data
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> Receive your data in a structured
                    format
                  </li>
                  <li>
                    <strong>Right to Object:</strong> Object to processing based on legitimate
                    interests
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time
                  </li>
                  <li>
                    <strong>Right to Lodge a Complaint:</strong> File a complaint with your data
                    protection authority
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  CCPA Rights (California Residents)
                </h3>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Right to Know:</strong> Request disclosure of data collection and
                    sharing practices
                  </li>
                  <li>
                    <strong>Right to Delete:</strong> Request deletion of personal information
                  </li>
                  <li>
                    <strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information
                    (we do not sell data)
                  </li>
                  <li>
                    <strong>Right to Non-Discrimination:</strong> Equal service regardless of
                    privacy choices
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Puerto Rico Residents
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Puerto Rico residents have rights under both US federal law and local regulations.
                  You may exercise the same rights as California residents under CCPA.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>To exercise your rights:</strong> Contact us at{" "}
                <a
                  href="mailto:privacy@franceshr.com"
                  className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  privacy@franceshr.com
                </a>{" "}
                with your request. We will respond within 30 days (GDPR) or 45 days (CCPA).
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Data Retention
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We retain your personal information only as long as necessary:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Active Accounts:</strong> Data retained while your account is active
              </li>
              <li>
                <strong>Account Deletion:</strong> Data deleted within 30 days of account closure
                request
              </li>
              <li>
                <strong>Legal Requirements:</strong> Some data may be retained longer to comply with
                legal obligations (e.g., tax records for 7 years)
              </li>
              <li>
                <strong>Backup Systems:</strong> Deleted data removed from backups within 90 days
              </li>
            </ul>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              International Data Transfers
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your data may be transferred to and processed in countries outside your jurisdiction.
              We ensure appropriate safeguards:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Data Processing Agreements with all third-party processors</li>
              <li>Adequacy decisions where applicable</li>
              <li>Encryption and security measures during transfer</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our services are not intended for individuals under 18 years of age. We do not
              knowingly collect personal information from children. If you believe we have
              inadvertently collected information from a minor, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy periodically. We will notify you of material changes
              by email or prominent notice on our platform. Continued use of our services after
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <Mail className="h-6 w-6 text-blue-600" />
              Contact Us
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              For privacy-related inquiries, data subject requests, or concerns:
            </p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@franceshr.com"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  privacy@franceshr.com
                </a>
              </p>
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                <strong>Data Protection Officer:</strong> dpo@franceshr.com
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Response Time:</strong> Within 30 days (GDPR) or 45 days (CCPA)
              </p>
            </div>
          </section>

          {/* Supervisory Authorities */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Supervisory Authorities
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              If you are located in the EU/UK, you have the right to lodge a complaint with your
              local data protection authority:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>UK:</strong> Information Commissioner&apos;s Office (ICO) -{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  ico.org.uk
                </a>
              </li>
              <li>
                <strong>EU:</strong> Your national data protection authority
              </li>
            </ul>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
