import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <section className="relative min-h-screen px-6 md:px-12 xl:px-24 bg-lightBlue dark:bg-darkMode-main dark:text-darkMode-typo">
      <Navbar />

      <div className="pt-3 pb-24 md:pt-10">{children}</div>
    </section>
  );
}
