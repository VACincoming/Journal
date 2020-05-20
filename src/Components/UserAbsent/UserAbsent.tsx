import React, {useEffect, useState} from 'react'
import './userAbsent.css'
import Calendar from '../Calendar'
import moment, {lang} from 'moment'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {useTranslation} from "react-i18next";
import GetUserAbsentTable from "../GetUserAbsentTable";
import {withJournalService} from "../../hoc";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUserAbsents} from "../../actions";

interface IGetRegistry {
    fetchUserAbsents: any,
    userAbsents: any,
}

const UserAbsent: React.FC<IGetRegistry> = ({fetchUserAbsents, userAbsents}) => {
    const [selectedDateFrom, setSelectedDateFrom] = React.useState(moment().format('YYYY-MM-DD'));
    const [selectedDateTo, setSelectedDateTo] = React.useState(moment().format('YYYY-MM-DD'));
    const [isVisible, setIsVisible] = useState(false)
    const [isError, setIsError] = useState(false)
    let activeElement = null;
    let mainContent;
    const {t} = useTranslation();
    const changeDateFrom = (date: string) => {
        let currentDate = moment(date).format('YYYY-MM-DD')
        setSelectedDateFrom(currentDate);
    }

    const changeDateTo = (date: string) => {
        let currentDate = moment(date).format('YYYY-MM-DD')
        setSelectedDateTo(currentDate);
    }
    const onClick = () => {
        if (selectedDateFrom !== null && selectedDateTo !== null) {
            setIsVisible(true)
            setIsError(false)
        } else {
            setIsVisible(false)
            setIsError(true)
        }
    }
    if (isVisible) {
        console.log(fetchUserAbsents)
        activeElement =
            <Grid container justify='center' alignItems='center'>
                <GetUserAbsentTable registry={userAbsents}/>
            </Grid>
    }
    if (isError) {
        activeElement =
            <Grid container justify='center' alignItems='center'>
                <h3>choose dates</h3>
            </Grid>
    }
    useEffect(() => {
        (async function fetchData() {
            fetchUserAbsents(selectedDateFrom, selectedDateTo)
        })()
    }, [selectedDateTo, selectedDateFrom])
    {

        mainContent =
            <Grid container item xs={12} justify="center" style={{marginTop: "5%"}}>
                <Grid container item xs={5} justify="space-between">
                    <Calendar selectedDate={selectedDateFrom} changeDate={(date: any) => changeDateFrom(date)}/>
                    <Calendar selectedDate={selectedDateTo} changeDate={(date: any) => changeDateTo(date)}/>
                    <Button variant='contained' color='primary' onClick={onClick}>{t('LoadAbsents')}</Button>
                </Grid>
            </Grid>
    }
    return (
        <>

            {mainContent}
            {activeElement}

        </>
    )
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    const {journalService} = ownProps;
    return bindActionCreators({
        fetchUserAbsents: fetchUserAbsents(journalService)
    }, dispatch)
}
const mapStateToProps = ({userAbsents}: { userAbsents: any }) => {
    return {userAbsents}
}
export default withJournalService()(
    connect(mapStateToProps, mapDispatchToProps)(UserAbsent))