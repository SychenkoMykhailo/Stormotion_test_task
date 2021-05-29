import React, { useState, useEffect, useCallback } from "react";
import css from "./Game.module.css";
import optimalAction from "../Functions/optimalAction";

function Game() {
  // State
  const [userStack, setUserStack] = useState(0);
  const [computerStack, setComputerStack] = useState(0);
  const [acting, setActing] = useState("user");

  // Variables
  const total = 25 - userStack - computerStack;
  const userActions = [1, 2, 3];

  // Functions
  const computerAction = useCallback(
    (newTotal) => {
      const take = optimalAction(newTotal);
      if (total - take >= 0) {
        setComputerStack(computerStack + take);
      }
      setActing("user");
    },
    [computerStack, total]
  );

  const userAction = (value) => {
    if (total >= value && acting === "user") {
      setUserStack(userStack + value);
      if (total - value !== 0) {
        setActing("comp");
      }
    }
  };

  useEffect(() => {
    if (acting === "comp") {
      let timeout = setTimeout(() => {
        computerAction(total);
      }, ~~(Math.random() * 1000) + 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [computerAction, acting, total]);

  //=================================================================
  return (
    <div className={css.container}>
      <div className={css.stack_container}>
        <div className={css.user_stack}>
          <div>{total === 0 ? "😭" : "😃"}</div>
          <div>{userStack}</div>
        </div>
        <div className={css.totalstack}>{total}</div>
        <div className={css.comp_stack}>
          {acting === "comp" && <div className={css.acting}>hmm...</div>}
          <div>🤖</div>
          <div>{computerStack}</div>
        </div>
      </div>
      <div className={css.btn_container}>
        {userActions.map((act) => (
          <button key={act} onClick={() => userAction(act)} className={css.btn}>
            Take {act}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
