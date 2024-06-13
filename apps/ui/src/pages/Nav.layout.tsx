import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const NavLayout: FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
          {t("back")}
        </Link>
        &nbsp;
        <Link
          to=""
          onClick={(event) => {
            event.preventDefault();
            if (i18n.language === "ro") {
              void i18n.changeLanguage("en");
            } else {
              void i18n.changeLanguage("ro");
            }
          }}
        >
          {i18n.language === "ro" ? "en" : "ro"}
        </Link>
      </nav>
      <Outlet />
    </>
  );
};
