import Head from "next/head";

import DataWidget from "../components/widget/DataWidget";
import { React, useState, useEffect } from "react";
const data = require("../customisation.json");
export default function Home() {
  const [val1, updateVal1] = useState(550);
  const [val2, updateVal2] = useState(102);
  const [val3, updateVal3] = useState(1003);
  const [val4, updateVal4] = useState(300);
  const [date1, updateDate1] = useState("");
  const [date2, updateDate2] = useState("");
  let link = "http://localhost:3000/api/get";
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

        updateVal1(jsonData.value1);
        updateVal2(jsonData.value2);
        updateVal3(jsonData.value3);
        updateVal4(jsonData.value4);

        let date1j = new Date(jsonData.date1);
        let date2j = new Date(jsonData.date2);
        updateDate1(date1j.toLocaleString());
        updateDate2(date2j.toLocaleString());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
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
        <DataWidget
          heading={data.sensor.s1.title}
          description={data.sensor.s1.description}
          value={val1}
          maxValue={data.sensor.s1.maxValue}
          unit={data.sensor.s1.unit}
          bar={true}
        />
        <DataWidget
          heading={data.sensor.s2.title}
          description={data.sensor.s2.description}
          value={val2}
          maxValue={data.sensor.s2.maxValue}
          unit={data.sensor.s2.unit}
          bar={true}
        />
        <DataWidget
          heading={data.sensor.s3.title}
          description={data.sensor.s3.description}
          value={val3}
          maxValue={data.sensor.s3.maxValue}
          unit={data.sensor.s3.unit}
          bar={true}
        />
        <DataWidget
          heading={data.sensor.s4.title}
          description={data.sensor.s4.description}
          value={val4}
          maxValue={data.sensor.s4.maxValue}
          unit={data.sensor.s4.unit}
          bar={true}
        />
      </center>
    </div>
  );
}
