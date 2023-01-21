import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {
  const data = useRouteLoaderData("events-detail");

  return <EventForm event={data.event} />;
};

export default EditEventPage;
