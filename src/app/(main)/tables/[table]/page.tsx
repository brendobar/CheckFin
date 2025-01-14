import {Metadata} from "next";
import {TableOperations} from "@/widgets/tables";


type PageProps = {
    params: {
        table: string
    }
}

export const metadata: Metadata = {
    title: 'Your AI images',
    keywords: 'ai images',
}

const TablePage = ({ params: { table } }: PageProps) => {
    return (
        <div>
            <TableOperations tableId={table}/>
        </div>
    );
};

export default TablePage;