import { useEffect, useState } from "react";
import { showBook } from "../../../_services/books";
import { useNavigate, useParams } from "react-router-dom";
import { bookImageStorage } from "../../../_api";
import { createTransaction } from "../../../_services/transaction";

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchData = async () => {
      const [bookData] = await Promise.all([showBook(id)]);

      setBook(bookData);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const payload = {
        book_id: id,
        quantity: quantity,
      }
      await createTransaction(payload);
      alert("pembelian berhasil")
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="mx-auto h-full "
                src={`${bookImageStorage}/${book.cover_photo}`}
                alt=""
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {book.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Rp{book.price}
                </p>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Jumlah
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 block w-12 px-2 py-1 border border-gray-300 rounded-md shadow-sm dark:bg-white dark:border-gray-400 dark:text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white mt-4 sm:mt-0 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center"
                  >
                    Beli Sekarang
                  </button>
                </form>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p class="mb-6 text-gray-500 dark:text-gray-400">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
