import {Metadata} from "next";


type PageProps = {
    params: {
        table: number
    }
}

export const metadata: Metadata = {
    title: 'Your AI images',
    keywords: 'ai images',
}

const TablePage = ({ params: { table } }: PageProps) => {
    return (
        <div>
            Table: {table}
        </div>
    );
};

export default TablePage;