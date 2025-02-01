import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/books/get-recent-books");
                setData(response.data.data || response.data.books); 
            } catch (error) {
                console.error("Error fetching data:", error); 
            }finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <div className="mt-8 px-4">
            <h4 className="text-3xl text-yellow-100">Recently added books</h4>
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
    );
};

export default RecentlyAdded;
