export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <main className="container mx-auto max-w-7xl  px-6 flex-grow">
        {children}
      </main>
    </section>
  );
}
