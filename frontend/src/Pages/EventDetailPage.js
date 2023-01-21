import { useRouteLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useRouteLoaderData("events-detail");

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const eventId = params.eventId;
  const response = await fetch("http://127.0.0.1:8080/events/" + eventId);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch this particular evet" },
      { status: response.status }
    );
  } else {
    return response;
  }
};
