import { type FC } from "react";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  return (
    <>
      Home page <Link to="/todos">todos table</Link>
    </>
  );
};
