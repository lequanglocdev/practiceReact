import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchApiUser } from "../services/userService";
import ReactPaginate from 'react-paginate';
import ModaAddlUser from './ModalAddUser';
import ModalEditUser from "./ModalEditUser";
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash"
const TableUsers = (props) => {
    // goi danh sach User
    const [listUsers, setListUsers] = useState([]);
    // sô lương danh sách api
    const [totalUser, setTotalUsers] = useState(0)
    // sô trang api
    const [totalPages, setTotalPages] = useState(0)
    // show modal add User
    const [ShowAddModal, setShowAddModal] = useState(false)
    // show modal edit User
    const [showEditModal, setShowEditModal] = useState(false)
    // đâỷ dư liêụ data api
    const [dataUser, setDataUser] = useState({})

    const handleClose = () => {
        setShowAddModal(false)
        setShowEditModal(false)
    }


    useEffect(() => {
        // Call apis

        getAllUser();
    }, [])

    const getAllUser = async (page) => {
        let res = await fetchApiUser(page)
        if (res && res.data) {
            console.log(res)
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
        console.log(">> check res", res)
    }

    const handlePageClick = (event) => {
        getAllUser(+event.selected + 1)
    }

    // Modal AddUser
    const handleAddUser = (user) => {
        setListUsers([user, ...listUsers])
    }
    // Modal EditUser
    const handleEditUsers = (user) => {
        setDataUser(user)
        setShowEditModal(true)
    }
    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name;
        setListUsers(cloneListUser)

    }
    return (

        <>
            <div className='my-3 add-new'>
                <span ><h3>List Users</h3></span>
                <button className='btn btn-success'
                    onClick={() => setShowAddModal(true)}

                >Add new user</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {listUsers && listUsers.length > 0 &&

                        listUsers.map((item, index) => {
                            return (

                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td> <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleEditUsers(item)}
                                    >Edit</button>
                                        <button className="btn btn-danger ">Delete</button>
                                    </td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </Table>
            <ModaAddlUser />
            <ModaAddlUser
                show={ShowAddModal}
                handleClose={handleClose}
                handleAddUser={handleAddUser}
            />

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<<previous"
                // renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <ModalEditUser
                show={showEditModal}
                handleClose={handleClose}
                dataUser={dataUser}
                handleEditUserFromModal={handleEditUserFromModal}
            />
        </>
    )
}

export default TableUsers;