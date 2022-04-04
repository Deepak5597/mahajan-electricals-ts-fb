import { FC, useState } from "react";

interface IPaginatedTableProps {
    data: any[]
}

const PaginatedTable: FC<IPaginatedTableProps> = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    return (
        <div>PaginatedTable</div>
    )
}

export default PaginatedTable