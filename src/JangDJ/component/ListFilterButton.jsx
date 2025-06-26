import {useState} from "react";
import ListFilter from "../ListFilter.jsx";
import { SlidersHorizontal } from "lucide-react";

function ListFilterButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex gap-2 text-sm border px-4 py-1.5 rounded-full hover:bg-gray-100"
            >
                필터 <span><SlidersHorizontal className="w-4 h-4" /></span>
            </button>
            <ListFilter open={open} close={() => setOpen(false)} />
        </>
    );
}

export default ListFilterButton