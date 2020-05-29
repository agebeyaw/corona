import React, {useState} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Map as LeafletMap, Marker, Popup, TileLayer} from 'react-leaflet';
import {divIcon} from 'leaflet';
import {styled, useStyletron} from 'baseui';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {Spinner} from 'baseui/spinner';
import {Paragraph2, Label1} from 'baseui/typography';
import {StyledBody} from 'baseui/card';
import {Block} from 'baseui/block';
import {StyledCard} from './..';
import {Marker as MarkerIcon} from './..';
import {Figure} from '../Figures/Figures';
import {Row, Col, Tooltip, OverlayTrigger, Badge} from 'react-bootstrap';
import {useData} from '../../contexts/DataContext';
import groupBy from 'lodash.groupby';
import useWindowDimensions from '../../hooks/window-dimensions';
import {sum} from '../../helpers/misc';
import {Alert} from 'baseui/icon';

const MIN_MARKER_SIZE = 32;
const MAX_MARKER_SIZE = 64;

const Centered = styled('div', ({$theme}) => ({
    backgroundColor: $theme.colors.backgroundPrimary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto',
    width: '100vw',
    [$theme.mediaQuery.medium]: {
        height: '100vh'
    }
}));

function createMarkerIcon(size, casesCount, recoveredCount, deathsCount) {
    return divIcon({
        iconSize: [size, size],
        html: renderToStaticMarkup(
            <MarkerIcon size={size} casesCount={casesCount} recoveredCount={recoveredCount} deathsCount={deathsCount}/>
        )
    });
}

function getMarkerSize(max, count) {
    return (count / max * (MAX_MARKER_SIZE - MIN_MARKER_SIZE)) + MIN_MARKER_SIZE;
}

function getLocationForCity(clickedCity, data) {
    return data.filter((item) => item.city.name === clickedCity).pop().city.location;
}

function renderTooltip(props, message) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );
}

export default function Map(props) {
    const [activeCity, setActiveCity] = useState(null);
    const {width} = useWindowDimensions();
    const [, theme] = useStyletron();

    const {cities, cases, cures, deaths, isLoading, clickedCity} = useData();

    if (isLoading) {
        return (
            <Centered>
                <Spinner/>
                <Paragraph2>Loading Data</Paragraph2>
            </Centered>
        )
    }

    const groupedCases = groupBy(cases, 'city');
    const groupedDeaths = groupBy(deaths, 'city');
    const groupedRecovered = groupBy(cures, 'city');

    let data = [];

    if (!data.length) {
        for (const city of cities) {
            if (groupedCases[city.name]) {
                data.push({
                    city,
                    cases: {
                        total: sum(groupedCases[city.name]),
                        data: groupedCases[city.name] || []
                    },
                    recovered: {
                        total: sum(groupedRecovered[city.name]),
                        data: groupedRecovered[city.name] || []
                    },
                    deaths: {
                        total: sum(groupedDeaths[city.name]),
                        data: groupedDeaths[city.name] || []
                    }
                })
            }
        }
    }

    const max = Math.max(...(data.map(({cases}) => cases.total)));
    const position = clickedCity ? getLocationForCity(clickedCity, data) : [9.005401, 38.763611];

    return (
        <LeafletMap
            center={position}
            zoom={clickedCity ? 10 : width < theme.breakpoints.medium ? 4 : 5}
            zoomControl={false}
            maxZoom={11}
            minZoom={width < theme.breakpoints.medium ? 6 : 7}
            maxBounds={[
                [3, 25],  // Southwest coordinates
                [20, 55]] // Northeast coordinates
            }
            {...props}
        ><TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
            <MarkerClusterGroup
                showCoverageOnHover={false}
                iconCreateFunction={(cluster) => {
                    const count = cluster
                        .getAllChildMarkers()
                        .reduce((total, marker) => ({
                            cases: marker.options.casesCount + total.cases,
                            recovered: marker.options.deathsCount + total.recovered,
                            deaths: marker.options.deathsCount + total.deaths,
                        }), {
                            cases: 0,
                            recovered: 0,
                            deaths: 0,
                        });

                    return createMarkerIcon(getMarkerSize(max, count.cases), count.cases, count.recovered, count.deaths);
                }}
            >
                {data && data.map(({city, cases, recovered, deaths}) => (
                    <Marker
                        key={city.name}
                        position={city.location}
                        icon={createMarkerIcon(getMarkerSize(max, cases.total), cases.total, recovered.total, deaths.total)}
                        onClick={() => {
                            setActiveCity({...city, cases, recovered, deaths});
                        }}
                        casesCount={cases.total}
                        recoveredCount={recovered.total}
                        deathsCount={deaths.total}
                    />
                ))}
            </MarkerClusterGroup>
            {activeCity && <Popup
                position={activeCity.location}
                onClose={() => setActiveCity(null)}
            >
                <StyledCard
                    style={$theme => ({
                        [$theme.mediaQuery.large]: {
                            width: '320px'
                        }
                    })}
                >
                    <StyledBody>
                        <Label1>{activeCity.name}</Label1>

                        <Row>
                            <Col>
                                <Block marginTop="10px">
                                    <Figure
                                        count={activeCity.cases.total}
                                        delta="0"
                                        label="የተገኘባቸው"
                                        color={theme.colors.negative}
                                        size="compact"
                                    />
                                    <Figure
                                        count={activeCity.recovered.total}
                                        delta="0"
                                        label="ያገገሙ"
                                        color={theme.colors.positive}
                                        size="compact"
                                    />
                                    <Figure
                                        count={activeCity.deaths.total}
                                        delta="0"
                                        label="ህይወታቸው ያለፈ"
                                        color={theme.colors.black}
                                        size="compact"
                                    />

                                </Block>

                                <div className={'border-top'} style={{'display':'none', 'padding-top': '10px', 'margin-top': '10px'}}>

                                        <Row>
                                            <Col lg="3"><Badge variant="danger">509.43</Badge></Col>
                                            <Col>
                                                <small>Confirmed Per Million</small>
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{show: 250, hide: 400}}
                                                    overlay={renderTooltip({}, '509 out of every 1 million people in Addis Abeba have tested positive for the virus.')}
                                                >
                                                    <Alert/>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>

                                    <Row>
                                        <Col lg="3"><Badge variant="primary">53.24%</Badge></Col>
                                        <Col><small>Active</small></Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3"><Badge variant="dark">3.37%</Badge></Col>
                                        <Col><small>Mortality Rate</small></Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3"><Badge variant="success">43.38%</Badge></Col>
                                        <Col><small>Recovery Rate</small></Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3"><Badge variant="warning">5%</Badge></Col>
                                        <Col><small>Avg. Growth Rate last 7 days</small></Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3"><Badge variant="warning">≈3558</Badge></Col>
                                        <Col><small>Tests Per Million as of 29 May</small></Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                    </StyledBody>
                </StyledCard>
            </Popup>}
        </LeafletMap>
    );
}
