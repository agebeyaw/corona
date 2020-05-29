import AllStatesChart from './allstates';
import DailyConfirmedChart from './dailyconfirmedchart';
import GrowthTrendChart from './growthtrendchart';
import TotalConfirmedChart from './totalconfirmedchart';

import AgeChart from './agechart';
import GenderChart from './genderchart';
import NationalityChart from './nationalitychart';

import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";

function Chart() {
    const [fetched, setFetched] = useState(false);
    const [timeseries, setTimeseries] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [statesTimeSeries, setStatesTimeSeries] = useState([]);

    useEffect(() => {
        if (fetched === false) {
            getStates();
        }
    }, [fetched]);

    const getStates = async () => {
        try {
            const [
                response,
                rawDataResponse,
                stateDailyResponse,
            ] = await Promise.all([
                axios.get('https://covid19-ethiopia.qulph.com/api/data.json'),
                axios.get('https://covid19-ethiopia.qulph.com/api/raw_data.json'),
                axios.get('https://covid19-ethiopia.qulph.com/api/states_daily.json'),
            ]);
            setTimeseries(response.data.cases_time_series);
            setStatesTimeSeries(stateDailyResponse.data.states_daily);
            setRawData(rawDataResponse.data.raw_data);
            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cards-container">
            <Row className="cards">
                <Col className="card fadeInUp" style={{animationDelay: '0.7s'}}>
                    <TotalConfirmedChart title="አጠቃላይ ተጠቂዎች" timeseries={timeseries}/>
                </Col>
                <Col className="card fadeInUp" style={{animationDelay: '0.7s'}}>
                    <DailyConfirmedChart title="ተጠቂዎች በየዕለቱ" timeseries={timeseries}/>
                </Col>
            </Row>
            <Row className="cards">
                <Col className="card card-big fadeInUp"
                     style={{animationDelay: '0.7s'}}>
                    <AllStatesChart
                        title="አጠቃላይ ተጠቂዎች በክልል"
                        data={statesTimeSeries}
                    />
                </Col>
                <Col className="card fadeInUp" style={{animationDelay: '0.7s'}}>
                    <GrowthTrendChart
                        title="ክልሎች - የመስፋፋት ሁኔታ"
                        data={statesTimeSeries}
                    />
                </Col>
            </Row>
            <Row className="cards">
                <Col md={4} className="card fadeInUp" style={{animationDelay: '0.7s'}}>
                    <GenderChart title="ተጠቂዎች በጾታ" data={rawData} />
                </Col>
                <Col md={4} className="card fadeInUp" style={{animationDelay: '0.7s'}}>
                    <AgeChart title="ተጠቂዎች በዕድሜ ምድብ" data={rawData} />
                </Col>
                <Col md={4} className="card fadeInUp" style={{animationDelay: '0.7s'}}>
                    <NationalityChart title="ተጠቂዎች በዜግነት" data={rawData} />
                </Col>
            </Row>
        </div>
    );
}

export default Chart;
