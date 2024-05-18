import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { BOOK_ADDED, ALL_BOOKS, FAVORITE } from "./queries/query";
import { useQuery } from "@apollo/client";
import { useSubscription } from '@apollo/client'
import { updateCacheAllBooks } from './utils'

const App = () => {
  const [page, setPage] = useState("authors");
  const [user, setUser] = useState(null);
  const client = useApolloClient()

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    client.resetStore();
  }

  const favoriteResult = useQuery(FAVORITE)

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('user'))
    if(userLocal) setUser(userLocal)
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      updateCacheAllBooks(client, ALL_BOOKS, bookAdded)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { user && <button onClick={() => setPage("add")}>add book</button> } 
        { user && <button onClick={() => setPage("recommended")}>recommended</button> }
        { user ? <button onClick={ handleLogout }>Logout</button> : <button onClick={() => setPage("login")}>Login</button> }
      </div>

      <Authors show={page === "authors"} user={user}/>

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      { !favoriteResult.loading && user && <Recommended show={page === "recommended"} favoriteResult={favoriteResult} /> }

      <LoginForm show={page === "login"} setUser={setUser} />
    </div>
  );
};

export default App;
