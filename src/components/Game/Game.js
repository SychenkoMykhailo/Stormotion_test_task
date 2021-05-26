import React, { useState } from "react";
import css from "./Game.module.css";

function Game() {
  // State
  const [total, setTotal] = useState(25);
  const [userStack, setUserStack] = useState(0);
  const [computerStack, setComputerStack] = useState(0);
  const [acting, setActing] = useState(false);

  // Functions
  const optimalAction = (a, b) => a / 4 - ~~(a / 4) === b / 4 - ~~(b / 4);
  const computerAction = (newTotal) => {
    let take;
    for (let i = 1; i <= 3; i += 1) {
      if (i % 2) {
        if (optimalAction(newTotal - i, 1) || optimalAction(newTotal - i, 0)) {
          take = i;
          break;
        }
      }
    }
    if (total - take >= 0) {
      setTotal(newTotal - take);
      setComputerStack(computerStack + take);
    }
    setActing(false);
  };

  const userAction = (value) => {
    if (total >= value && !acting) {
      setTotal(total - value);
      setUserStack(userStack + value);
      if (total - value !== 0) {
        setActing(true);
      }
      setTimeout(
        () => computerAction(total - value),
        ~~(Math.random() * 1000) + 1000
      );
    }
  };
  //=================================================================
  const userActions = [1, 2, 3];
  return (
    <div className={css.container}>
      <div className={css.stack_container}>
        <div className={css.user_stack}>
          <div>{total === 0 ? "😭" : "😃"}</div>
          <div>{userStack}</div>
        </div>
        <div className={css.totalstack}>{total}</div>
        <div className={css.comp_stack}>
          {acting && <div className={css.acting}>hmm...</div>}
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
