export default function AuthCodeError() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md border">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-4 text-gray-600">
          There was a problem signing you in. Please try again.
        </p>
        <a href="/login" className="inline-block px-4 py-2 mt-6 text-white bg-green-600 rounded hover:bg-green-700">
          Go to Login
        </a>
      </div>
    </div>
  )
}
