import { useDispatch,useSelector } from "react-redux"
import { getUser } from "../features/userSlice"
import { useEffect, useState } from "react"
import Navbar from "./navBar"
import Footer from "./footer"
import { getAddress, deleteAddress, addAddress, updateAddress } from "../features/addressSlice"
import { toast } from "react-toastify"
const UserProfile = () => {
    const dispatch = useDispatch()
    //states
    const [mode, setMode] = useState('add')
    const [display, setDisplay] = useState("none")
    const [street, setStreet] = useState('')
    const [building, setBuilding] = useState('')
    const [landmark, setLandmark] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [productId, setProductId] = useState('')
    const userData = useSelector((state) => state?.user?.user)
    const addressData = useSelector((state) => state?.address?.address)
    
    useEffect(() => {
        dispatch(getUser())
        dispatch(getAddress())
    },[])

    const handleDeleteAddress = (e,addressId) => {
        e.preventDefault()
        dispatch(deleteAddress({addressId})).unwrap().then(() => toast.success("Address deleted successfully")).catch(() => toast.error("Unable to delete Address"))
    }

    const handleAddAddress = (e) => {
        e.preventDefault()
        display === "none" ? setDisplay("block") : display === "block" && mode === "add" ? setDisplay("none") : ""
        setStreet('')
        setBuilding('')
        setLandmark('')
        setState('')
        setCity('')
        setPincode('')
        setMode('add')
    }

    const handleUpdateAddress = (e, address) => {
        e.preventDefault()
        display === "none" ? setDisplay("block") : display === "block" && mode === "edit" ? setDisplay("none") : ""
        setStreet(address.street)
        setBuilding(address.building)
        setLandmark(address.landmark)
        setState(address.state)
        setCity(address.city)
        setPincode(address.pincode)
        setProductId(address._id)
        setMode('edit')
    }

    const handleAddNewAddress = (e) => {
        e.preventDefault()
        if(street && building && state && city && pincode){
            dispatch(addAddress({street,building,landmark,state,city,pincode})).unwrap().then(() => toast.success("Address added successfully")).catch(()=> toast.error("Unable to Add address"))
        }
    }

    const editAddress = (e) => {
        e.preventDefault()
        if(street || building || state || city || pincode && productId){
            dispatch(addAddress({street,building,landmark,state,city,pincode,productId})).unwrap().then(() => toast.success("Address Updated successfully")).catch(()=> toast.error("Unable to Update address"))
        }
    }
    return(
        <>
        <Navbar />
        <main className="container my-3">
           {userData.length > 0 ? <><h3>User Profile</h3>
            <p><strong>Name: </strong>{userData[0].fullName}</p>
            <p><strong>UserName: </strong>{userData[0].userName}</p>
            <p><strong>Email: </strong>{userData[0].email}</p>
            <p><strong>Phone: </strong>{userData[0].phone}</p>
            </> : <p>No User Data available</p>}
            <div className="my-3">
                <h2>Addresses</h2>
                <button className="btn btn-success my-3" onClick={handleAddAddress}>Add Address</button>
                <div className="my-3">
                    <form style={{display: display}} onSubmit={mode === "add" ? handleAddNewAddress : mode === "edit" ? editAddress :""}>
                        <label> Street:
                        </label><input type="text" required value={street} className="form-control" onChange={(e) => setStreet(e.target.value)}/>
                        <label> Building:
                        </label>
                        <input type="text" required value={building} onChange={(e) => setBuilding(e.target.value)} className="form-control"/>
                        <label> Landmark:
                        </label>
                        <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="form-control"/>
                        <label> state:
                        </label>
                        <input type="text" required value={state} onChange={(e) => setState(e.target.value)} className="form-control"/>
                        <label> City:
                        </label>
                        <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="form-control"/>
                        <label> Pin Code:
                        </label>
                        <input type="text" required value={pincode} onChange={(e) => setPincode(e.target.value)} className="form-control"/>
                        <button className="btn btn-success mt-3" type="submit">{mode === "add" ? "Add Address": mode === "edit" ? "Update Address" : ""}</button>
                    </form>
                </div>
                <ul className="list-group">
                {addressData ? addressData.map((address) => (<li className="list-group-item d-flex justify-content-between align-items-center" key={address._id}><p>{address.street} {address.building} {address.landmark} {address.state} {address.city} - {address.pincode}</p> <div><button className="btn btn-success" onClick={(e) => handleUpdateAddress(e,address)}>Edit Address</button><button className="btn btn-danger ms-3" onClick={(e) => handleDeleteAddress(e,address._id)}>Delete</button></div></li>)): ""}  
                </ul>
                
            </div>
            
        </main>
        <Footer />
        </>
    )
}
export default UserProfile