import JumboUi from "../dumb/Jumbo.ui";
import { useState, useEffect } from "react";

import Loader from "../dumb/Loader.ui";

export default function Jumbo() {
  const [funkos, setFunkos] = useState({
    state: "loading",
  });

  const page = 1;
  const limit = 5;

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFunkos({
          state: "success",
          data: data,
        });
      })
      .catch((err) => {
        setFunkos({
          state: "error",
          message: err.message,
        });
      });
  }, [page]);

  //logica per carosello

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (funkos.state == "success") {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === funkos.data.results.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(timer);
    }
  }, [funkos.state, currentIndex]);

  switch (funkos.state) {
    case "loading":
      return (
        <>
          <div className="text-center p-5">
            <Loader />
          </div>
        </>
      );
    case "error":
      return (
        <>
          <h1>{funkos.state}</h1>
          <p>{funkos.message}</p>
        </>
      );
    case "success":
      return (
        <>
          <JumboUi
            productList={funkos.data.results}
            slideIndex={currentIndex}
            setIndex={setCurrentIndex}
          />
        </>
      );
  }
}
