import * as React from "react";

const Form: React.FC = () => {
  return (
    <form>
      <ul>
        <li>
          <label>実数部最小値 min_x</label>
          <input className="form-text" name="min_x" />
        </li>
        <li>
          <label>実数部最大値 max_x</label>
          <input className="form-text" name="max_x" />
        </li>
        <li>
          <label>虚数部最小値 min_y</label>
          <input className="form-text" name="min_y" />
        </li>
        <li>
          <label>虚数部最大値 max_y</label>
          <input className="form-text" name="max_y" />
        </li>
        <li>
          <label>複素定数 comp_const</label>
          <input className="form-text" name="comp_const" />
        </li>
        <input type="submit" className="form-submit-button" value="描画" />
      </ul>
    </form>
  );
};

export default Form;
