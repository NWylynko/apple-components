import React, { useState } from "react";
import { render } from "react-dom";
import "./style.css";

interface Data {
  label: string;
  price: number;
}

const Moneyformatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function App(): JSX.Element {
  const clicked = (id: number) => setSelected;

  const [data, setData] = useState<Data[]>([
    {
      label: "3.5Ghz 8-core Intel Xeon W processor, Turbo Boost up to 4.0GHz",
      price: 0
    },
    {
      label: "3.3Ghz 12-core Intel Xeon W processor, Turbo Boost up to 4.4Ghz",
      price: 1000
    },
    {
      label: "3.2Ghz 16-core Intel Xeon W processor, Turbo Boost up to 4.4GHz",
      price: 2000
    },
    {
      label: "2.7Ghz 24-core Intel Xeon W processor, Turbo Boost up to 4.4GHz",
      price: 6000
    },
    {
      label: "2.5Ghz 24-core Intel Xeon W processor, Turbo Boost up to 4.4GHz",
      price: 7000
    }
  ]);

  const [selected, setSelected] = useState<number>(0);

  return (
    <div>
      <Options data={data} setSelected={setSelected} selected={selected} />
    </div>
  );
}

interface Options {
  data: Data[];
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  selected: number;
}

function Options({ data, setSelected, selected }: Options): JSX.Element {
  return (
    <div className={"optionsContainer"}>
      {data.map((value, index, data) => (
        <Option
          {...value}
          selected={selected}
          setSelected={setSelected}
          index={index}
          data={data}
        />
      ))}
    </div>
  );
}

interface Option {
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  selected: number;
  data: Data[];
}

function Option({
  label,
  price,
  selected,
  setSelected,
  index,
  data
}: Data & Option): JSX.Element {
  const selectedStyled = {
    borderColor: "#0070c9"
  };

  const unSelectedStyled = {
    borderColor: "lightgrey"
  };

  const hoveredStyle = {
    borderColor: "darkgrey"
  };

  const [hover, setHover] = useState(false);

  const relativePrice = price - data[selected].price;

  return (
    <div
      onClick={() => setSelected(index)}
      className={"optionContainer"}
      style={
        index === selected
          ? selectedStyled
          : hover
          ? hoveredStyle
          : unSelectedStyled
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className={"optionText"}>{label}</p>
      {relativePrice ? (
        <p className={"optionPrice"}>
          {relativePrice >= 0 ? "+" : "-"}{" "}
          {Moneyformatter.format(relativePrice).replace("-", "")}
        </p>
      ) : null}
    </div>
  );
}

render(<App />, document.getElementById("root"));
