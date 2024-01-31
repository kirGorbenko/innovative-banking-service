import React, {type FC, useState} from "react";

import {useGetCurrenciesQuery} from "@redux/services/entry";

import {Select} from "@components/Select/Select";

import "./styles.css";

type TSelectedCurrency = string;

const Main: FC = () => {
  const [selectedCurrency, setSelectedCurrency] =
    useState<TSelectedCurrency>("");

  const {data} = useGetCurrenciesQuery("currencies");

  const defaultOptions = data?.data.map(currency => currency.id) ?? [""];
  const currencyId = selectedCurrency || data?.data?.[0].id;
  const currencyName =
    data?.data?.find(currency => currency.id === selectedCurrency)?.name ??
    data?.data?.[0].name;

  const handleSelect = (value: TSelectedCurrency): void => {
    setSelectedCurrency(value);
  };

  return (
    <div className="main">
      <div className="container">
        <h1 className="title">
          <span>CAT</span>
          <span className="subtitle">{`currencies\nacademic\nterms`}</span>
        </h1>
        <Select
          value={currencyId}
          options={defaultOptions}
          handleSelect={handleSelect}
        />
        <img className="image" src="/kitten.png" alt="Kitten" />
      </div>
      <div className="currency-container">
        <span>{currencyName}</span>
      </div>
    </div>
  );
};

export default Main;
