import HomePage from "./components/Home";

export default function Page() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-4xl rounded-3xl shadow-xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-8 sm:p-16 mx-4">
        <HomePage />
      </main>
    </div>
  );
}
