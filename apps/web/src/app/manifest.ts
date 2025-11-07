import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Frances HR",
    short_name: "Frances HR",
    description: "A modern HR management platform",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F4F5",
    theme_color: "#4F46E5",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
