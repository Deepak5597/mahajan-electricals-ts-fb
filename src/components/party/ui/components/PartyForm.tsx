import { FC, useReducer, useEffect, useCallback } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import IParty, { BillingLocation } from "../../model/party";
import { IPartyForm, PartyFormActionEnum } from "../../model/party.form";
import useGlobal from "../../../../global/hooks/useGlobal";
import useConfig from "../../../../global/hooks/useConfig";
import partyFormReducer from "../../reducer/PartyFormReducer";
import partyService from "../../service/partyService";

interface IPartyFormProps {
    isEdit: boolean
}
const initialValue: IPartyForm = {
    id: undefined,
    isLoading: false,
    name: "",
    showMessage: false,
    message: "",
    isSuccess: false,
    currentBalance: 0,
    type: "credit",
    billingLocation: [
        {
            billingName: "default",
            address: "default",
            phone: "",
            billingType: "retail",
            isDefault: true
        }
    ],
    isSubmit: false
}

const PartyForm: FC<IPartyFormProps> = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { parties } = useGlobal();
    const { partyType, billingType } = useConfig();
    const [partyForm, partyFormDispatcher] = useReducer(partyFormReducer, initialValue);

    const handlePartyFieldChange = (e: any) => partyFormDispatcher({ type: PartyFormActionEnum.PARTY_FIELD_CHANGED, payload: { field: e.target.name, newValue: e.target.value } });
    const handleLocationDataChange = (index: number, e: any) => partyFormDispatcher({ type: PartyFormActionEnum.PARTY_LOCATION_CHANGED, payload: { field: e.target.name, newValue: e.target.value, locationIndex: index } });
    const handleLocationDelete = (index: number) => partyFormDispatcher({ type: PartyFormActionEnum.DELETE_LOCATION, payload: { locationIndex: index } })
    const handleDefaultLocationChange = (index: number, e: any) => partyFormDispatcher({ type: PartyFormActionEnum.PARTY_DEFAULT_LOCATION_CHANGED, payload: { field: e.target.name, newValue: e.target.value, locationIndex: index } });
    const handleAddMoreLocation = () => partyFormDispatcher({ type: PartyFormActionEnum.PARTY_LOCATION_ADD, payload: {} });
    const handleFinish = () => {
        partyFormDispatcher({ type: PartyFormActionEnum.LOADING, payload: {} })
        partyFormDispatcher({ type: PartyFormActionEnum.PARTY_FINISH, payload: {} });
    }
    const getPartyByPartyId = useCallback((id: string) => {
        const filteredParties = parties.filter(party => party.id === id);
        if (!filteredParties.length) {
            return undefined;
        } else {
            return filteredParties[0];
        }
    }, [parties]);

    useEffect(() => {
        if (!isEdit) return;
        if (id === undefined) return;
        const party = getPartyByPartyId(id);
        if (party === undefined) return;
        partyFormDispatcher({ type: PartyFormActionEnum.SET_UPDATE_PARTY_DATA, payload: party })
    }, [id, isEdit, getPartyByPartyId]);

    const handlePartyCreation = useCallback(async (payload: IParty) => {
        delete payload['id'];
        await partyService.createParty(payload, (id: string, err: string) => {
            if (err) {
                partyFormDispatcher({ type: PartyFormActionEnum.SET_MESSAGE, payload: { message: "Something went wrong while adding Party", isSuccess: false } });
            }
            if (id) {
                partyFormDispatcher({ type: PartyFormActionEnum.SET_MESSAGE, payload: { message: "Party Added Successfully", isSuccess: true } });
                setTimeout(() => {
                    partyFormDispatcher({ type: PartyFormActionEnum.RESET_STATE, payload: {} });
                    navigate("/party");
                }, 1000)
            }
        });
    }, [navigate]);

    const handlePartyUpdation = (payload: IParty) => {
        console.log('update')
    }
    useEffect(() => {
        const handlePartyFinish = async () => {
            if (partyForm.isSubmit) {
                if (partyForm?.submittionPayload?.id === undefined) {
                    await handlePartyCreation(partyForm.submittionPayload);
                } else {
                    await handlePartyUpdation(partyForm.submittionPayload);
                }
            }
        }
        handlePartyFinish();
    }, [partyForm.isSubmit, partyForm.submittionPayload, handlePartyCreation]);
    return (
        <Container maxWidth="xl" sx={{ pt: 3, pb: 1, backgroundColor: "common.white" }}>
            <Grid container rowGap={2}>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6"> Party </Typography>
                    <Link to="/parties" style={{ textDecoration: "none" }}><Button variant="contained"> Go Back</Button></Link>
                </Grid>
                {
                    partyForm.showMessage &&
                    <Grid item xs={12}>
                        <Alert severity={partyForm.isSuccess ? "success" : "error"}>{partyForm.message}</Alert>
                    </Grid>
                }
                <Grid item container xs={12} >
                    <Box component="form" autoComplete="off" noValidate sx={{ width: "100%" }}>
                        <Grid container item rowGap={2} columnGap={1}>
                            <Grid item xs={12} sm>
                                <FormControl fullWidth >
                                    <TextField size="small" label="Party Name" variant="outlined" name="name" value={partyForm?.name} onChange={handlePartyFieldChange} />
                                </FormControl>
                            </Grid>
                            <Grid item xs sm={3}>
                                <FormControl fullWidth >
                                    <InputLabel id="party-select-helper-label">Party Type</InputLabel>
                                    <Select
                                        size="small"
                                        labelId="party-select-helper-label"
                                        id="party-select-helper"
                                        label="Party Type"
                                        onChange={handlePartyFieldChange}
                                        value={partyForm.type}
                                        name="type"
                                    >
                                        {
                                            partyType.map((type) => (
                                                <MenuItem key={type} value={type}>{type}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs sm={3}>
                                <FormControl fullWidth >
                                    <TextField size="small" type="number" label="Current Balance" variant="outlined" name="currentBalance" value={partyForm?.currentBalance} onChange={handlePartyFieldChange} />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} my={2}>
                            <Typography variant="h6"> Billing Locations </Typography>
                        </Grid>
                        {
                            partyForm?.billingLocation &&
                            partyForm.billingLocation.map((location: BillingLocation, index: number) => {
                                return (
                                    <Grid container item gap={2} sx={{ border: 1, borderColor: "grey.300", borderStyle: "dotted", p: 2, mt: 2 }} key={`bl_${index}`}>
                                        <Grid item xs={12} sm>
                                            <FormControl fullWidth >
                                                <TextField size="small" label="Name" variant="outlined" name="billingName" value={location.billingName} onChange={(e) => handleLocationDataChange(index, e)} />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm>
                                            <FormControl fullWidth >
                                                <TextField size="small" type="number" label="Phone" variant="outlined" name="phone" value={location.phone} onChange={(e) => handleLocationDataChange(index, e)} />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm>
                                            <FormControl fullWidth >
                                                <InputLabel id="type-select-helper-label">Type</InputLabel>
                                                <Select
                                                    size="small"
                                                    labelId="type-select-helper-label"
                                                    id="type-select-helper"
                                                    label="Type"
                                                    onChange={(e) => handleLocationDataChange(index, e)}
                                                    value={location.billingType}
                                                    name="billingType">
                                                    {
                                                        billingType.map((type) => (
                                                            <MenuItem key={`bl_bt_${index}_${type}`} value={type}>{type}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FormControl fullWidth >
                                                <TextField size="small" label="Address" variant="outlined" multiline rows={2} name="address" value={location.address} onChange={(e) => handleLocationDataChange(index, e)} />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            {
                                                !Boolean(location.isDefault) ? <Button variant="outlined" color="primary" name="isDefault" onClick={(e) => handleDefaultLocationChange(index, e)}>Mark Default</Button > : <Button variant="contained" color="success" startIcon={<DoneIcon />}>Default</Button>
                                            }
                                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ ml: 2 }} onClick={(e) => handleLocationDelete(index)}>Delete</Button>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                        <Grid container item gap={1} sx={{ my: 2 }}>
                            <Button variant="contained" color="secondary" onClick={handleAddMoreLocation}> Add More Location</Button>
                            <Button variant="contained" onClick={handleFinish} disabled={partyForm.isLoading}> {partyForm.isLoading ? "Saving ..." : "Save"} </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

PartyForm.defaultProps = {
    isEdit: false
}

export default PartyForm