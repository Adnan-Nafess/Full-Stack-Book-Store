import axios from "axios";
import { Link } from "react-router-dom";

const BookCard = ({ data, favourite }) => {

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const removeBookHandler = async () => {
    try {
      const response = await axios.put("http://localhost:3000/api/v1/favourites/delete-book-to-favourite", {}, {headers});
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    };
  }

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
    <Link to={`/book-details/${data._id}`}>
        <div className="">
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img
            src={data.url}
            alt={data.title || "Book Image"}
            className="h-[20vh] object-cover"
          />
        </div>
        <h2
          className="mt-4 text-xl text-white font-semibold text-ellipsis overflow-hidden"
          style={{ minHeight: "3rem" }} 
        >
          {data.title}
        </h2>
        <p
          className="mt-2 text-zinc-400 font-semibold text-ellipsis overflow-hidden"
          style={{ minHeight: "1.5rem" }}
        >
          by {data.author}
        </p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">${data.price}</p>
      </div>
    </Link>
    {favourite && (
    <button
      onClick={removeBookHandler}
      className="bg-yellow-100 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4">
      Remove from favourites
    </button>
    )}
    </div>
  );
};

export default BookCard;
