import Showcase from "@/components/Showcase";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Home() {
  const {
    getAccessToken,
    getBooleanFlag,
    getFlag,
    getIdToken,
    getIntegerFlag,
    getOrganization,
    getPermission,
    getPermissions,
    getRoles,
    getStringFlag,
    getUser,
    getUserOrganizations,
    isAuthenticated
  } = getKindeServerSession();
  // console.log(await getAccessToken());
  // console.log(await getBooleanFlag("bflag", false));
  // console.log(await getFlag("flag", "x", "s"));
  // console.log(await getIntegerFlag("iflag", 99));
  // console.log(await getOrganization());
  // console.log(await getPermission("eat:chips"));
  // console.log(await getPermissions());
  // console.log(await getStringFlag("sflag", "test"));
  // console.log('test -->',await getUser());
  // // console.log(await getUserOrganizations());
  // const authenticated = await isAuthenticated();
  // console.log(authenticated)
  return (
    <main className="flex min-h-screen flex-col items-center  p-4 mt-16 bg-slate-50 w-full">
      <Image
        src={"/assets/pokemart.png"}
        width={1145}
        height={361}
        alt={"Pokemart Logo"}
        className="w-full"
      />
      <section id="featured-item" className="flex flex-col">
        <Showcase />
        <Link href={"/pokemart"} className="flex flex-col">
          <Button className="flex  self-center text-xl my-4 scale-125">
            Go to the store!
          </Button>
        </Link>{" "}
      </section>
    </main>
  );
}
