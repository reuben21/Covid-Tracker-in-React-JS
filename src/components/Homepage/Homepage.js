import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Maps from "../Maps/maps";
import Table from '../Table/table';
import Css from './homepage.module.css'

function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "K", "M", "B","T"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum !== 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 !== 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}

class Homepage extends Component {

    state = {
        tableRow: [],
        worldTotal:{}
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

        fetch('https://api.covid19api.com/world/total',{
            method: 'GET',

        })
            .then(resp => resp.json())
            .then(dNew => {

                var newObj={}

                newObj["TotalConfirmed"] = abbreviateNumber(dNew.TotalConfirmed);
                newObj["TotalDeaths"] = abbreviateNumber(dNew.TotalDeaths);
                newObj["TotalRecovered"] = abbreviateNumber(dNew.TotalRecovered);



                this.setState({
                    worldTotal: newObj,
                })

            }).catch((error) => {
            return error;
        })
    }

    render() {
        return (
            <>
                <div style={{
                    margin: 60,

                }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <div style={{
                                padding:10,
                                display:"flex",
                                justifyContent:"space-around",
                                alignItems:"center",
                                flexDirection:"column",
                                backgroundColor:"#323232",
                                color:"white",
                                fontSize:"20px",
                                borderRadius:"10px",

                            }}>
                                <div style={{
                                    padding:20,
                                    display:"flex",
                                    justifyContent:"space-around",
                                    alignItems:"center",
                                    flexDirection:"row",
                                    backgroundColor:"#323232",
                                    color:"white",
                                    fontSize:"20px",
                                    borderRadius:"10px",

                                }}>
                                <div>World Count</div>
                                </div>
                                <div style={{
                                    padding:20,
                                    display:"flex",
                                    justifyContent:"space-evenly",
                                    alignItems:"center",
                                    flexDirection:"row",
                                    backgroundColor:"#323232",
                                    color:"white",
                                    fontSize:"20px",
                                    borderRadius:"10px",

                                }}>
                                    <div className={Css.inner_card}>
                                        <div>
                                            Total Confirmed

                                        </div>
                                        <div>
                                            {this.state.worldTotal.TotalConfirmed}

                                        </div>
                                    </div>

                                    <div className={Css.inner_card}>
                                        <div>
                                            Total Recovered

                                        </div>
                                        <div>
                                            {this.state.worldTotal.TotalRecovered}

                                        </div>
                                    </div>

                                    <div className={Css.inner_card}>
                                        <div>
                                            Total Deaths
                                        </div>
                                        <div>
                                            {this.state.worldTotal.TotalDeaths}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div style={{
                                padding:20,
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                flexDirection:"column",
                                backgroundColor:"#323232",
                                color:"white",
                                fontSize:"20px",
                                borderRadius:"10px"
                            }}>

                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper style={{
                                padding:20,
                                display:"flex",
                                justifyContent:"center",
                                backgroundColor:"#323232",
                                color:"white",
                                fontSize:"20px",
                                borderRadius:"10px"
                            }}> India Covid Cases </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper style={{
                                height:"100%",
                                backgroundColor:"#323232",
                                borderRadius:"10px"
                            }}> <Maps/> </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper style={{
                                padding:20,
                                display:"flex",
                                justifyContent:"center",
                                backgroundColor:"#323232",
                                color:"white",
                                fontSize:"20px",
                                borderRadius:"10px",
                                height:"92%"
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
