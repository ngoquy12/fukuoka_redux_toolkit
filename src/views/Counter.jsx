import { useDispatch, useSelector } from "react-redux";
import {
  decrease,
  increase,
  randomNumber,
  resetNumber,
} from "../redux/slices/counter.slice";

export default function Counter() {
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state);

  const handleIncrease = () => {
    // Gọi hàm increase trong counterSlice
    dispatch(increase());
  };

  const handleDecrease = () => {
    // Gọi hàm decrease trong counterSlice
    dispatch(decrease());
  };

  const handleRandom = () => {
    const random = Math.ceil(Math.random() * 1000);
    // Gọi hàm randomNumber trong counterSlice
    dispatch(randomNumber(random));
  };

  const handleReset = () => {
    // Gọi hàm resetNumber trong counterSlice
    dispatch(resetNumber());
  };
  return (
    <div>
      <h2>Count: {counter}</h2>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
      <button onClick={handleRandom}>Random</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
