import React, {useState} from 'react';
import {Map, DataElement, Contributors, Header, Chart} from '../../components';

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
    const {allTime, isLoading} = useData();
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
            <Header/>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: '100vw',
                })}
            >
                <div
                    style={{'margin-top': '10px'}}
                    className={css({
                        backgroundColor: theme.colors.backgroundPrimary,
                        padding: theme.sizing.scale600,
                        paddingBottom: 0
                    })}
                >
                    <HeadingSmall margin={0}>የኮሮና ቫይረስ በኢትዮጵያ</HeadingSmall>
                    <FlexGrid flexGridColumnCount={window.innerWidth > 425 ? 4 : 3}>

                        <FlexGridItem>
                            <Figure
                                count={total.confirmed}
                                delta={total.deltaConfirmed}
                                isLoading={isLoading}
                                label="የተገኘባቸው"
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
                                    label="በለይቶ ህክምና"
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
                                label="ያገገሙ"
                                color={theme.colors.positive}
                                size="compact"
                            />
                        </FlexGridItem>

                        <FlexGridItem>
                            <Figure
                                count={total.deaths}
                                delta={total.deltaDeaths}
                                isLoading={isLoading}
                                label="ህይወታቸው ያለፈ"
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
                    <CustomTab title="ካርታ">
                        <Map className={useDarkTheme ? 'dark-theme' : ''} style={{height: 'auto'}}/>
                    </CustomTab>
                    <CustomTab title="መረጃ በቁጥር">
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
                      ማስታወሻ
                    </Button>
                    <Button
                        size={SIZE.mini}
                        onClick={() => setUseDarkTheme(!useDarkTheme)}
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
                        በጨለማ መመልከቻውን {useDarkTheme ? ' ያጥፉ' : ' ያብሩ'}
                    </Button>
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
                        <ModalHeader>ማስታወሻ</ModalHeader>
                        <ModalBody>
                            <Paragraph3>
                                The data provided here is collected from different sources, and mainly from
                                official handles. If you want help in providing, updating and verifying the
                                data please contact us.
                            </Paragraph3>
                            <Paragraph3>
                                Website: <StyledLink target="_blank" href="https://ethiopoetal.org">
                                https://ethiopoetal.org
                            </StyledLink>
                                <br/>
                                Email: <StyledLink target="_blank" href="mailto:info@ethiopoetal.org">
                                info@ethiopoetal.org
                            </StyledLink>
                                <br/><br/>
                                More information on how to contribute financial support is available at&nbsp;
                                <StyledLink target="_blank"
                                            href="https://charity.gofundme.com/o/en/campaign/helping-amhara-region-covid-19-response-effort">
                                    Let's unite against COVID19
                                </StyledLink>!
                            </Paragraph3>


                            <Label2 margin="20px 0 10px">In collaboration with</Label2>
                            <Contributors/>
                        </ModalBody>
                    </Modal>
                </Block>
            </Layer>
            <Layer>
                <Chart/>
            </Layer>
        </>
    );
}
