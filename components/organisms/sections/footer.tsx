import { ThemeSwitcher } from "@/components/molecules/theme-switcher";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
    <p>
      Powered by{" "}
      <a
        href="https://fernandoaponte.dev/?utm_source=franceshr&utm_medium=footer&utm_term=franceshr"
        target="_blank"
        className="font-bold hover:underline"
        rel="noreferrer"
      >
        CodeWfer
      </a>
    </p>
    <ThemeSwitcher />
  </footer>  )
}
