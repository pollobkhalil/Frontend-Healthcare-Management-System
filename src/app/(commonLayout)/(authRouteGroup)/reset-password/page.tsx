import ResetPasswordForm from "@/components/modules/Auth/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: Promise<{ email?: string }>;
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { email } = await searchParams;

  return <ResetPasswordForm email={email || ""} />;
};

export default ResetPasswordPage;
