import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
    const [favourite, setFavourite] = useState([]); // Initialize as an array
    const [loading, setLoading] = useState(true);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/favourites/get-favourite-books",
                    { headers }
                );
                setFavourite(response.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); // Turn off loading
            }
        };
        fetch();
    }, [favourite]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {favourite && favourite.length === 0 && 
            <div className="text-5xl font-semibold text-zinc-500 flex items-center justify-center h-[100%] w-full">No Favourite Books</div>}
            <div className="grid md:grid-cols-4 gap-4">
            {favourite &&
                favourite.map((item, id) => (
                    <div key={id}>
                        <BookCard data={item} favourite={true} />
                    </div>
                ))}
            </div>
        </>   
    );
};

export default Favourites;
