type InputFormType = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  keyName: string;
  val: number | string;
  errorMessage: string;
};

export const InputForm: React.FC<InputFormType> = ({
  label,
  keyName,
  val,
  errorMessage,
  handleChange,
}) => {
  const callbackHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  return (
    <>
      <label>{label}</label>
      <input
        className={`form-text ${errorMessage.length ? "--error" : ""}`}
        name={keyName}
        value={val}
        onBlur={(e) => callbackHandleChange(e)}
        onChange={(e) => callbackHandleChange(e)}
        required
      />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </>
  );
};
