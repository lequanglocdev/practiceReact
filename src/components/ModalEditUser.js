import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from "../services/userService"
import { toast } from 'react-toastify';
function ModalEditUser(props) {
    const { show, handleClose, dataUser, handleEditUserFromModal } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")


    const handleEditUsers = async () => {
        let res = await putUpdateUser(name, job)
        if (res && res.updateAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataUser.id
            })
            handleClose()
            toast.success("Update user success")
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataUser.first_name)
        }
    }, [dataUser])

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new' >
                        <div className='mb-3' >
                            <label className='form-lable'>Name</label>
                            <input
                                type="email"
                                className='form-control'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                        </div>
                        <div className='mb-3' >
                            <label className='form-lable'>Job</label>
                            <input
                                type="text"
                                className='form-control'
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUsers()}>
                        Cofirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEditUser;