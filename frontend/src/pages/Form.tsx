import React, { useState, useContext } from "react";
import * as math from "mathjs";
import { InputParamType, ErrorMessageType } from "../../types/type";
import { inputValidation, complexValidation } from "../utils/Validation";
import { ToastContext } from "../components/ToastProvider";

const Form: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<InputParamType>({
    min_x: "",
    max_x: "",
    min_y: "",
    max_y: "",
    comp_const: "",
  });
  const [messages, setMessages] = useState<ErrorMessageType>({
    min_x: "",
    max_x: "",
    min_y: "",
    max_y: "",
    comp_const: "",
  });
  const showToast = useContext(ToastContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setParams({ ...params, [key]: value });
    setMessages({ ...messages, [key]: inputValidation(value) });
  };

  const handleCompChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setParams({ ...params, [key]: value });
    setMessages({ ...messages, [key]: complexValidation(value) });
  };

  const checkRequired = (): boolean => {
    let canSubmit = true;
    for (const [key, value] of Object.entries(params)) {
      if (value === "") {
        canSubmit = false;
        setMessages((prevMessages) => {
          return { ...prevMessages, [key]: "必須入力です。" };
        });
      }
    }
    return canSubmit;
  };

  const onSubmit = async () => {
    const canSubmit = checkRequired();

    console.log(messages);
    console.log(canSubmit);
    if (!canSubmit) {
      return;
    }

    // setParams({ ...params, comp_const: math.complex(params.comp_const) });
    setLoading(true);
    await s();
    setLoading(false);
  };

  const s = async () => {
    console.log("??");
    await fetch("/julia", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          if (response.status === 412) {
            openToast("描画できない入力でした。");
          } else {
            openToast("サーバーエラーです。");
          }
        }
        // openToast("poyo.....");
        console.log(response.status);
        setLoading(false);
        response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        setLoading(false);
        openToast(error);
      });
  };

  const openToast = (msg: string) => {
    console.log(msg);
    showToast && showToast(msg);
  };

  return (
    <form>
      <ul>
        <li>
          <label>実数部最小値 min_x</label>
          <input
            className={`form-text ${messages.min_x.length ? "--error" : ""}`}
            name="min_x"
            value={params.min_x}
            onBlur={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
            required
          />
          {messages.min_x && <p className="error-text">{messages.min_x}</p>}
        </li>
        <li>
          <label>実数部最大値 max_x</label>
          <input
            className={`form-text ${messages.max_x.length ? "--error" : ""}`}
            name="max_x"
            value={params.max_x}
            onBlur={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
            required
          />
          {messages.max_x && <p className="error-text">{messages.max_x}</p>}
        </li>
        <li>
          <label>虚数部最小値 min_y</label>
          <input
            className={`form-text ${messages.min_y.length ? "--error" : ""}`}
            name="min_y"
            value={params.min_y}
            onBlur={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
            required
          />
          {messages.min_y && <p className="error-text">{messages.min_y}</p>}
        </li>
        <li>
          <label>虚数部最大値 max_y</label>
          <input
            className={`form-text ${messages.max_y.length ? "--error" : ""}`}
            name="max_y"
            value={params.max_y}
            onBlur={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
            required
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
            value={params.comp_const as string}
            onBlur={(e) => handleCompChange(e)}
            onChange={(e) => handleCompChange(e)}
            required
          />
          {messages.comp_const && (
            <p className="error-text">{messages.comp_const}</p>
          )}
        </li>
        <input
          type="submit"
          className="form-submit-button"
          value="描画"
          disabled={loading}
          onClick={onSubmit}
        />
      </ul>
    </form>
  );
};

export default Form;
