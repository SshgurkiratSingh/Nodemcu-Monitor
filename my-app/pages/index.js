import Head from "next/head";
import DataWidget from "../components/widget/DataWidget";
import { React, useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [val1, updateVal1] = useState("Fetching");
  const [val2, updateVal2] = useState("Fetching");
  const [val3, updateVal3] = useState("Fetching");
  const [val4, updateVal4] = useState("Fetching");
  const [date1, updateDate1] = useState("");
  const [date2, updateDate2] = useState("");
  let link =
    "https://expressjs-with-sheet-logging.gurkirat7092.repl.co/api/get";

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await fetch("/api/start");
        const json = await res.json();
        link = json.fetchServer;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchLink();

    const fetchData = async () => {
      try {
        const response = await fetch(link);
        const jsonData = await response.json();
        const data = await fetch("/api/getData");
        const customisation = await data.json();

        updateVal1(jsonData.value1);
        updateVal2(jsonData.value2);
        updateVal3(jsonData.value3);
        updateVal4(jsonData.value4);

        let date1j = new Date(jsonData.date1);
        let date2j = new Date(jsonData.date2);
        updateDate1(date1j.toLocaleString());
        updateDate2(date2j.toLocaleString());

        updateData(customisation);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const [data, updateData] = useState(null);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div>
        <center className="flex xl:items-center xl:justify-center">
          <div className="stats shadow">
            <div className="stat ">
              <div className="stat-title">Last Sensor 1 & 2 updated</div>
              <div className="stat-value">{date1}</div>
              <div className="stat-desc"></div>
            </div>
            <div className="stat">
              <div className="stat-title">Last Sensor 3 & 4 updated</div>
              <div className="stat-value">{date2}</div>
              <div className="stat-desc"></div>
            </div>
          </div>
        </center>
      </div>
      <div className="m-2" />
      <center className="xl:flex xl:items-center xl:justify-center block">
        <Link href="/history/value1">
          <DataWidget
            heading={data.sensor.value1.title}
            description={data.sensor.value1.description}
            value={val1}
            maxValue={data.sensor.value1.maxValue}
            unit={data.sensor.value1.unit}
            bar={true}
          />
        </Link>
        <Link href="/history/value2">
          <DataWidget
            heading={data.sensor.value2.title}
            description={data.sensor.value2.description}
            value={val2}
            maxValue={data.sensor.value2.maxValue}
            unit={data.sensor.value2.unit}
            bar={true}
          />
        </Link>
        <Link href="/history/value3">
          <DataWidget
            heading={data.sensor.value3.title}
            description={data.sensor.value3.description}
            value={val3}
            maxValue={data.sensor.value3.maxValue}
            unit={data.sensor.value3.unit}
            bar={true}
          />
        </Link>
        <Link href="/history/value4">
          <DataWidget
            heading={data.sensor.value4.title}
            description={data.sensor.value4.description}
            value={val4}
            maxValue={data.sensor.value4.maxValue}
            unit={data.sensor.value4.unit}
            bar={true}
          />
        </Link>
      </center>
    </div>
  );
}
