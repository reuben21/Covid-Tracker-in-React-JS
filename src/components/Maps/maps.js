import React, {Component} from 'react';

// import DatamapsIndia from 'react-datamaps-india';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { scaleQuantile } from 'd3-scale';


const INDIA_TOPO_JSON = require('./india.topo.json');

const PROJECTION_CONFIG = {
    scale: 650,
    center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};

// Red Variants
const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
];

const DEFAULT_COLOR = '#EEE';

const getHeatMapData = () => {
    return [
        { id: 'AP', state: 'Andhra Pradesh', value: 50 },
        { id: 'AR', state: 'Arunanchal Pradesh', value: 50 },
        { id: 'AS', state: 'Assam', value: 50 },
        { id: 'BR', state: 'Bihar', value: 50 },
        { id: 'CT', state: 'Chhattisgarh', value: 50 },
        { id: 'GA', state: 'Goa', value: 21 },
        { id: 'GJ', state: 'Gujarat', value: 22 },
        { id: 'HR', state: 'Haryana', value: 50 },
        { id: 'HP', state: 'Himachal Pradesh', value: 24 },
        { id: 'JH', state: 'Jharkhand', value: 26 },
        { id: 'KA', state: 'Karnataka', value: 27 },
        { id: 'KL', state: 'Kerala', value: 50 },
        { id: 'MP', state: 'Madhya Pradesh', value: 50 },
        { id: 'MH', state: 'Maharashtra', value: 50 },
        { id: 'MN', state: 'Manipur', value: 50 },
        { id: 'ML', state: 'Meghalaya', value: 59 },
        { id: 'MZ', state: 'Mizoram', value: 50 },
        { id: 'NL', state: 'Nagaland', value: 59 },
        { id: 'OR', state: 'Odisha', value: 59 },
        { id: 'PB', state: 'Punjab', value: 50 },
        { id: 'RJ', state: 'Rajasthan', value: 50 },
        { id: 'SK', state: 'Sikkim', value: 50 },
        { id: 'TN', state: 'Tamil Nadu', value: 50 },
        { id: 'TG', state: 'Telangana', value: 50 },
        { id: 'TR', state: 'Tripura', value: 14 },
        { id: 'UT', state: 'Uttarakhand', value: 50 },
        { id: 'UP', state: 'Uttar Pradesh', value: 15 },
        { id: 'WB', state: 'West Bengal', value: 17 },
        { id: 'AN', state: 'Andaman & Nicobar Island', value: 0 },
        { id: 'CH', state: 'Chandigarh', value: 50 },
        { id: 'DN', state: 'Dadara & Nagar Havelli', value: 19 },
        { id: 'DD', state: 'Daman & Diu', value: 0 },
        { id: 'DL', state: 'NCT of Delhi', value: 9 },
        { id: 'JK', state: 'Jammu & Kashmir', value: 0 },
        { id: 'LA', state: 'Ladakh', value: 0 },
        { id: 'LD', state: 'Lakshadweep', value: 0 },
        { id: 'PY', state: 'Puducherry', value: 0 }
    ];
};

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

class Maps extends Component {
    state = {
        data:getHeatMapData(),
        countIndiaValues: {},
        loading: true,
        tooltipContent:''
    }

    componentDidMount() {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        fetch('https://api.covid19api.com/live/country/india/status/confirmed/date/'+yesterday.toISOString(), {
            method: 'GET',

        })
            .then(resp => resp.json())
            .then(dNew => {

                var newArray=[]
                dNew.map((i, j) => {
                    // console.log(i)
                    var newObj = {}

                    newObj["state"] = i.Province;
                    newObj["value"] =  i.Confirmed;
                    if (i.Province.toString() === "Jammu and Kashmir") {
                        newObj["state"] = "Jammu & Kashmir";
                        newObj["value"] = i.Confirmed;
                    }
                    if (i.Province.toString() === "Arunachal Pradesh") {
                        newObj["state"] = "Arunanchal Pradesh";
                        newObj["value"] =  i.Confirmed;
                    }
                    if (i.Province.toString() === "Delhi") {
                        newObj["state"] = "NCT of Delhi";
                        newObj["value"] =  i.Confirmed;


                    }
                    if (i.Province.toString() === "Andaman and Nicobar Islands") {
                        newObj["state"] = "Andaman & Nicobar Island";
                        newObj["value"] =  i.Confirmed;

                    }


                    newArray.push(newObj);

                });

                this.setState({
                    data: newArray,
                    // countIndiaValues: newObj,
                    loading: false
                })
                // console.log("This data world", newObj)

            }).catch((error) => {
            return error;
        })
    }
    onMouseEnter = (geo, current = { value: 'NA' }) => {
        return () => {
            this.setState({
                tooltipContent:`${geo.properties.name}: ${abbreviateNumber(current.value)}`
            });
            // setTooltipContent();
        };
    };

    onMouseLeave = () => {
        this.setState({
            tooltipContent:''
        });
    };



    render() {
        // const gradientData = {
        //     fromColor: COLOR_RANGE[0],
        //     toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
        //     min: 0,
        //     max: this.state.data.reduce((max, item) => (item.value > max ? item.value : max), 0)
        // };

        const colorScale = scaleQuantile()
            .domain(this.state.data.map(d => d.value))
            .range(COLOR_RANGE);

        if (this.state.loading) {
            return <div style={{
            flex:"display",
                justifyContent:"center"
            }}>
                Loading

            </div>
        }
        return (
            <div>
                <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
                <ComposableMap
                    projectionConfig={PROJECTION_CONFIG}
                    projection="geoMercator"
                    width={600}
                    height={350}
                    data-tip=""
                >
                    <Geographies geography={INDIA_TOPO_JSON}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                // console.log(geo.properties.name);
                                const current = this.state.data.find(s => s.state === geo.properties.name);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                                        style={geographyStyle}
                                        onMouseEnter={this.onMouseEnter(geo, current)}
                                        onMouseLeave={this.onMouseLeave}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
                {/*<LinearGradient data={gradientData} />*/}

            </div>
        );
    }


}

export default Maps;
