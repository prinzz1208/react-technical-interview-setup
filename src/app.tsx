import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { api } from './api';

export default function App() {
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);

  useEffect(() => {
    api.get("/movie/upcoming?api_key=1a615a2e5ae08a82df318ab0a97e8b51&language=en-US&page=1").then((response) => {
      if (response.data.results) {
        setUpcomingMovies(response.data.results)
      }
    })
  }, [])

  return (
    <main className="app">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Enter movie name to search" />
        </Form.Group>
        <Button type="submit">
          Submit
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {upcomingMovies.slice(0,10).map((movie,index) => (<tr>
            <td>{index + 1}</td>
            <td>{movie.title}</td>
            <td>{movie.popularity}</td>
          </tr>) )}
        </tbody>
      </Table>
    </main>
  )
}