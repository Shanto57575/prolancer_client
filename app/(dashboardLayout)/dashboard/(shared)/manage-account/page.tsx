import ManageAccountForm from "@/components/modules/ManageAccount/ManageAccountForm";

export default function ManageAccount() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-200 mb-2">
          Manage Account
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Update your profile information and preferences
        </p>
      </div>

      <div className="rounded-2xl border p-8">
        <ManageAccountForm />
      </div>
    </div>
  );
}
