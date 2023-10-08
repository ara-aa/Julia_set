const numPattern = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/;
const n = /[+-]?(\d+(\.\d+)?)+[+-](\d+(\.\d+)?)[i]$/;
// const n = /[+-]?(\d+(\.\d+)?)+[ ]+[+-](\d+(\.\d+)?)[i]$/;
// const compPattern = /^([+,-])|(\d+(\.\d+)?)?[ ]+[+,-](\d+(\.\d+)?)?[i]$/;

export const inputValidation = (val: string) => {
  if (!val || val.length === 0) {
    return "必須入力です。";
  }

  if (numPattern.test(val)) {
    return "";
  } else {
    return "数値を入力してください。";
  }
};

export const complexValidation = (val: string) => {
  if (!val || val.length === 0) {
    return "必須入力です。";
  }

  if (n.test(val)) {
    return "";
  } else {
    return "〇(半角スペース)＋△i の形で入力してください。";
  }
};
