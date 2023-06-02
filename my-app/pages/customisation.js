import React from "react";
import Head from "next/head";
import Link from "next/link";

const customisation = () => {
  const styleForForm = {
    backdropFilter: "blur(80px)",
    borderRadius: "10px",
  };
  return (
    <div>
      <center>
        <Head>
          <title>Form Page</title>
          {/* Add any required meta tags */}
        </Head>

        <div className="form-control w-full max-w-xs">
          <form
            className="form"
            style={styleForForm}
            action="/api/custom"
            method="POST"
          >
            <select
              id="sensor-select"
              name="select"
              className="select select-accent w-full max-w-xs"
            >
              <option value="value1">Sensor 1</option>
              <option value="value2">Sensor 2</option>
              <option value="value3">Sensor 3</option>
              <option value="value4">Sensor 4</option>
            </select>

            <label className="label-text" htmlFor="title">
              Title
            </label>
            <input
              name="title"
              id="title"
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
            />

            <label htmlFor="description" className="lb">
              Description
            </label>
            <input
              name="description"
              id="description"
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
            />

            <label htmlFor="unit" className="lb">
              Unit
            </label>
            <input
              name="unit"
              id="unit"
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
            />

            <label htmlFor="maxValue" className="lb">
              Max Value
            </label>
            <input
              name="maxValue"
              id="maxValue"
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
            />

            <div className="m-2">
              <br />

              <button id="send" className="btn btn-outline" type="submit">
                Send
              </button>
              <button id="limpar" className="btn btn-outline" type="reset">
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className="form-control w-full max-w-xs"></div>
      </center>
    </div>
  );
};

export default customisation;
