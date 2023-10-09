import React, { useState, useContext } from "react";
import Julia from "./Julia";
import { InputParamType, ErrorMessageType } from "../../types/type";
import { inputValidation, complexValidation } from "../utils/Validation";
import { ToastContext } from "../components/ToastProvider";
import { InputForm } from "../components/InputForm";
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
    const error =
      key === "comp_const" ? complexValidation(value) : inputValidation(value);

    setParams({ ...params, [key]: value });
    setMessages({ ...messages, [key]: error });
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
        openToast("エラーが発生しました。");
      });
  };

  return (
    <>
      {loading && <Loading />}
      <form>
        <ul>
          <li>
            <InputForm
              label="実数部最小値 min_x"
              keyName="min_x"
              val={params.min_x}
              errorMessage={messages.min_x}
              handleChange={handleChange}
            />
          </li>
          <li>
            <InputForm
              label="実数部最大値 max_x"
              keyName="max_x"
              val={params.max_x}
              errorMessage={messages.max_x}
              handleChange={handleChange}
            />
          </li>
          <li>
            <InputForm
              label="虚数部最小値 min_y"
              keyName="min_y"
              val={params.min_y}
              errorMessage={messages.min_y}
              handleChange={handleChange}
            />
          </li>
          <li>
            <InputForm
              label="虚数部最大値 max_y"
              keyName="max_y"
              val={params.max_y}
              errorMessage={messages.max_y}
              handleChange={handleChange}
            />
          </li>
          <li>
            <InputForm
              label="複素定数 comp_const"
              keyName="comp_const"
              val={params.comp_const}
              errorMessage={messages.comp_const}
              handleChange={handleChange}
            />
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
