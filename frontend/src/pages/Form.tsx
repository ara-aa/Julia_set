import React, { useState, useContext } from "react";
import Julia from "./Julia";
import { InputParamType, ErrorMessageType } from "../../types/type";
import { inputValidation, complexValidation } from "../utils/Validation";
import { ToastContext } from "../components/ToastProvider";
import { Loading } from "../components/Loading";
import { initParams } from "../../../common/const";

const Form: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<InputParamType>(initParams);
  const [messages, setMessages] = useState<ErrorMessageType>(initParams);
  const [juliaRows, setJuliaRows] = useState<number[][]>([]);
  const [count, setCount] = useState<number>(0);
  const showToast = useContext(ToastContext);

  const openToast = (msg: string) => {
    showToast && showToast(msg);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setParams({ ...params, [key]: value });
    setMessages({
      ...messages,
      [key]:
        key === "comp_const"
          ? complexValidation(value)
          : inputValidation(value),
    });
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
    if (!canSubmit) {
      return;
    }

    setLoading(true);
    await calcJulia();
    setLoading(false);
  };

  const calcJulia = async () => {
    await fetch("/julia", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        if (data.errorMessage) {
          openToast(data.errorMessage);
        } else if (data.rows) {
          setJuliaRows(() => data.rows);
          setCount(() => count + 1);
        } else {
          openToast("サーバーエラーです。");
        }
      })
      .catch((error) => {
        setLoading(false);
        openToast("エラーが発生しました。");
      });
  };

  return (
    <>
      {loading && <Loading />}
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
              onBlur={(e) => handleChange(e)}
              onChange={(e) => handleChange(e)}
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
      {juliaRows.length > 0 && <Julia juliaRows={juliaRows} count={count} />}
    </>
  );
};

export default Form;
