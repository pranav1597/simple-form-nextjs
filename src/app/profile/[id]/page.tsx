
export default async function UserProfile({params}: any) {
  // const { id } = await Promise.resolve(params);
  const { id } = await params;
  console.log("id ", id);
  return (
    <div className="flex flex-col min-h-screen items-center justify-center ">
      <h1>Profile</h1>
      <hr />
      <p className="text-2xl ">
        Profile Page: <span className="font-bold bg-violet-600 p-2">{id}</span>
      </p>
    </div>
  );
}
