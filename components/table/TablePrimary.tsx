import { ChangeEvent, useEffect, useState } from "react";
import useTable from "./UseTable";
import styles from "./Table.module.css";
import { IoSearch } from "react-icons/io5";
import { FaAngleUp } from "react-icons/fa";
import { BLUE_PRIMARY, RED_ERROR } from "../../constant/COLORS";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import InputPrimary from "@/common/input/InputPrimary";
import SwitchButton from "@/common/button/SwitchButton";
import OutlineButton from "@/common/button/OutlineButton";

export type TableHead = {
    tHeadTiltle: string;
    cssTextAlign: 'center' | 'end' | 'left' | 'right' | 'start';
    key?: string;
};

export type Data = Record<string, any>;

export type FormattedDataKey = { keyName: string | undefined };

type TablePrimaryProps = {
    tableBodyDatas: Data[];
    tableHeaderDatas: TableHead[];
    keyValue: string;
    rowsPerPage: number;

    hasSwitchBtn: boolean;
    keySwitchBtn?: string;
    onClickSwitchBtn?: (id: string, value: boolean) => void;

    hasAction1: boolean;
    actionText1: string;
    onClickAction1: (id: string) => void;

    hasAction2: boolean;
    actionText2: string;
    onClickAction2: (id: string) => void;

    hasCheckBox: boolean;
    keyValueCheckBox?: string;
    onClickCheckBox?: (id: string, value: boolean) => void;
};

