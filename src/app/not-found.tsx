import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center animate-fade-up">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-secondary mb-8">Page not found</p>
        <Link href={"/"} className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
