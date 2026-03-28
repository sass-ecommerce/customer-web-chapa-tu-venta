'use client';
import { configureAmplify } from '@/lib/config/amplify-config';
import { AuthProvider } from '@/lib/auth/auth-context';
configureAmplify();

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
