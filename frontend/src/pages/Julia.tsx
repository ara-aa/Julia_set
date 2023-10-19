import { useState, useEffect, useContext } from "react";
import { width, height } from "../../../common/const";
import { ToastContext } from "../components/ToastProvider";
import { Loading } from "../components/Loading";

const Julia = (props: { png: string | null }) => {
  const png = props.png;
  return (
    <>
      <div className="julia">{png && <img alt="julia_set" src={png} />}</div>
    </>
  );
};

export default Julia;
