import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-6xl text-gray-500 text-center mt-24">ai toolbox</h1>
      <div className="text-center my-16 text-2xl">
        you can use the ai toolbox to do magic things{" "}
      </div>
      <div className="flex flex-col items-center gap-y-10 text-xl text-sky-500">
        <Link href={"/dashboard"}> dashboard </Link>
        <Link href={"/sign-in"}> sign-in </Link>
        <Link href={"/sign-up"}> sign-up </Link>
      </div>
    </>
  );
}
