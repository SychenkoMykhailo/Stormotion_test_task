const optimalDecision = (a, b) => a / 4 - ~~(a / 4) === b / 4 - ~~(b / 4);
const optimalAction = (newTotal) => {
  for (let i = 1; i <= 3; i += 1) {
    if (i % 2) {
      if (
        optimalDecision(newTotal - i, 1) ||
        optimalDecision(newTotal - i, 0)
      ) {
        return i;
      }
    }
  }
};

export default optimalAction;
