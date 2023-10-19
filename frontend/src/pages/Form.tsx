import { InputParamType, ErrorMessageType } from "../../types/type";
import { inputValidation, complexValidation } from "../utils/Validation";
import { InputForm } from "../components/InputForm";

type JuliaFormType = {
  onSubmit: () => void;
  loading: boolean;
  params: InputParamType;
  setParams: React.Dispatch<React.SetStateAction<InputParamType>>;
  messages: ErrorMessageType;
  setMessages: React.Dispatch<React.SetStateAction<ErrorMessageType>>;
};
export const Form: React.FC<JuliaFormType> = ({
  onSubmit,
  loading,
  params,
  setParams,
  messages,
  setMessages,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    const error =
      key === "comp_const" ? complexValidation(value) : inputValidation(value);

    setParams({ ...params, [key]: value });
    setMessages({ ...messages, [key]: error });
  };

  const callbackOnSubmit = () => {
    onSubmit();
  };

  return (
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
          onClick={callbackOnSubmit}
        />
      </ul>
    </form>
  );
};
