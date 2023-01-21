import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error accurred!";
  let message = "Something went worng";
  console.log(error.status);
  if (error.status === 500) {
    message = error.data.message;
  } else if (error.status === 404) {
    title = "404 not found";
    message = "Could not found the page you looking for!";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
