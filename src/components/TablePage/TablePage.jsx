import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, sortUsers, searchUsers, changePage } from '../../redux/actions';
import Table from '../Table/Table';

function TablePage() {
    const dispatch = useDispatch();
    const { users, currentPage, totalPages } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSort = (field) => {
        dispatch(sortUsers(field));
    };

    const handleSearch = (value) => {
        dispatch(searchUsers(value));
    };

    const handlePageChange = (page) => {
        dispatch(changePage(page));
    };

    return (
        <div className="container">
            <Table
                users={users}
                currentPage={currentPage}
                totalPages={totalPages}
                onSort={handleSort}
                onSearch={handleSearch}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default TablePage;
