import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SeachForm } from "./components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {
    return (
        <>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SeachForm />

                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width='50%'>Desenvolvimento de site</td>
                            <td>
                                <PriceHighLight variant="income">
                                    R$ 12000
                                </PriceHighLight>
                            </td>
                            <td>Venda</td>
                            <td>13/03/2023</td>
                        </tr>
                        <tr>
                            <td width='50%'>Desenvolvimento de site</td>
                            <td>
                                <PriceHighLight variant="outcome">
                                    -R$ 12000
                                </PriceHighLight>
                            </td>
                            <td>Venda</td>
                            <td>13/03/2023</td>
                        </tr>
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </>
    )
}