import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type RequestQuery = {
    month: string,
    year: string
}

const MonthMap = {
    'janeiro': 'january',
    'fevereiro': 'february',
    'março': 'march',
    'abril': 'april',
    'maio': 'may',
    'junho': 'june',
    'julho': 'july',
    'agosto': 'august',
    'setembro': 'september',
    'outubro': 'october',
    'novembro': 'november',
    'dezembro': 'december',

}

const Filter = () => {
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [queryData, setQueryData] = useState<RequestQuery | null>(null);
    const router = useRouter();
    useEffect(() => {
        if (queryData) {
            router.push({
                pathname: router.pathname,
                query: queryData
            });
        }
    }, [queryData])

    return (
        <div
            className={`flex flex-col gap-2 shadow-md rounded-md justify-between p-4`}
        >
            <LocalizationProvider adapterLocale={"pt-br"} dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Data"
                    value={date}
                    views={["month", "year"]}
                    onChange={(newValue: Dayjs) => {
                        setQueryData({
                            month: MonthMap[newValue.format('MMMM').toLocaleLowerCase()],
                            year: newValue.format('YYYY')
                        });

                        setDate(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                />
            </LocalizationProvider>
        </div>
    );
};

export default Filter;
