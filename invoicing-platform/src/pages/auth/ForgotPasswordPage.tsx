import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import logo from '@/assets/logo.png';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={logo} 
            alt="IPPS Logo" 
            className="h-16 mx-auto mb-6"
          />
          {!isSubmitted ? (
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2f2d77]/10 mb-4">
                <Mail className="h-6 w-6 text-[#2f2d77]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Forgot password?
              </h1>
              <p className="text-gray-600 text-sm">
                No worries, we'll send you reset instructions
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h1>
              <p className="text-gray-600 text-sm">
                We sent a password reset link to
                <br />
                <span className="font-medium text-gray-900">{email}</span>
              </p>
            </>
          )}
        </div>

        {/* Card */}
        <Card className="border-gray-200 shadow-lg">
          <CardContent className="pt-6">
            {!isSubmitted ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 border-gray-300 focus:border-[#2f2d77] focus:ring-[#2f2d77]"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#2f2d77] hover:bg-[#1f1d57] text-white font-medium transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Reset password'
                    )}
                  </Button>
                </form>

                <div className="mt-6">
                  <a
                    href="/login"
                    className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-[#2f2d77] transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to sign in</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Didn't receive the email?</strong>
                      <br />
                      Check your spam folder or{' '}
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-[#2f2d77] hover:underline font-medium"
                      >
                        try another email address
                      </button>
                    </p>
                  </div>

                  <Button
                    onClick={() => window.location.href = '/login'}
                    variant="outline"
                    className="w-full h-11 border-gray-300"
                  >
                    Back to sign in
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Need help?{' '}
            <a href="/support" className="text-[#2f2d77] hover:underline font-medium">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}