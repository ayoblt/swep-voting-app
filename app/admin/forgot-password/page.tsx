import ForgotPasswordForm from '@/components/admin/forgot-password-form';
import ThemeToggler from '@/components/theme-toggler';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center relative">
      <ForgotPasswordForm />
      <div className="fixed max-lg:top-7 lg:bottom-7 max-lg:right-7 lg:left-7">
        <ThemeToggler />
      </div>
    </main>
  );
}
