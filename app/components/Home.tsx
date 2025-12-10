import Content from "./Content";
import Header from "./Header";

function HomePage() {
  return (
    <div className="flex flex-col gap-10 text-neutral-800 dark:text-neutral-200 font-serif transition-colors duration-500">
      <header className="">
        <Header />
      </header>

      <section className="flex flex-col gap-8">
        <Content />
      </section>

      <footer className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500 dark:text-neutral-400 text-center">
        © {new Date().getFullYear()} - Crafted with curiosity.
      </footer>
    </div>
  );
}

export default HomePage;
