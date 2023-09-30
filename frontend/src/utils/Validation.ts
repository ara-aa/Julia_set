const r = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/;

export const inputValidation = (val: string) => {
  if (!val) {
    return "必須入力です。";
  }

  if (r.test(val)) {
    return "";
  } else {
    return "数値を入力してください。";
  }
};
