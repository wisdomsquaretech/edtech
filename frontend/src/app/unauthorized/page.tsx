export default function UnauthorizedPage() {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-700">You are not allowed to view this page.</p>
      </div>
    );
  }
  