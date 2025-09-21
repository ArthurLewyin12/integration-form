export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <img
            src="/login-img.png"
            alt="Illustration Aladin"
            className="mx-auto"
          />
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
