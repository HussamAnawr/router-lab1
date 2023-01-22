import EventForm from '../components/EventForm'
import { useLoaderData, json, redirect } from 'react-router-dom'

const NewEventPage = () => {
  return (
    <>
      <EventForm method={'post'} />
    </>
  )
}

export default NewEventPage

export const action = async ({ request, params }) => {
  const data = await request.formData()
  const event = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }
  const respone = await fetch('http://127.0.0.1:8080/events', {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })

  if (respone.status === 422) {
    return respone
  }
  if (!respone.ok) {
    throw json(
      { message: 'Could not add the new event' },
      { status: respone.status },
    )
  } else {
    return redirect('/events')
  }
}
