import Showcase, { Item } from "@/components/Showcase";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const dummyItem: Item = {
  name: "Pikachu",
  altText: "Pikachu",
  sprites: {
    default: "/assets/image.png",
  },
  cost: "",
};
export default function Home() {
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
        <Showcase/>
        <Link href={"/pokemart"} className="flex flex-col">
          <Button className="flex  self-center text-xl my-4 scale-125">
            Go to the store!
          </Button>
        </Link>{" "}
      </section>
    </main>
  );
}
