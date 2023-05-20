import DataWidget from "../../components/widget/DataWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <DataWidget
          heading="Sensor 1"
          description="Potentimeter Value From Nodemcu"
          value={900}
          maxValue={1024}
          unit="kg"
        />
      </div>
    </main>
  );
}
