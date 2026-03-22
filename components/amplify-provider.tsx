'use client';
import { configureAmplify } from '@/lib/amplify-config';
import { AuthProvider } from '@/lib/auth-context';
configureAmplify();

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
