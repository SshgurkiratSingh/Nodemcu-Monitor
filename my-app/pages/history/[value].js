import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const router = useRouter();
  const { value } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/history/${value}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, [value]);

  return (
    <div>
      <center>
        <h1 className="text-3xl font-bold ">History Page of {value}</h1>
        {data ? (
          <div className="overflow-x-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr className="hover" key={index}>
                    <th>{index + 1}</th>
                    <td>Value: {entry.value}</td>
                    <td>Date: {entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </center>
    </div>
  );
}
