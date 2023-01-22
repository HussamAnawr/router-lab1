import { Form, useActionData, redirect, json } from 'react-router-dom'
import { useNavigate, useNavigation } from 'react-router-dom'

import classes from './EventForm.module.css'

function EventForm({ method, event }) {
  const data = useActionData()
  const navigatation = useNavigation()
  const navigate = useNavigate()
  const isSubmitting = navigatation.state === 'submitting'
  function cancelHandler() {
    navigate('..')
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button disabled={isSubmitting} type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>{isSubmitting ? 'Submitting' : 'Save'}</button>
      </div>
    </Form>
  )
}

export default EventForm

export const action = async ({ request, params }) => {
  const method = request.method

  let url = 'http://127.0.0.1:8080/events/'
  if (method === 'PATCH') {
    const eventId = params.eventId
    url = 'http://127.0.0.1:8080/events/' + eventId
  }

  const data = await request.formData()
  const event = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }

  const respone = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })

  if (respone.status === 422) {
    return respone
  }

  if (!respone.ok) {
    throw json({ message: 'Could not edit events' }, { status: respone.status })
  } else {
    return method === 'POST'
      ? redirect('/events')
      : redirect('/events/' + params.eventId)
  }
}
