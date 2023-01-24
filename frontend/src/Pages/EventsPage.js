import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading ... !</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      { message: "Could not Fetch the events" },
      { status: response.status }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
