import React, {useState} from 'react';
import {Map, Figures, DataElement, Contributors} from '..';

import {Layer} from 'baseui/layer';
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
            <Layer>
                <Map className={useDarkTheme ? 'dark-theme' : ''}/>
            </Layer>
            <Layer>
                <Block position={'fixed'} top={0} left={0} width={['100%', '100%', 'auto']} margin={['0', '0', '40px']}>
                    <Figures/>
                </Block>
            </Layer>
            <Layer>
                <Block
                    display={['none', 'none', 'none', 'block']}
                    position={'fixed'}
                    top={'40px'}
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
                        href="https://covid19.qulph.com/"
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
                        More information on Coronavirus
                    </Button>
                </Block>
            </Layer>
            <Layer>
                <Block position={'fixed'} bottom={'40px'} right={'40px'} display="flex">
                    <div className="fb-share-button" data-href="https://covid19.qulph.com" data-layout="button"
                         data-size="large"><a target="_blank" rel="noopener noreferrer"
                                              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcovid19.qulph.com%2F&amp;src=sdkpreparse"
                                              className="fb-xfbml-parse-ignore">Share</a></div>
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
                    {/*  <Button
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
                                Contact: <StyledLink target="_blank" href="mailto:contact@qulph.com">
                                contact@qulph.com
                            </StyledLink>
                                <br></br>
                                More information about cases in Ethiopia is available at&nbsp;
                                <StyledLink target="_blank"
                                            href="https://covid19.qulph.com">https://covid19.qulph.com</StyledLink>.
                            </Paragraph3>
                            <Paragraph3>
                                The data provided here is collected from different sources, and mainly from official
                                handles. If you want help in updating and verifying the data, please contact me.
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
