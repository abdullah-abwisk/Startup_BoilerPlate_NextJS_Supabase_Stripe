import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function AccountManagement() {
  const { user } = useAuth();
  const router = useRouter();

  // Check if user signed in with OAuth
  const isOAuthUser = user?.app_metadata?.provider === 'google';


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Account Management</h2>
      
      {/* User Information */}
      <div className="mb-6 space-y-2">
        <p><span className="font-medium">Email:</span> {user?.email}</p>
        <p><span className="font-medium">Last Sign In:</span> {new Date(user?.last_sign_in_at || '').toLocaleString()}</p>
        <p><span className="font-medium">Account Type:</span> {isOAuthUser ? 'Google Account' : 'Email Account'}</p>
      </div>
      
      <div>
        {!isOAuthUser && (
          <button
            onClick={() => router.push(`/reset-password?email=${encodeURIComponent(user?.email || '')}`)}
            className="block w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Reset Password
          </button>
        )}
      </div>
    </div>
  );
} 