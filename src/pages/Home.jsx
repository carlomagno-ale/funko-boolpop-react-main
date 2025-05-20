import Jumbo from "../components/smart/Jumbo";
import HomeCarousels from "../components/smart/HomeCarousels";

export default function Home() {
  return (
    <>
      <Jumbo />

      <main className="debug">
        <HomeCarousels />

      </main>
    </>
  );
}
