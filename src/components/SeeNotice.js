import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
    const dispatch = useDispatch();
    const { currentUser, currentRole } = useSelector((state) => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        const userId = currentRole === "Admin" ? currentUser._id : currentUser.school._id;
        dispatch(getAllNotices(userId, "Notice"));
    }, [dispatch, currentRole, currentUser._id, currentUser.school._id]);

    const handleError = (error) => {
        if (error) {
            console.error(error);
        }
    };

    const formatNotices = (notices) => {
        return notices.map(({ title, details, date, _id }) => ({
            title,
            details,
            date: new Date(date).toISOString().substring(0, 10) || "Invalid Date",
            id: _id,
        }));
    };

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = formatNotices(noticesList);

    handleError(error);

    return (
        <div style={{ marginTop: '50px', marginRight: '20px' }}>
            {loading ? (
                <div style={{ fontSize: '20px' }}>Loading...</div>
            ) : response ? (
                <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
            ) : (
                <>
                    <h3 style={{ fontSize: '30px', marginBottom: '40px' }}>Notices</h3>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {Array.isArray(noticesList) && noticesList.length > 0 && (
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        )}
                    </Paper>
                </>
            )}
        </div>
    );
};

export default SeeNotice;
