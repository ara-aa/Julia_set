import React, { useState } from "react";
import { ParamType } from "../types/type";
import { inputValidation } from "../utils/Validation";

const Form: React.FC = () => {
  const [params, setParams] = useState<ParamType>({
    values: {
      min_x: "",
      max_x: "",
      min_y: "",
      max_y: "",
      comp_const: "",
    },
    messages: {
      min_x: "",
      max_x: "",
      min_y: "",
      max_y: "",
      comp_const: "",
    },
    loading: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    const { values, messages } = params;

    setParams({
      values: { ...values, [key]: value },
      messages: { ...messages, [key]: inputValidation(value) },
      loading: false,
    });
  };

  const checkSubmit = (): void => {
    for (const [key, value] of Object.entries(params.values)) {
      console.log(key);
      if (value === "") {
        setParams({
          values: { ...params.values },
          messages: { ...params.messages, ...{ [key]: "必須入力です。" } },
          loading: false,
        });
      }
    }

    // const validMessage =
    //   Object.values(messages).filter((message) => {
    //     return message !== "";
    //   }).length === 0;
    // console.log(validMessage);

    // return validMessage && loading;
  };

  const onSubmit = () => {
    checkSubmit();

    const canSubmit =
      Object.values(params.messages).filter((message) => {
        return message !== "";
      }).length === 0;

    if (!canSubmit) {
      console.log("!");

      return;
    }
  };

  const { values, messages } = params;

  return (
    <form>
      <ul>
        <li>
          <label>実数部最小値 min_x</label>
          <input
            className={`form-text ${messages.min_x.length ? "--error" : ""}`}
            name="min_x"
            value={values.min_x}
            onChange={(e) => handleChange(e)}
          />
          {messages.min_x && <p className="error-text">{messages.min_x}</p>}
        </li>
        <li>
          <label>実数部最大値 max_x</label>
          <input
            className={`form-text ${messages.max_x.length ? "--error" : ""}`}
            name="max_x"
            value={values.max_x}
            onChange={(e) => handleChange(e)}
          />
          {messages.max_x && <p className="error-text">{messages.max_x}</p>}
        </li>
        <li>
          <label>虚数部最小値 min_y</label>
          <input
            className={`form-text ${messages.min_y.length ? "--error" : ""}`}
            name="min_y"
            value={values.min_y}
            onChange={(e) => handleChange(e)}
          />
          {messages.min_y && <p className="error-text">{messages.min_y}</p>}
        </li>
        <li>
          <label>虚数部最大値 max_y</label>
          <input
            className={`form-text ${messages.max_y.length ? "--error" : ""}`}
            name="max_y"
            value={values.max_y}
            onChange={(e) => handleChange(e)}
          />
          {messages.max_y && <p className="error-text">{messages.max_y}</p>}
        </li>
        <li>
          <label>複素定数 comp_const</label>
          <input
            className={`form-text ${
              messages.comp_const.length ? "--error" : ""
            }`}
            name="comp_const"
            value={values.comp_const}
            onChange={(e) => handleChange(e)}
          />
          {messages.comp_const && (
            <p className="error-text">{messages.comp_const}</p>
          )}
        </li>
        <input
          type="submit"
          className="form-submit-button"
          value="描画"
          onClick={onSubmit}
        />
      </ul>
    </form>
  );
};

export default Form;
