import {Metadata} from "next";
import {TableOperations} from "@/widgets/tables";


export const metadata: Metadata = {
    title: 'Table',
}

const TablePage = async (props: { params: Promise<{ table: string }> }) => {
    const params = await props.params;
    const { table } = params;
    return (
        <div>
            <TableOperations tableId={table}/>
        </div>
    );
};

export default TablePage;