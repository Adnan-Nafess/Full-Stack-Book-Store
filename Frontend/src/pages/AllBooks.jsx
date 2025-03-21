import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";

const AllBooks = () => {

  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://full-stack-book-store-gamma.vercel.app/api/v1/books/get-all-books"
        );
        setData(response.data.data || response.data.books); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []); 

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100">All books</h4>
      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {data && data.length > 0 ? (
            data.map((book, id) => (
              <div key={id}>
                <BookCard data={book} />
              </div>
            ))
          ) : (
            <p className="text-white">No books available.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default AllBooks