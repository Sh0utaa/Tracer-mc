import NavLinks from "@/components/results/NavLinks";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavLinks />
      {children}
    </div>
  );
}
