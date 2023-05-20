import Head from "next/head";

import DataWidget from "../components/widget/DataWidget";
import { React, useState, useEffect } from "react";

export default function Home() {
  const [val1, updateVal1] = useState(550);
  const [val2, updateVal2] = useState(102);
  const [val3, updateVal3] = useState(550);
  const [val4, updateVal4] = useState(550);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get");
        const jsonData = await response.json();
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="m-2" />
      <center className="xl:flex xl:items-center xl:justify-center block">
        <DataWidget
          heading="Data Widget"
          description="This is a sample data widget."
          value={val1}
          maxValue={1024}
          unit="v"
          bar={true}
        />
        <DataWidget
          heading="Data Widget"
          description="This is a sample data widget."
          value={val2}
          maxValue={1024}
          unit="v"
          bar={true}
        />
      </center>
    </div>
  );
}
