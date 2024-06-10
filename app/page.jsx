import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import MyCard from "@/components/mycard";
import { Image } from "@nextui-org/image";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center mt-8">
        <h1 className={`${title({ color: "" })} text-gradient whitespace-nowrap`}>
          최저가로, 최적의 성능만.
        </h1> 
      </div>
      <Image
                src="/spoid_logo.png"
                alt="SPOID Logo"
                width={1200}
                height={600}
              />
    </section>
  );
}
