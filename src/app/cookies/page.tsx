import { Cookie, Info, Settings, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | FrancesHR",
  description: "Cookie Policy and Tracking Technologies for FrancesHR",
};

export default function CookiePolicy() {
  const lastUpdated = "October 29, 2025";

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-linear-to-r from-blue-600 to-purple-600 p-4 shadow-xl">
              <Cookie className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last Updated: {lastUpdated}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <Info className="h-6 w-6 text-blue-600" />
              What Are Cookies?
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Cookies are small text files that are placed on your device when you visit our
              website. They help us provide you with a better experience by remembering your
              preferences, understanding how you use our Services, and improving our platform.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              This Cookie Policy explains what cookies we use, why we use them, and how you can
              control them. This policy should be read in conjunction with our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <Shield className="h-5 w-5 text-blue-600" />
                  1. Essential Cookies (Strictly Necessary)
                </h3>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  These cookies are necessary for the website to function and cannot be disabled.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-300 dark:border-gray-600">
                      <tr>
                        <th className="pr-4 pb-2 font-semibold text-gray-900 dark:text-white">
                          Cookie Name
                        </th>
                        <th className="pr-4 pb-2 font-semibold text-gray-900 dark:text-white">
                          Purpose
                        </th>
                        <th className="pb-2 font-semibold text-gray-900 dark:text-white">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 pr-4">sb-access-token</td>
                        <td className="py-2 pr-4">Authentication session</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 pr-4">sb-refresh-token</td>
                        <td className="py-2 pr-4">Session refresh</td>
                        <td className="py-2">30 days</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">csrf-token</td>
                        <td className="py-2 pr-4">Security protection</td>
                        <td className="py-2">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  2. Functional Cookies
                </h3>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  These cookies enable enhanced functionality and personalization.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-300 dark:border-gray-600">
                      <tr>
                        <th className="pr-4 pb-2 font-semibold text-gray-900 dark:text-white">
                          Cookie Name
                        </th>
                        <th className="pr-4 pb-2 font-semibold text-gray-900 dark:text-white">
                          Purpose
                        </th>
                        <th className="pb-2 font-semibold text-gray-900 dark:text-white">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 pr-4">theme-preference</td>
                        <td className="py-2 pr-4">Remember dark/light mode</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">language-preference</td>
                        <td className="py-2 pr-4">Remember language choice</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  3. Analytics Cookies (Optional)
                </h3>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <div className="mb-3 rounded border border-yellow-200 bg-yellow-50 p-3 text-sm text-gray-700 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-gray-300">
                  <strong>Note:</strong> We currently do not use third-party analytics cookies. If
                  implemented in the future, you will be asked for consent.
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  4. Marketing Cookies (Optional)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We do not currently use marketing or advertising cookies. If this changes, we will
                  update this policy and request your consent.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Third-Party Cookies and Services
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We use the following third-party services that may set cookies:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Google OAuth (Authentication)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  When you sign in with Google, Google may set cookies according to their{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Stripe (Payment Processing)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Stripe may use cookies for fraud prevention and secure payment processing. See{" "}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Stripe&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Supabase (Infrastructure)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our hosting and database provider may use essential cookies for service delivery.
                  See{" "}
                  <a
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Supabase&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Control */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <Settings className="h-6 w-6 text-blue-600" />
              How to Control Cookies
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Browser Settings
                </h3>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  Most web browsers allow you to control cookies through their settings:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other
                    site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Cookies and site permissions → Manage and
                    delete cookies
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Important:</strong> Blocking essential cookies may prevent you from using
                  certain features of our Services, including authentication and account access.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Do Not Track (DNT)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We respect Do Not Track signals. When DNT is enabled in your browser, we will not
                  use optional tracking technologies.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Mobile Devices
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Mobile devices may have settings to limit ad tracking or reset advertising
                  identifiers. Check your device&apos;s privacy settings for options.
                </p>
              </div>
            </div>
          </section>

          {/* GDPR Compliance */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              GDPR and Cookie Consent
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              In compliance with GDPR and UK GDPR:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Essential cookies</strong> are used based on legitimate interest for service
                delivery
              </li>
              <li>
                <strong>Optional cookies</strong> require your explicit consent before being set
              </li>
              <li>You can withdraw consent at any time through browser settings</li>
              <li>We provide clear information about all cookies we use</li>
              <li>Cookie consent is separate from Terms of Service acceptance</li>
            </ul>
          </section>

          {/* CCPA Compliance */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              CCPA and California Privacy Rights
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">For California residents:</p>
            <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>We do not sell your personal information collected through cookies</li>
              <li>You have the right to opt-out of any future sale (if applicable)</li>
              <li>You can request deletion of information collected via cookies</li>
              <li>We do not discriminate against users who exercise their privacy rights</li>
            </ul>
          </section>

          {/* Cookie Lifespan */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Cookie Lifespan
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-200">
                  Session Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Temporary cookies that expire when you close your browser.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-200">
                  Persistent Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Remain on your device for a set period (up to 1 year) or until manually deleted.
                </p>
              </div>
            </div>
          </section>

          {/* Updates to Policy */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Updates to This Cookie Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Cookie Policy from time to time to reflect changes in our practices
              or legal requirements. We will notify you of significant changes by posting a notice
              on our website or sending you an email.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Questions About Cookies?
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@franceshr.com"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  privacy@franceshr.com
                </a>
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
          <span className="text-gray-400">|</span>
          <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
