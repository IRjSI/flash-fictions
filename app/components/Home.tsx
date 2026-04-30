import Content from "./Content";
import Header from "./Header";

function HomePage() {
  return (
    <div className="flex flex-col gap-12 text-neutral-800 dark:text-neutral-200 transition-colors duration-500">
      <Header />

      <section className="flex flex-col gap-16">

        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-tight tracking-tight">
            Short stories for <br />
            <span className="text-neutral-400 dark:text-neutral-600 italic">lingering thoughts.</span>
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans max-w-lg">
            A collection of flash fictions exploring the surreal, the philosophical, and the spaces in between.
          </p>
        </div>


        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-neutral-400">The Collection</h2>
            <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800"></div>
          </div>
          <Content />
        </div>
      </section>

      <footer className="mt-16 py-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center justify-center w-full gap-2">
          <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100"></span>
          © {new Date().getFullYear()} Flaction
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

