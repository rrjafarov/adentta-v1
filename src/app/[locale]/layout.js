import "./globals.scss";

export const metadata = {
  title: "Adentta - Dental Supplier",
  description: "Adentta Dental Supplier",
  icons: "/favicon.ico.svg",
};
import NavigationProgress from "@/components/NavigationLoading";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale || "az"}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning>
        <NavigationProgress />
        
        {children}
      </body>
    </html>
  );
}
