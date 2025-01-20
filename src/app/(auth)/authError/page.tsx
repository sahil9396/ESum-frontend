import { AlertTriangle } from "lucide-react";
import Link from "next/link";
const AuthError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B1623]">
      <div className="text-center animate-fade-up">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-white">
          Authentication Error
        </h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Something went wrong during the authentication process. Please try
          again or contact support if the problem persists.
        </p>
        <div className="space-y-4">
          <Link href="/sign-in" className="w-full sm:w-auto">
            Try Again
          </Link>
          <div>
            <Link href="/" className="text-gray-400 hover:text-white">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthError;
