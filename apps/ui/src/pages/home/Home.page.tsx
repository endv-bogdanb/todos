import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      {t("Welcome to React")} Home page{" "}
      <Link to="/todos">{t("todoTable.title")}</Link>
    </>
  );
};
