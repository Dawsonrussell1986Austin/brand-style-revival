import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import acesLogo from "@/assets/aces-logo.webp";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminRole = async (userId: string) => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .in("role", ["admin", "editor"]);
      
      if (data && data.length > 0) {
        navigate("/staff-portal-9472");
      }
    };

    // Set up listener FIRST - use setTimeout to avoid deadlock
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        }
      }
    );

    // THEN check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/staff-portal-9472/login?reset=true`,
      });

      if (error) throw error;
      setResetSent(true);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/staff-portal-9472`,
          },
        });

        if (error) throw error;
        if (data.session) {
          toast.success("Account created! Redirecting...");
          navigate("/staff-portal-9472");
        } else {
          toast.success("Account created! Please sign in.");
          setIsSignUp(false);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Check if user is admin
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .in("role", ["admin", "editor"]);

        if (!roles || roles.length === 0) {
          await supabase.auth.signOut();
          throw new Error("You don't have admin access. Contact an administrator.");
        }

        toast.success("Welcome back!");
        navigate("/staff-portal-9472");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password update after reset link click
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reset') === 'true') {
      // User came from reset link — listen for PASSWORD_RECOVERY event
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event) => {
          if (event === 'PASSWORD_RECOVERY') {
            const newPassword = prompt("Enter your new password (min 6 characters):");
            if (newPassword && newPassword.length >= 6) {
              const { error } = await supabase.auth.updateUser({ password: newPassword });
              if (error) {
                toast.error(error.message);
              } else {
                toast.success("Password updated successfully! You can now sign in.");
                window.history.replaceState({}, '', '/staff-portal-9472/login');
              }
            }
          }
        }
      );
      return () => subscription.unsubscribe();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-aces-navy via-aces-blue to-aces-green flex items-center justify-center p-4" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img src={acesLogo} alt="ACES Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-heading text-aces-navy">
              Admin Portal
            </h1>
            <p className="text-muted-foreground mt-2">
              {isForgotPassword 
                ? "Enter your email to reset your password" 
                : isSignUp 
                  ? "Create your admin account" 
                  : "Sign in to manage content"}
            </p>
          </div>

          {isForgotPassword ? (
            resetSent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-aces-green/10 flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-aces-green" />
                </div>
                <p className="text-foreground font-medium">Check your email</p>
                <p className="text-sm text-muted-foreground">
                  We sent a password reset link to <strong>{email}</strong>
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { setIsForgotPassword(false); setResetSent(false); }}
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-aces-navy font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-aces-blue hover:bg-aces-blue/90 text-white h-11"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-aces-blue hover:underline text-sm font-medium"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )
          ) : (
            <>
              <form onSubmit={handleAuth} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-aces-navy font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-aces-navy font-medium">
                      Password
                    </Label>
                    {!isSignUp && (
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-aces-blue hover:underline text-xs font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-aces-blue hover:bg-aces-blue/90 text-white h-11"
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-aces-blue hover:underline text-sm font-medium"
                >
                  {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
                </button>
              </div>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              Only authorized administrators can access this portal.
              <br />
              Contact your administrator if you need access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
