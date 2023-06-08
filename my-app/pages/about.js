import React from "react";

export default function About() {
  return (
    <div className="dbse-m">
      <style>
        {`
          .dbse-m {
            height: 100vh;
            display: grid;
            place-items: center;
            margin: 0rem;
            overflow: hidden;  
            font-family: "Montserrat", sans-serif;
          }

          h1, h2, h3, p {
            margin: 0rem;
          }

          .dbse {
            width: 640px;
            position: relative;
            background-color: rgb(16 16 16);
            border: 1px solid rgb(255 255 255 / 10%);
            border-radius: 1.5rem;
            padding: 1rem;
          }
          .dbse:before {  
            content: "";
            height: 140px;
            width: 2px;  
            position: absolute;  
            right: -1px;
            top: 65%;
            transition: top, opacity;
            transition-duration: 600ms;
            transition-timing-function: ease;
            background: linear-gradient(
              transparent,
              red,
              transparent
            );
            opacity: 0;
          }

          .dbse:before {  
            top: 5%;
            opacity: 0;
          }

          .dbse:hover:before {
            top: 65%;
            opacity: 1;
          }
          .dbse:after {  
            content: "";
            height: 140px;
            width: 2px;  
            position: absolute;  
            left: -1px;
            top: 65%;
            transition: top, opacity;
            transition-duration: 600ms;
            transition-timing-function: ease;
            background: linear-gradient(
              transparent,
              red,
              transparent
            );
            opacity: 0;
          }

          .dbse:after {  
            top: 65%;
            opacity: 0;
          }

          .dbse:hover:after {
            top: 10%;
            opacity: 1;
          }

          .dbse-content {  
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            background-image: radial-gradient(
              rgba(116, 169, 217, 0.8) 1px, 
              transparent 1px
            );
            background-position: 50% 50%;
            background-size: 1.1rem 1.1rem;
            padding: 4rem;
            border-radius: 1.25rem;
            overflow: hidden;
          }

          .dbse-content > :is(h1, h3, p) {
            text-align: center;
          }

          .dbse-content > h1 {
            color: rgb(250 249 246); 
            font-size: 2.6rem;
          }

          .dbse-content > h3 {
            color: red;
            text-transform: uppercase;
            font-size: 0.76rem;
          }

          .dbse-content > p {
            color: rgb(255 255 255 / 75%);
            line-height: 1.5rem;
          }

          @media(max-width: 700px) {
            .dbse {
              width: calc(100% - 2rem);
              margin: 0rem 1rem;
              padding: 0.75rem;
              border-radius: 1rem;
            }
          }

          @media(max-width: 600px) {
            .dbse-content {
              padding: 3rem;
            }
  
            .dbse-content > h1 {
              font-size: 2.2rem;
            }
          }
        `}
      </style>
      <div className="dbse">
        <div className="dbse-content">
          <h3>About</h3>
          <h1>Sensor Monitoring </h1>
          <p>
            Data is obtained from an express.js server that operates as both a
            data store and an API to which nodemcu sends its values. The
            application is hosted on Vercel. The repository can be located on my
            GitHub account at{" "}
            <a
              className="font-bold text-red-500 hover:underline hover:text-white transition duration-500 ease-in-out"
              href="https://github.com/sshgurkiratsingh"
            >
              github.com/sshgurkiratsingh.
            </a>
            This website's functionality is capable of monitoring data from an
            ESP8266 sensor, inclusive of temperature, humidity, and light
            levels.Title and description modifications can be performed on this
            page, which can be accessed through the following{" "}
            <a
              className="font-bold text-red-500 hover:underline hover:text-white transition duration-500 ease-in-out"
              href="/customisation"
            >
              This Page
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
