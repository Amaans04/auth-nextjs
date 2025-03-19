export default function ProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Profile</h1>
      <p className="text-2xl">Profile page <span className="p-2 rounded-md text-black bg-orange-500">
        {params.id}
        </span></p>
    </div>
  );
}
