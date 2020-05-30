import React, {useState} from 'react';
import {Map, Figures, DataElement, Contributors, Header, Chart, Footer, Sections} from '..';

import {Layer} from 'baseui/layer';
import {Container, Row, Col} from 'react-bootstrap';
import {Button, KIND, SIZE} from 'baseui/button';
import {Block} from 'baseui/block';
import {Modal, ModalHeader, ModalBody, ROLE} from 'baseui/modal';
import {Paragraph3, Label2} from 'baseui/typography';

import {useTheme} from '../../contexts/ThemeContext';
import {StyledLink} from 'baseui/link';

export default function Layout() {
    const [isOpen, setIsOpen] = useState(false);
    const {useDarkTheme, setUseDarkTheme} = useTheme();

    return (
        <>
            <Header/>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Layer>
                            <Map className={useDarkTheme ? 'dark-theme' : ''}/>
                        </Layer>
                        <Layer>
                            <Block position={'absolute'} top={0} left={0} width={['100%', '100%', 'auto']}
                                   margin={['0', '0', '80px']}>
                                <Figures/>
                            </Block>
                        </Layer>
                        <Layer>
                            <Block
                                display={['none', 'none', 'none', 'block']}
                                position={'absolute'}
                                top={'80px'}
                                right={'40px'}
                                $style={({$theme}) => ({
                                    [$theme.mediaQuery.medium]: {
                                        maxHeight: 'calc(100vh - 100px)'
                                    },
                                    textAlign: 'right'
                                })}
                            >
                                <DataElement/>
                                <Button
                                    $as="a"
                                    target="_blank"
                                    style={{'text-decoration': 'none'}}
                                    href="https://charity.gofundme.com/o/en/campaign/helping-amhara-region-covid-19-response-effort/"
                                    kind={KIND.secondary}
                                    overrides={{
                                        BaseButton: {
                                            style: ({$theme}) => ({
                                                borderRadius: $theme.borders.radius200,
                                                boxShadow: $theme.lighting.shadow500,
                                                marginTop: '20px'
                                            })
                                        }
                                    }}
                                >
                                    የገንዘብ ድጋፍ ያድርጉ
                                </Button>
                            </Block>
                        </Layer>
                        <Layer>
                            <Block position={'absolute'} bottom={'40px'} right={'40px'} display="flex">
                                <div className="fb-share-button" data-href="https://corona.ethioportal.org"
                                     data-layout="button"
                                     data-size="large"><a target="_blank" rel="noopener noreferrer"
                                                          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcorona.ethioportal.org%2F&amp;src=sdkpreparse"
                                                          className="fb-xfbml-parse-ignore">ያጋሩ</a></div>
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
                                {<Button
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
                                </Button>}
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
                                            Website: <StyledLink target="_blank" href="https://ethioportal.org">
                                                        https://ethioportal.org
                                                    </StyledLink>
                                            <br/>
                                            Email: <StyledLink target="_blank" href="mailto:info@ethioportal.org">
                                                        info@ethioportal.org
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
                        <Layer>
                            <Sections/>
                        </Layer>
                        <Layer>
                            <Footer/>
                        </Layer>
                    </Col>
                </Row>
            </Container>

        </>
    );
}