export default function TablePrimary({
    tableBodyDatas,
    tableHeaderDatas,
    rowsPerPage,
    keyValue,

    hasSwitchBtn,
    keySwitchBtn,
    onClickSwitchBtn,

    hasAction1,
    actionText1,
    onClickAction1,

    hasAction2,
    actionText2,
    onClickAction2,

    hasCheckBox,
    keyValueCheckBox,
    onClickCheckBox,
}: TablePrimaryProps) {
    const [page, setPage] = useState<number>(1);
    const [rawData, setRawData] = useState<Data[]>(tableBodyDatas);
    const [filteredData, setFilteredData] = useState<Data[]>(tableBodyDatas);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedRowPerPage, setSelectedRowPerPage] = useState<number>(rowsPerPage);
    const { slice, range } = useTable(filteredData, page, selectedRowPerPage);

    const [sortOrder, setSortOrder] = useState<string>("asc");
    const [sortedColumn, setSortedColumn] = useState(null);

    const rowOptions = [5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 9999];

    const formattedDataKeys = tableHeaderDatas
        .filter(({ key }) => key)
        .map(({ key }) => ({ keyName: key }));

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredData(rawData);
        } else {
            const filtered = rawData.filter((row) =>
                formattedDataKeys.some(
                    (key) =>
                        key.keyName &&
                        row[key.keyName]?.toString().toLowerCase().includes(query.toLowerCase())
                )
            );
            setFilteredData(filtered);
        }
    };

    const handleSortColumn = (columnKeyName: any) => {
        if (sortedColumn === columnKeyName) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            setSortedColumn(columnKeyName);
        }
        const newData = rawData.slice().sort((item1, item2) => {
            const valA =
                typeof item1[columnKeyName] === "string"
                    ? item1[columnKeyName].toLowerCase()
                    : item1[columnKeyName];
            const valB =
                typeof item2[columnKeyName] === "string"
                    ? item2[columnKeyName].toLowerCase()
                    : item2[columnKeyName];

            if (sortOrder === "asc") {
                return valA < valB ? -1 : 1;
            } else {
                return valA > valB ? -1 : 1;
            }
        });
        setRawData(newData);
    };

    const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setSelectedRowPerPage(newRowsPerPage);

        const currentFirstRow = (page - 1) * selectedRowPerPage + 1;
        const newPage = Math.ceil(currentFirstRow / newRowsPerPage);
        setPage(newPage);
    };

    useEffect(() => {
        setRawData(tableBodyDatas);
    }, [tableBodyDatas]);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [rawData]);

    useEffect(() => {
        if (slice.length < 1 && page !== 1) setPage(page - 1);
    }, [slice, page, setPage]);

    return (
        <div>
            <div className="flex justify-end items-start">
                <div className="flex justify-center items-center gap-2">
                    <IoSearch className="text-black" />
                    <InputPrimary
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(event) => handleSearch(event.target.value)}
                    />
                </div>
            </div>
            <br />
            <div className="relative overflow-auto max-h-[500px]">
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {tableHeaderDatas.map((tHeadData, index) => (
                                <th
                                    key={`${tHeadData.tHeadTiltle}-${index}`}
                                    className={styles.tableHeader}
                                    style={{ textAlign: tHeadData.cssTextAlign }}
                                    onClick={() => handleSortColumn(tHeadData.key)}
                                >
                                    {tHeadData.tHeadTiltle}
                                    <FaAngleUp
                                        className={`${
                                            sortedColumn === tHeadData.key ? "" : "hidden"
                                        } ${
                                            sortOrder === "asc" ? "" : "rotate-180"
                                        } ml-2 inline transition-all duration-300`}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {slice.map((element, index) => (
                            <tr key={index} className={`${styles.tableRowItems} text-black`}>
                                {formattedDataKeys?.map((formattedDataKey, idx) => {
                                    if (formattedDataKey.keyName === "phone_no") {
                                        return (
                                            <td
                                                key={`${formattedDataKey.keyName}-${idx}`}
                                                className="py-2 px-1.5"
                                                style={{
                                                    textAlign: tableHeaderDatas[idx]?.cssTextAlign,
                                                }}
                                            >
                                                <a
                                                    href={`tel:${
                                                        element[formattedDataKey.keyName]
                                                    }`}
                                                >
                                                    {element[formattedDataKey.keyName]}
                                                </a>
                                            </td>
                                        );
                                    } else if (formattedDataKey.keyName) {
                                        return (
                                            <td
                                                key={idx}
                                                className="py-2 px-1.5"
                                                style={{
                                                    textAlign: tableHeaderDatas[idx]?.cssTextAlign,
                                                }}
                                            >
                                                {element[formattedDataKey.keyName]}
                                            </td>
                                        );
                                    }
                                })}
                                <td className={`${hasSwitchBtn ? "" : "hidden"} py-2 px-1.5`}>
                                    {hasSwitchBtn && keySwitchBtn && onClickSwitchBtn && (
                                        <SwitchButton
                                            value={element[keySwitchBtn]}
                                            onClick={() =>
                                                onClickSwitchBtn(
                                                    element[keyValue],
                                                    element[keySwitchBtn]
                                                )
                                            }
                                        />
                                    )}
                                </td>
                                <td colSpan={2} className="py-2 px-1.5">
                                    <div className="flex justify-between items-center gap-2">
                                        {hasAction1 && (
                                            <OutlineButton
                                                className="text-sm"
                                                text={actionText1}
                                                color={BLUE_PRIMARY}
                                                onClick={() => onClickAction1(element[keyValue])}
                                            />
                                        )}
                                        {hasAction2 && (
                                            <OutlineButton
                                                className="text-sm"
                                                text={actionText2}
                                                color={RED_ERROR}
                                                onClick={() => onClickAction2(element[keyValue])}
                                            />
                                        )}
                                        {hasCheckBox && keyValueCheckBox && onClickCheckBox && (
                                            <input
                                                className="accent-blue-600"
                                                type="checkbox"
                                                id={element[keyValue]}
                                                checked={element[keyValueCheckBox]}
                                                onChange={() =>
                                                    onClickCheckBox(
                                                        element[keyValue],
                                                        element[keyValueCheckBox]
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end items-center flex-wrap mt-6">
                <div className="flex justify-end items-center flex-wrap text-xs">
                    <div className="mr-1 text-grey">Rows per page:</div>
                    <select
                        className="text-xs mr-4 text-center text-black"
                        value={selectedRowPerPage}
                        onChange={(option) => handleOnChange(option)}
                    >
                        {rowOptions.map((rowOption) => (
                            <option key={rowOption} value={rowOption}>
                                {rowOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-xs text-black mr-4">
                    {(page - 1) * selectedRowPerPage + 1}-
                    {page * selectedRowPerPage - 1 >= filteredData.length
                        ? filteredData.length
                        : page * selectedRowPerPage}{" "}
                    of {filteredData.length}
                </div>
                <div className="flex items-center justify-end flex-wrap">
                    <div
                        className="text-black cursor-pointer mr-1"
                        onClick={() => {
                            if (page !== 1) setPage(page - 1);
                        }}
                    >
                        <FiChevronLeft />
                    </div>

                    <div
                        className="text-black cursor-pointer ml-1"
                        onClick={() => {
                            if (page < range[range.length - 1]) setPage(page + 1);
                        }}
                    >
                        <FiChevronRight />
                    </div>
                </div>
            </div>
        </div>
    );
}
