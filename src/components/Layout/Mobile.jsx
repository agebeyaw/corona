import React, {useState} from 'react';
import {Map, DataElement, Contributors} from '../../components';

import {useStyletron} from 'baseui';
import {Layer} from 'baseui/layer';
import {Button, SIZE} from 'baseui/button';
import {Block} from 'baseui/block';
import {Modal, ModalHeader, ModalBody, ROLE} from 'baseui/modal';
import {Paragraph3, Label2, HeadingSmall} from 'baseui/typography';

import {useTheme} from '../../contexts/ThemeContext';
import {StyledLink} from 'baseui/link';
import {Tabs, Tab} from 'baseui/tabs';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {Figure} from '../Figures/Figures';
import {useData} from '../../contexts/DataContext';
import {StyledBody} from "baseui/card";

function CustomTab(props) {
    return (
        <Tab
            overrides={{
                Tab: {
                    style: {
                        flexGrow: 1,
                        textAlign: 'center',
                        padding: '10px 0'
                    }
                }
            }}
            {...props}
        />
    )
}

export default function Mobile() {
    const {cases, cures, deaths, allTime, isLoading} = useData();
    const [isOpen, setIsOpen] = useState(false);
    const {useDarkTheme, setUseDarkTheme} = useTheme();
    const [activeKey, setActiveKey] = useState('0');
    const [css, theme] = useStyletron();

    const total = allTime || {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        active: 0,
        deltaConfirmed: 0,
        deltaRecovered: 0,
        deltaDeaths: 0,
    };

    return (
        <>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: '100vw'
                })}
            >
                <div
                    className={css({
                        backgroundColor: theme.colors.backgroundPrimary,
                        padding: theme.sizing.scale600,
                        paddingBottom: 0
                    })}
                >
                    <HeadingSmall margin={0}>Coronavirus in Ethiopia</HeadingSmall>
                    <FlexGrid flexGridColumnCount={window.innerWidth > 425 ? 4 : 3}>

                        <FlexGridItem>
                            <Figure
                                count={total.confirmed}
                                delta={total.deltaConfirmed}
                                isLoading={isLoading}
                                label="Confirmed"
                                color={theme.colors.negative}
                                size="compact"
                            />
                        </FlexGridItem>
                        {window.innerWidth > 425 && (
                            <FlexGridItem>
                                <Figure
                                    count={total.active}
                                    delta="0"
                                    isLoading={isLoading}
                                    label="Active"
                                    color="orange"
                                    size="compact"
                                />
                            </FlexGridItem>
                        )}
                        <FlexGridItem>
                            <Figure
                                count={total.recovered}
                                delta={total.deltaRecovered}
                                isLoading={isLoading}
                                label="Recovered"
                                color={theme.colors.positive}
                                size="compact"
                            />
                        </FlexGridItem>

                        <FlexGridItem>
                            <Figure
                                count={total.deaths}
                                delta={total.deltaDeaths}
                                isLoading={isLoading}
                                label="Deaths"
                                color={theme.colors.primary}
                                size="compact"
                            />
                        </FlexGridItem>

                    </FlexGrid>
                </div>

                <Tabs
                    onChange={({activeKey}) => {
                        setActiveKey(activeKey);
                    }}
                    activeKey={activeKey}
                    overrides={{
                        Root: {
                            style: {
                                flexGrow: 1,
                                display: 'flex'
                            }
                        },
                        TabBar: {
                            style: {
                                display: 'flex'
                            }
                        },
                        TabContent: {
                            style: ({$active}) => {
                                return {
                                    backgroundColor: theme.colors.backgroundPrimary,
                                    padding: 0,
                                    flexGrow: 1,
                                    display: $active ? 'flex' : 'none',
                                    width: '100vw'
                                };
                            }
                        }
                    }}
                >
                    <CustomTab title="Maps">
                        <Map className={useDarkTheme ? 'dark-theme' : ''} style={{height: 'auto'}}/>
                    </CustomTab>
                    <CustomTab title="Statistics">
                        <div
                            className={css({
                                padding: theme.sizing.scale600,
                                height: 'auto'
                            })}
                        >
                            <DataElement/>
                        </div>
                    </CustomTab>
                </Tabs>
            </div>
            <Layer>
                <Block position={'fixed'} bottom={'16px'} left={'0px'} display="flex">
                    <Button
                        size={SIZE.mini}
                        onClick={() => setIsOpen(true)}
                        overrides={{
                            BaseButton: {
                                style: ({$theme}) => ({
                                    borderRadius: $theme.borders.radius200,
                                    boxShadow: $theme.lighting.shadow500,
                                    marginLeft: '10px'
                                })
                            }
                        }}
                    >
                        Information
                    </Button>
                    {/*          <Button
            size={SIZE.mini}
            onClick={() => setUseDarkTheme(!useDarkTheme)}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  borderRadius: $theme.borders.radius200,
                  boxShadow: $theme.lighting.shadow500,
                  marginLeft: '10px'
                })
              }
            }}
          >
            Turn {useDarkTheme ? ' off ' : ' on '} dark mode
          </Button>*/}
                    <Modal
                        onClose={() => setIsOpen(false)}
                        closeable
                        isOpen={isOpen}
                        animate
                        role={ROLE.dialog}
                        overrides={{
                            Dialog: {
                                style: ({$theme}) => ({
                                    borderRadius: $theme.borders.radius200
                                })
                            }
                        }}
                    >
                        <ModalHeader>Information</ModalHeader>
                        <ModalBody>
                            <Paragraph3>
                                The author is not responsible for the correctness of the data provided. The data may be
                                out of date.
                            </Paragraph3>
                            <Paragraph3>
                                Author: Anteneh Gebeyaw<br/>
                                Contact: <StyledLink target="_blank"
                                                     href="mailto:contact@qulph.com"> contact@qulph.com </StyledLink>
                                <br></br>
                                More information about cases in Ethiopia is available at&nbsp;
                                <StyledLink target="_blank"
                                            href="https://covid19.qulph.com">https://covid19.qulph.com</StyledLink>.
                            </Paragraph3>
                            <Paragraph3>
                                The data provided here is collected from different sources, and mainly from official
                                handles. If you want help in updating and verifying the data, please contact.
                            </Paragraph3>
                            <StyledLink target="_blank" href="https://github.com/agebeyaw/corona">
                                https://github.com/agebeyaw/corona
                            </StyledLink>

                            <Label2 margin="20px 0 10px">Contributors</Label2>
                            <Contributors/>
                        </ModalBody>
                    </Modal>
                </Block>
            </Layer>
        </>
    );
}
