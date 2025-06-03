import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";

export default function Books() {

   const [books, setBooks] = useState([]);
   const [genres, setGenres] = useState([]);
   const [authors, setAuthors] = useState([]);

 
   useEffect(() => {
     const fetchData = async () => {
       const [booksData, genresData, authorsData] = await Promise.all ([
         getBooks(),
         getGenres(),
         getAuthors(),
       ])
 
       setBooks(booksData)
       setGenres(genresData)
       setAuthors(authorsData)
     }
 
     fetchData()
   }, [])
 
   const getGenresName = (id) => {
     const genre = genres.find((genre)=> genre.id === id)
     return genre ? genre.name : "unknown Genre"
   }
 
   const getAuthorsName = (id) => {
     const author = authors.find((author)=> author.id === id)
     return author ? author.name : "unknown author"
   }


  
  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-10 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {books.length > 0 ?
             books.map((book) => (
            <div key={book.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="h-56 w-full">
                <Link to={`books/show/${book.id}`}>
                  <img
                    className="mx-auto h-full "
                    src={`${bookImageStorage}/${book.cover_photo}`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="pt-6">
                <Link
                  to={`books/show/${book.id}`}
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                >
                  {book.title}
                </Link>

                <ul className="mt-2 flex items-center gap-4">
                  <li className="flex items-center gap-2">

                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {getGenresName(book.genre_id)}
                    </p>
                  </li>

                  <li className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {getAuthorsName(book.author_id)}
                    </p>
                  </li>
                </ul>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
                    Rp{book.price}
                  </p>

                  <Link
                    to={`books/show/${book.id}`} className="inline-flex items-center rounded-lg bg-indigo-700 px-4 py-4 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4  focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    view details
                  </Link>
                </div>
              </div>
            </div>
            )) : (
              <p>No books found</p>
            )}
          <div className="w-full text-center">
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Show more
            </button>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
