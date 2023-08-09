import TableHead from "../../components/shared/table/TableHead";
import TableItem from "../../components/shared/table/TableItem";
import AddWidget from "../../components/widget/AddWidget";
import Widget from "../../components/widget/Widget";
import api from "../../services/api-client/api";
import { Expense, ExpensesResponse } from "./types.expenses";

const Expense = ({ expenses, balance }: ExpensesResponse) => {
    return (
        <div className="flex p-4 gap-2">
            <div className="w-1/4 sm:w-[10%] gap-4 flex flex-col">
                <AddWidget type="expense" />
                <Widget type="despesas" data={{ description: 'Despesas', amount: balance.totalExpense }} />
                <Widget type="rendimentos" data={{ description: 'Rendimentos', amount: balance.totalIncome }} />
                <Widget type="saldo" data={{ description: 'Saldo', amount: balance.totalBalance }} />
            </div>
            <div className={'flex flex-1 flex-col gap-3'}>
                <TableHead />
                {expenses.map((expense, index) => (
                    <TableItem key={index} data={expense} />
                ))}
            </div>
        </div>

    );
};

// This gets called on every request
export async function getServerSideProps(ctx: any) {
    try {
        const cookie = ctx.req.headers.cookie;
        if (!cookie) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }


        // Fetch data from external API
        const apiClient = api(ctx);
        const { data } = await apiClient.get('/expense');

        const expenses = data.data.map((expense: Expense) => {
            return {
                ...expense,
                date: new Date(expense.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                }),
                link: `/expense/${expense.id}`,
            };
        })

        // Pass data to the page via props
        return { props: { expenses, balance: data.balance } };

    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}

export default Expense;
