import classNames from "classnames";
import React, { useState } from "react";

import styles from "./ClickableTooltip.module.scss";

const ClickableTooltip = ({ place, copyText, children }) => {
  const [showCopied, setShowCopied] = useState(false);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(copyText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1000);
  };
  return (
    <div className={styles.ShowCopied}>
      {showCopied && (
        <div
          className={classNames(styles.CopiedText, {
            [styles.PlacePos]: place === "publish-table",
          })}
        >
          Copied
        </div>
      )}
      <div
        className={styles.CopyIconWrapper}
        onClick={() => {
          copyToClipBoard();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ClickableTooltip;
