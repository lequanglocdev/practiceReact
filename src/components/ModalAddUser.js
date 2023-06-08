import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postApiUser } from "../services/userService"
import { toast } from 'react-toastify';
function ModalAddUser(props) {
    const { show, handleClose, handleAddUser } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const handleSave = async () => {
        let res = await postApiUser(name, job)

        console.log(">> check res:", res)
        if (res && res.id) {
            handleClose()
            setName('')
            setJob('')
            toast.success("Thêm ngươi dùng thành công")
            handleAddUser({ first_name: name, email: job, id: res.id })
        } else {
            toast.error("Thêm không thành công")
        }
    }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalAddUser;