import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Maps from "../Maps/maps";
import Table from '../Table/table';


class Homepage extends Component {

    state = {
        tableRow: []
    }

    componentDidMount() {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        fetch('https://api.covid19api.com/live/country/india/status/confirmed/date/' + yesterday.toISOString(), {
            method: 'GET',

        })
            .then(resp => resp.json())
            .then(dNew => {

                var newArray = []
                dNew.map((i, j) => {

                    // console.log(i)

                    var newObj = {}
                    newObj["id"] = i.ID;
                    newObj["State"] = i.Province;
                    newObj["Deaths"] = i.Deaths;
                    newObj["Confirmed"] = i.Confirmed;
                    newObj["Active"] = i.Active;


                    if (i.Province.toString() === "Jammu and Kashmir") {
                        newObj["id"] = i.ID;
                        newObj["State"] = "Jammu & Kashmir";
                        newObj["Deaths"] = i.Deaths;
                        newObj["Confirmed"] = i.Confirmed;
                        newObj["Active"] = i.Active;
                    }

                    if (i.Province.toString() === "Arunachal Pradesh") {
                        newObj["id"] = i.ID;
                        newObj["State"] = "Arunanchal Pradesh";
                        newObj["Deaths"] = i.Deaths;
                        newObj["Confirmed"] = i.Confirmed;
                        newObj["Active"] = i.Active;
                    }

                    if (i.Province.toString() === "Delhi") {
                        newObj["id"] = i.ID;
                        newObj["State"] = "NCT of Delhi";
                        newObj["Deaths"] = i.Deaths;
                        newObj["Confirmed"] = i.Confirmed;
                        newObj["Active"] = i.Active;
                    }

                    if (i.Province.toString() === "Andaman and Nicobar Islands") {
                        newObj["State"] = "Andaman & Nicobar Island";
                        newObj["Deaths"] = i.Deaths;
                        newObj["Confirmed"] = i.Confirmed;
                        newObj["Active"] = i.Active;
                    }

                    newArray.push(newObj);

                });

                this.setState({
                    tableRow: newArray,
                })

            }).catch((error) => {
            return error;
        })
    }

    render() {
        return (
            <>
                <div style={{
                    margin: 10,

                }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper>xs=12 sm=6</Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper>xs=12 sm=6</Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper style={{
                                padding:20,
                                display:"flex",
                                justifyContent:"center",
                                backgroundColor:"#323232",
                                color:"white",
                                fontSize:"20px"
                            }}> India Covid Cases </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper style={{
                                height: "500px",
                                backgroundColor:"#323232"
                            }}> <Maps/> </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper style={{
                                height: "500px"
                            }}> <Table row={this.state.tableRow}/> </Paper>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Paper>xs=6 sm=3</Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper>xs=6 sm=3</Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper>xs=6 sm=3</Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper>xs=6 sm=3</Paper>
                        </Grid>
                    </Grid>
                </div>
            </>
        );
    }

}

export default Homepage;
