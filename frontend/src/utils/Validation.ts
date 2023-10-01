const r = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/;

export const inputValidation = (val: string) => {
  if (!val || val.length === 0) {
    return "必須入力です。";
  }

  if (r.test(val)) {
    return "";
  } else {
    return "数値を入力してください。";
  }
};
