import { useEffect, useState } from "react";

export const Metrix = () => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource("");

    eventSource.onopen = () => {
      console.log("Connection to server is open");
    };

    eventSource.onerror = (err) => {
      console.log(
        `An error has occured with EventSurce connection: ${JSON.stringify(
          err
        )}`
      );
      setSrc(null);
    };

    eventSource.onmessage = (data) => {
      console.log("Data received from server:");
      console.log(data);
      // todo: validate data if needed
      if (data) {
        setSrc(data);
      }
    };

    return () => {
      eventSource.close();
      setSrc(null);
    };
  }, []);

  return (
    <div>
      <div>
        <button disabled={!!src}>Get metrics</button>
        <div>{src ? <img src={src} /> : <span>No data</span>}</div>
      </div>
    </div>
  );
};
