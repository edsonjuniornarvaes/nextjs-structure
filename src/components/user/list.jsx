import React, { useState, useEffect } from 'react'
import { useTable, usePagination } from 'react-table';
import { toast } from 'react-toastify';
import Router from 'next/router';
import styled from 'styled-components'

//component css
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`
//component
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

//Ir até edit user
const handleEdit = (idParam) => {
  Router.push(`/user/users/${idParam}`);
}

//Deletar usuário
const handleDelete = (idParam) => {
  fetch(`users/${idParam}`, {
    method: 'DELETE',
    mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': ''
      },
  })
  .then(() => {
      toast.success('Usuário deletado com sucesso!');
      setTimeout(() => {
        location.reload();
      }, 500);
  }).catch(function(error) {
    return toast.error(error);
  });
}

function List() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const columns = React.useMemo(
      () => [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Nome',
            accessor: 'name',
          },
          {
            Header: 'e-mail',
            accessor: 'email',
          },
          {
            Header: 'Opções',
            accessor: 'situation',
            Cell: row => (
              <div>
                  <button onClick={() => handleEdit(row.row.original.id)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(row.row.original.id)}>
                    <i className="fa fa-trash"></i>
                  </button>
              </div>
          )
          },
        ],
      []
  )

  const getUsers = () => {
    
    fetch(`users`, {
      method: 'GET',
      mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Authorization': ''
        },
    })
    .then((res) => res.json())
        .then((data) =>   {
          console.log(data)
          return setData(data.data ? data.data : []);
        })
        .catch(function(error) {
          return setData([]);
        });
  }

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default List