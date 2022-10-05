import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { api } from './api';

export default function App() {
  const [searchText, setSearchText] = useState<string>('');
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [errors, setErrors] = useState<string>('')

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchText) {
      const apiForSearchingMovies = `/search/movie?api_key=1a615a2e5ae08a82df318ab0a97e8b51&language=en-US&query=${searchText}&page=1&include_adult=false`
      api.get(apiForSearchingMovies).then((res: any) => {
        console.log(res.data?.results, "data")
        setUpcomingMovies(res.data?.results)
      }).catch((err) => console.log(err))
    } else {
      setUpcomingMovies((prevData) => prevData)
    }
  }



  useEffect(() => {
    api.get("/movie/upcoming?api_key=1a615a2e5ae08a82df318ab0a97e8b51&language=en-US&page=1").then((response) => {
      if (response.data && response.data.results) {
        setUpcomingMovies(response.data.results)
      }
    }).catch((err) => {

      if (err.response?.status === 404) {
        setErrors('Data not found!')
      }
    })
  }, [])

  return (
    <main className="app">
      <Form onSubmit={handleSearch} className="searchBarWrapper">
        <Form.Group className="mb-3 mr-3 searchBox">
          <Form.Control type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </Form.Group>
        <Button type="submit" className="submitButton ml-2">
          Submit
        </Button>
      </Form>
      {
        errors ? <span>{errors}</span> : <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMovies?.slice(0, 10).map((movie, index) => (<tr key={index}>
              <td>{index + 1}</td>
              <td>{movie.title}</td>
              <td>{movie.popularity}</td>
            </tr>))}
          </tbody>
        </Table>
      }

    </main>
  )
}