/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classnames from "classnames";
import React, { useMemo, useState } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
import css from "./style.css";

export default function SwitchButton(props) {

  const [status, set_status] = useState(true);

  const button_class = useMemo(() => classnames({
    [css.button]: true,
    [css.active]: status
  }), [status]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div htmlFor="SwitchButton" className={css.switch}>
        <div className={button_class} onClick={() => set_status(!status)}>
          <div className={css.light} />
          <div className={css.dots} />
          <div className={css.characters} />
          <div className={css.shine} />
          <div className={css.shadow} /></div>
      </div>
    </div>
  )
};


SwitchButton.propTypes = {


};
SwitchButton.defaultProps = {


};