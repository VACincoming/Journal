import React from 'react'
import './GetUserAbsentTable.css'
import Grid from '@material-ui/core/Grid'
import {useTranslation} from "react-i18next";

export default function GetUserAbsentTable(props: any) {
    const {t} = useTranslation();
    const {userAbsents} = props
    return (
        <Grid container justify='center' alignItems='center' direction='column'>
            <Grid item xs={12} className='tableWrapper'>
                <table>
                    <tbody>
                    <tr>
                        <th>{t('Date')}</th>
                        <th>{t('SubjectName')}</th>
                        <th>{t('IsPresent')}</th>
                    </tr>
                    {
                        userAbsents.map((el: any) => {
                                        return (
                                            <tr key={el.identifier}>
                                                <td>{el.lessonDate}</td>
                                                <td>{el.subjectName}</td>
                                                <td>{el.isPresent === true ?
                                                    <p style={{color: "#228477"}}>{t('Present')}</p> :
                                                    <p style={{color: "#ff5722"}}>{t('Absent')}</p>}</td>
                                            </tr>
                                        )
                                    })
                    }
                    </tbody>
                </table>
            </Grid>
        </Grid>
    )
}