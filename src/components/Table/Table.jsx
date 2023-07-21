import React, {useState, useEffect} from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';
import axios from 'axios';
import './Table.css';

const Table = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [paginatedData, setPaginatedData] = useState([]);
    const [activePage, setActivePage] = useState(1); // Состояние для текущей активной страницы

    const arrowDown = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
        <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC"/>
        <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white"/>
    </svg>

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1); // Сбросим текущую страницу при каждом изменении поискового запроса
    };

    const handleSort = (column) => {
        if (column === sortedColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(column);
            setSortOrder('asc');
        }
        setCurrentPage(1); // Сбросим текущую страницу при сортировке
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setActivePage(page);
    };

    useEffect(() => {
        // Обновление данных таблицы при изменении поискового запроса или параметра страницы
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Вычисление общего количества страниц при изменении данных или поискового запроса
        const filteredData = data.filter((item) => {
            // Поиск по всем столбцам
            return (
                item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.body.toLowerCase().includes(searchValue.toLowerCase())
            );
        });

        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
        setPaginatedData(filteredData);
    }, [data, searchValue]);

    const location = useLocation();
    const {page} = useParams();

    useEffect(() => {
        // Обновление текущей страницы при изменении параметра страницы в URL
        if (page && /^\d+$/.test(page)) {
            setCurrentPage(parseInt(page));
        }
    }, [page, location]);

    const sortedData = paginatedData.sort((a, b) => { // Используем отфильтрованные данные для сортировки
        // Сортировка данных по ID
        if (sortedColumn === 'id') {
            return sortOrder === 'asc' ? a[sortedColumn] - b[sortedColumn] : b[sortedColumn] - a[sortedColumn];
        }

        // Сортировка данных по другим столбцам
        if (!sortedColumn) return 0;

        const columnA = a[sortedColumn].toString().toLowerCase();
        const columnB = b[sortedColumn].toString().toLowerCase();

        if (columnA === columnB) return 0;

        return sortOrder === 'asc' ? (columnA < columnB ? -1 : 1) : columnA > columnB ? -1 : 1;
    });

    return (
        <div className="table-container">
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Поиск"
                className="table-input"
            />
            <table className="table">
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>ID {arrowDown}</th>
                    <th onClick={() => handleSort('title')}>Заголовок {arrowDown}</th>
                    <th onClick={() => handleSort('body')}>Описание {arrowDown}</th>
                </tr>
                </thead>
                <tbody>
                {paginatedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>
                <div className="pagination-pages">
                    {Array.from({length: totalPages}, (_, index) => (
                        <Link
                            key={index + 1}
                            to={`/${index + 1}`}
                            className={activePage === index + 1 ? "active" : ""}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Link>
                    ))}
                </div>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default Table;
