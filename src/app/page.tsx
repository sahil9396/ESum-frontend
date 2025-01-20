import Link from "next/link";

const Index = async () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Esum</h1>
        <Link href="/sign-in" className="btn btn-primary">
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-12 flex flex-col items-center justify-center text-center gap-8 animate-fade-up">
        <h1 className="text-5xl md:text-6xl font-bold">
          Welcome to <span className="text-primary">Esum</span>
        </h1>
        <p className="text-xl text-secondary max-w-2xl">
          A beautiful, modern application with authentication and a stunning
          dark theme interface.Esum is an advanced email summary generator that
          helps you quickly understand the key points of your emails. With our
          intelligent summarization technology, you can save time and stay
          organized by getting concise summaries of lengthy emails.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard" className="btn btn-primary">
            Get Started
          </Link>
          <Link href="/" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-secondary">
        <p>&copy; 2024 App Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
