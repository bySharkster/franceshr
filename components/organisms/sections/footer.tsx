import { ThemeSwitcher } from "@/components/molecules/theme-switcher";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-center text-xs">
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
    </footer>
  );
}
