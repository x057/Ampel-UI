import * as React from 'react';

import { SearchInput } from '@ampel-ui/input';
import { Select } from '@ampel-ui/select';

interface PaginationButtonProps {
    id: string;
    onClick: () => void;
    disabled: boolean;
    className: string;
}

enum PaginateEvent {
    FIRST = 'FIRST',
    LAST = 'LAST',
    NEXT = 'NEXT',
    PREVIOUS = 'PREVIOUS',
    SIZE = 'SIZE',
}

const getPaginationButton = (props: PaginationButtonProps) => {
    const { id, ...rest } = props;
    return <button key={id} type="button" data-qa={`table-pagination--${id}`} {...rest} />;
};

const Pagination: React.FunctionComponent<any> = (props) => {
    const {
        page,
        pages,
        pageSizeOptions,
        pageSize,
        onPaginate,
        canPrevious,
        canNext,
        ofText,
        pageText,
        rowsText,
        onPageSizeChange: changePageSize,
        onPageChange: changePage,
    } = props;
    const onPaginateHandler = (eventType: PaginateEvent, itemsPerPage?: number) =>
        onPaginate && onPaginate(eventType, itemsPerPage);
    const onSizeChange = (value: any) => {
        onPaginateHandler(PaginateEvent.SIZE, Number(value));
        changePageSize(Number(value));
    };
    const firstPage = () => {
        onPaginateHandler(PaginateEvent.FIRST);
        changePage(0);
    };
    const incrementPage = () => {
        onPaginateHandler(PaginateEvent.NEXT);
        changePage(page + 1);
    };
    const decreasePage = () => {
        onPaginateHandler(PaginateEvent.PREVIOUS);
        changePage(page - 1);
    };
    const lastPage = () => {
        onPaginateHandler(PaginateEvent.LAST);
        changePage(pages);
    };
    return (
        <div className="table-pagination">
            <div className="table-pagination-buttons">
                {[
                    {
                        id: 'first',
                        onClick: firstPage,
                        disabled: !canPrevious,
                        className: 'table-pagination-button table-pagination-first',
                    },
                    {
                        id: 'previous',
                        onClick: decreasePage,
                        disabled: !canPrevious,
                        className: 'table-pagination-button table-pagination-previous',
                    },
                ].map(getPaginationButton)}
            </div>
            <div className="pagination-current-page">
                {pageText} {page + 1} {ofText} {pages}
            </div>
            <div className="table-pagination-buttons">
                {[
                    {
                        id: 'next',
                        onClick: incrementPage,
                        disabled: !canNext,
                        className: 'table-pagination-button table-pagination-next',
                    },
                    {
                        id: 'last',
                        onClick: lastPage,
                        disabled: !canNext,
                        className: 'table-pagination-button table-pagination-last',
                    },
                ].map(getPaginationButton)}
            </div>
            <div className="pagination-rows">
                <span>{rowsText}</span>
                <Select
                    id={'table-pagination-rows'}
                    value={pageSize}
                    options={pageSizeOptions.map((option: any) => ({ value: option, label: option }))}
                    onChange={onSizeChange}
                />
            </div>
        </div>
    );
};

interface SearchBarProps {
    searchValue: string;
    onFilterChange: (filter: string) => void;
    searchPlaceholder: string;
}

interface TableTopProps extends SearchBarProps {
    hidePagination: boolean;
}

const TableTop: React.FunctionComponent<TableTopProps> = (props) => {
    return (
        <div className="table-top">
            <div className="search-bar">
                <SearchInput
                    id="table--search-bar"
                    value={props.searchValue}
                    searchPlaceholder={props.searchPlaceholder}
                    onFilterChange={props.onFilterChange}
                />
            </div>
            {!props.hidePagination && <Pagination {...props} />}
        </div>
    );
};

export { TableTop, PaginateEvent };
