import ManageAccountForm from "@/components/modules/ManageAccount/ManageAccountForm";

export default function ManageAccount() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Manage Account
        </h1>
        <p className="text-slate-600">
          Update your profile information and preferences
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <ManageAccountForm />
      </div>
    </div>
  );
}
