import { type FC } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const NavLayout: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <Link
          to=""
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line no-magic-numbers
            navigate(-1);
          }}
        >
          back
        </Link>
      </nav>
      <Outlet />
    </>
  );
};
