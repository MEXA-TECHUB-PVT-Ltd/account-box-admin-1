import React, { useState, useEffect } from "react";
import url from "url/url";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDSnackbar from "components/MDSnackbar";
import axios from "axios";
import MDButton from "components/MDButton";
import DotLoader from "react-spinners/DotLoader";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
// Billing page components
import TextField from '@mui/material/TextField';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'beige',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};
const override = {
    display: ' block',
    margin: '0 auto',
    alignContent: "center"
    //   borderColor: 'red',
}
const color = "#F69920"
function Users() {
    // get 
    const headers = {
        'Content-Type': 'application/json'
    }
    // Update 
    const closeSuccessSB = () => setSuccessSB(false);
    const closeSuccessSBV = () => setSuccessSBV(false);

    const [successSB, setSuccessSB] = useState(false);
    const [successSBV, setSuccessSBV] = useState(false);

    const renderSuccessSb = (
        <MDSnackbar
            icon="notifications"
            title="Subscription Plan Updated Successfully"
            content="This is a notification message"
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            color="success"
            bgWhite
        />
    );
    const renderSuccessSbVerify = (
        <MDSnackbar
            icon="notifications"
            title="Subscription Plan Created Successfully"
            content="This is a notification message"
            open={successSBV}
            onClose={closeSuccessSBV}
            close={closeSuccessSBV}
            color="success"
            bgWhite
        />
    );

    const [user, setUser] = useState([]);

    // loader 
    const [loadingLoader, setLoadingLoader] = useState(true)

    const getAllData = () => {
        axios.get(`${url}api/subscriptionPlan/get-all`)
            .then((response) => {
                console.log("response.data")
                console.log(response.data)

                const users = response.data;
                setUser(users);
            })
            .catch(error => console.error(`Error:${error}`));
    }
    useEffect(() => {
        getAllData();
        setLoadingLoader(true)
        setTimeout(() => {
            setLoadingLoader(false)

        }, 3000)
    }, []);
    const [items, setItems] = useState([]);
    const [SubscriptionName, setSubscriptionName] = useState('');
    const [SubscriptionPrice, setSubscriptionPrice] = useState('');
    const [SubscriptionShops, setSubscriptionShops] = useState('');
    const [SubscriptionPlanId, setSubscriptionPlanId] = useState('');
    const [SubscriptionNameAdd, setSubscriptionNameAdd] = useState('');
    const [SubscriptionPriceAdd, setSubscriptionPriceAdd] = useState('');
    const [SubscriptionShopsAdd, setSubscriptionShopsAdd] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => {
        console.log(id)
        axios.get(`${url}api/subscriptionPlan/get-subscription-plan-by-ID/${id}`)
            .then((response) => {
                console.log('Data Subscription Plan')
                console.log(response.data.data[0])
                setSubscriptionPlanId(response.data.data[0]._id)
                setSubscriptionName(response.data.data[0].name)
                setSubscriptionPrice(response.data.data[0].price_per_month)
                setSubscriptionShops(response.data.data[0].no_of_shops)
                setOpen(true);


            })
            .catch(error => console.error(`Error:${error}`));
    }
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => {
        setOpenAdd(true);
    }
    const handleClose = () => setOpen(false);
    const handleCloseAdd = () => setOpenAdd(false);

    const submitHandler = () => {
        axios.put(`${url}api/subscriptionPlan/update`, {
            _id: SubscriptionPlanId,
            name: SubscriptionName,
            no_of_shops: SubscriptionShops,
            price_per_month: SubscriptionPrice
        }, { headers }).then(response => {
            console.log(response)
            setOpen(false)
            setSuccessSB(true)
            getAllData();
        })
            .catch(err => {
                console.log(err)
            })

    }
    const submitHandler1 = () => {
        axios.post(`${url}api/subscriptionPlan/create`, {
            name: SubscriptionNameAdd,
            no_of_shops: SubscriptionShopsAdd,
            price_per_month: SubscriptionPriceAdd,
            is_free_trail:'false'
        }, { headers }).then(response => {
            console.log(response);
            setSuccessSBV(true)
            getAllData();

        })
            .catch(err => {
                console.log(err)
            })

        axios.put(`${url}api/subscriptionPlan/update`, {
            _id: SubscriptionPlanId,
            name: SubscriptionName,
            no_of_shops: SubscriptionShops,
            price_per_month: SubscriptionPrice
        }, { headers }).then(response => {
            console.log(response)
            setOpenAdd(false)
            setSuccessSB(true)
            getAllData();
        })
            .catch(err => {
                console.log(err)
            })

    }
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
            setItems(items);
            console.log("items")
            console.log(items)
        }
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar data={items} />
            {loadingLoader ?
                <Grid container spacing={6} style={{ padding: '20px' }}>
                    <Grid item xs={12} md={6} >
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <DotLoader color={color} loading={loadingLoader} css={override} size={30} />
                    </Grid>
                </Grid>
                :
                <>
                    <MDBox pt={6} pb={3}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                {/* <Card > */}
                                <Grid container spacing={3}>
                                    {/* <Grid item xs={12} md={3}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid> */}
                                    {user.map((row) => (
                                        <Grid item xs={12} md={3} style={{ cursor: 'pointer' }} onClick={() => handleOpen(row._id)}>
                                            <DefaultInfoCard
                                                icon="edit"
                                                title={row.name}
                                                description={`No of Shops: ${row.no_of_shops}`}
                                                value={`${row.price_per_month}$`}
                                            />
                                        </Grid>
                                    ))}
                                    <Grid item xs={12} md={3} style={{ cursor: 'pointer' }} onClick={() => handleOpenAdd()}>
                                        <DefaultInfoCard
                                            icon="add"
                                            title="Add Plan"
                                            description="Add shops No"
                                            value="$0"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <PaymentMethod /> */}
                                    </Grid>
                                </Grid>
                                <div>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={open}>
                                            <Box sx={style}>

                                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={10} md={10}>
                                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                                            Edit Subscription Plan
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                                            Name
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <TextField
                                                            value={SubscriptionName}
                                                            onChange={(e) => setSubscriptionName(e.target.value)}
                                                            style={{ width: '100%' }} variant="outlined" />

                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                                            Price
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <TextField
                                                            value={SubscriptionPrice}
                                                            onChange={(e) => setSubscriptionPrice(e.target.value)}
                                                            style={{ width: '100%' }} variant="outlined" />

                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                                            No of shops
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <TextField value={SubscriptionShops}
                                                            onChange={(e) => setSubscriptionShops(e.target.value)} style={{ width: '100%' }} variant="outlined" />

                                                    </Grid>
                                                    <Grid item xs={12} md={4}>

                                                    </Grid>
                                                    <Grid item xs={12} md={4}>

                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler() }}>
                                                            Update
                                                        </MDButton>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Fade>
                                    </Modal>
                                </div>
                                <div>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={openAdd}
                                        onClose={handleCloseAdd}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={openAdd}>
                                            <Box sx={style}>

                                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={10} md={10}>
                                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                                            Add Subscription Plan
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <CloseIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                                            Name
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <TextField
                                                            value={SubscriptionNameAdd}
                                                            onChange={(e) => setSubscriptionNameAdd(e.target.value)}
                                                            style={{ width: '100%' }} variant="outlined" />

                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                                            Price
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <TextField
                                                            value={SubscriptionPriceAdd}
                                                            onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                                                            style={{ width: '100%' }} variant="outlined" />

                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                                            No of shops
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <TextField value={SubscriptionShopsAdd}
                                                            onChange={(e) => setSubscriptionShopsAdd(e.target.value)} style={{ width: '100%' }} variant="outlined" />

                                                    </Grid>
                                                    <Grid item xs={12} md={4}>

                                                    </Grid>
                                                    <Grid item xs={12} md={4}>

                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler1() }}>
                                                            Submit
                                                        </MDButton>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Fade>
                                    </Modal>
                                </div>
                                <div>
                                {renderSuccessSb}
                                </div>
                                <div>
                                {renderSuccessSbVerify}
                                </div>
                                {/* <MDBox
                                            mx={2}
                                            mt={-3}
                                            py={3}
                                            px={2}
                                            variant="gradient"
                                            bgColor="error"
                                            borderRadius="lg"
                                            coloredShadow="error"
                                        >

                                            <MDTypography variant="h6" fontWeight="medium" color="white">
                                                All Data
                                            </MDTypography>
                                        </MDBox> */}

                                {/* <MDBox >
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={user}
                                                options={{
                                                    headerStyle: { opacity: 0.7, fontWeight: 700 },
                                                    rowStyle: {
                                                        fontSize: '12px',
                                                    },
                                                    filter: true,
                                                    exportButton: true,
                                                    tableLayout: "auto",
                                                    sorting: true,
                                                    actionsColumnIndex: -1
                                                }}
                                            />
                                            <div>
                                                <Modal
                                                    open={visibleDelete}
                                                    onClose={() => setVisibleDelete(false)}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Grid container spacing={2} align="center">
                                                            <Grid item xs={12} md={12}>
                                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                    Are you sure you want to delete<br/> this Tycoon?
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                
                                                                <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#F2C75B', color: 'white', borderRadius: '10px' }}>
                                                                    Yes
                                                                </MDButton>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Button autoFocus style={{ border: '1px solid #F2C75B', color: '#F2C75B', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
                                                                    No
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Modal>
                                            </div>
                                            <div>
                                                {renderSuccessDelete}
                                            </div>
                                            <div>
                                                {renderSuccessSb}
                                            </div>
                                            <div>
                                                {renderSuccessSbVerify}
                                            </div>
                                        </MDBox> */}
                                {/* </Card> */}
                            </Grid>
                        </Grid>
                    </MDBox>
                </>
            }
        </DashboardLayout>
    );
}

export default Users;
